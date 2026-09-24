import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';
import { NextRequest, NextResponse } from 'next/server.js';

// Ejecutar los handlers reales con Supabase y HTTP simulados, sin cuentas ni red.
async function loadSource(path, imports = {}, globals = {}) {
  let source = await readFile(new URL(`../src/${path}`, import.meta.url), 'utf8');
  if (path.endsWith('.ts')) source = stripTypeScriptTypes(source);
  const context = vm.createContext({ URL, process: { env: { NEXT_PUBLIC_API_URL: 'https://api.test' } }, ...globals });
  const sourceModule = new vm.SourceTextModule(source, { context });
  await sourceModule.link((specifier) => {
    const exports = imports[specifier];
    assert.ok(exports, `Unexpected import: ${specifier}`);
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await sourceModule.evaluate();
  return sourceModule.namespace;
}

const { getProfileNames } = await loadSource('utils/profileNames.js');

test('nombres: Google con name y full_name; email con apellidos separados; metadatos vacíos', () => {
  const google = getProfileNames({ name: 'Ana López García', full_name: 'Ana López García' });
  assert.equal(google.name, 'Ana');
  assert.equal(google.last_name, 'López García');
  const email = getProfileNames({ name: 'Ana María', last_name: 'López García' });
  assert.equal(email.name, 'Ana María');
  assert.equal(email.last_name, 'López García');
  assert.equal(getProfileNames().name, '');
});

async function callback({ codeError = false, sessionMissing = false, createStatus = 201, completed = false, offline = false } = {}) {
  const calls = [];
  const session = { access_token: 'test-token', user: { user_metadata: { name: 'Ana López', full_name: 'Ana López' } } };
  const auth = {
    exchangeCodeForSession: async () => ({ error: codeError ? new Error('invalid') : null }),
    verifyOtp: async () => ({ error: codeError ? new Error('invalid') : null }),
    getSession: async () => ({ data: { session: sessionMissing ? null : session } }),
  };
  const { GET } = await loadSource('app/auth/callback/route.js', {
    '@/utils/supabase/server': { createClient: async () => ({ auth }) },
    'next/server': { NextResponse },
    '@/utils/profileNames': { getProfileNames },
  }, {
    fetch: async (url, options) => {
      calls.push({ url, ...options });
      if (offline) throw new Error('offline');
      return options.method === 'POST'
        ? (createStatus === 204 ? new Response(null, { status: 204 }) : new Response('{}', { status: createStatus }))
        : Response.json({ onboarding_completed: completed });
    },
  });
  return { GET, calls };
}

for (const query of ['', '?code=bad', '?token_hash=bad&type=recovery']) {
  test(`callback rechaza enlaces inválidos: ${query || 'sin parámetros'}`, async () => {
    const { GET, calls } = await callback({ codeError: true });
    const response = await GET(new Request(`https://app.test/auth/callback${query}`));
    assert.equal(response.headers.get('location'), 'https://app.test/login?error=link_invalido');
    assert.equal(calls.length, 0);
  });
}

test('callback rechaza un intercambio sin sesión', async () => {
  const { GET, calls } = await callback({ sessionMissing: true });
  const response = await GET(new Request('https://app.test/auth/callback?code=ok'));
  assert.match(response.headers.get('location'), /link_invalido$/);
  assert.equal(calls.length, 0);
});

for (const query of ['?code=ok', '?token_hash=ok&type=signup', '?token_hash=ok&type=email']) {
  test(`callback crea perfil y dirige al registro: ${query}`, async () => {
    const { GET, calls } = await callback();
    const response = await GET(new Request(`https://app.test/auth/callback${query}`));
    assert.equal(response.headers.get('location'), 'https://app.test/initial-registration');
    assert.equal(response.cookies.get('onboarding').value, '');
    assert.equal(calls[0].url, 'https://api.test/users/me');
    assert.equal(calls[0].headers.Authorization, 'Bearer test-token');
    assert.deepEqual(JSON.parse(calls[0].body), { name: 'Ana', last_name: 'López' });
  });
}

for (const createStatus of [200, 201, 204, 409]) {
test(`perfil existente (${createStatus}) con registro completo vuelve a home y persiste la cookie`, async () => {
  const { GET } = await callback({ createStatus, completed: true });
  const response = await GET(new Request('https://app.test/auth/callback?code=ok'));
  assert.equal(response.headers.get('location'), 'https://app.test/home');
  assert.equal(response.cookies.get('onboarding').value, 'done');
  assert.equal(response.cookies.get('onboarding').maxAge, 31536000);
});
}

test('callback informa una cancelación del proveedor OAuth', async () => {
  const { GET, calls } = await callback();
  const response = await GET(new Request('https://app.test/auth/callback?error=access_denied&error_description=cancelado'));
  assert.equal(response.headers.get('location'), 'https://app.test/login?error=oauth_cancelled');
  assert.equal(calls.length, 0);
});

for (const options of [{ createStatus: 500 }, { offline: true }]) {
  test(`fallo de backend permite recuperar el perfil en registro: ${JSON.stringify(options)}`, async () => {
    const { GET } = await callback(options);
    const response = await GET(new Request('https://app.test/auth/callback?code=ok'));
    assert.equal(response.headers.get('location'), 'https://app.test/initial-registration');
    assert.equal(response.cookies.get('onboarding').value, '');
  });
}

for (const [path, signedIn, onboarded, destination] of [
  ['/', false, false, '/login'],
  ['/', true, true, '/home'],
  ['/home', false, false, '/login?redirect=%2Fhome'],
  ['/home', true, false, '/initial-registration'],
  ['/initial-registration', true, true, '/home'],
  ['/login', true, true, '/home'],
  ['/home', true, true, null],
  ['/initial-registration', true, false, null],
  ['/auth/callback?code=ok', true, false, null],
  ['/auth/callback?code=ok', true, true, null],
  ['/auth/callback?code=ok', false, false, null],
]) {
  test(`proxy: ${path}, sesión=${signedIn}, registro=${onboarded}`, async () => {
    let authCalls = 0;
    const { proxy } = await loadSource('proxy.ts', {
      'next/server': { NextResponse },
      '@supabase/ssr': { createServerClient: (_url, _key, options) => ({ auth: {
        getUser: async () => {
          authCalls++;
          options.cookies.setAll([{ name: 'refreshed-session', value: 'ok', options: { path: '/' } }]);
          return { data: { user: signedIn ? { id: 'test-user' } : null } };
        },
      } }) },
    });
    const request = new NextRequest(`https://app.test${path}`, {
      headers: onboarded ? { cookie: 'onboarding=done' } : {},
    });
    const response = await proxy(request);
    assert.equal(response.headers.get('location'), destination ? `https://app.test${destination}` : null);
    if (path.startsWith('/auth/callback')) assert.equal(authCalls, 0);
    else assert.equal(response.cookies.get('refreshed-session').value, 'ok');
  });
}
