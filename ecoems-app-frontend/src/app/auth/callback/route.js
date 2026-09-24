import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { getProfileNames } from '@/utils/profileNames'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Supabase redirige aquí tras Google OAuth o la confirmación de email:
 *
 * 1. PKCE (por defecto con @supabase/ssr):  /auth/callback?code=<code>
 * 2. OTP  (flujo alternativo sin PKCE):     /auth/callback?token_hash=<hash>&type=signup|email
 *
 * En ambos casos:
 *   - Se intercambia el código/token por una sesión
 *   - Se llama al backend para crear el perfil (name y last_name vienen de user_metadata)
 *   - Perfil completo → home; pendiente o fallo de creación → registro inicial
 */
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code       = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type       = searchParams.get('type')
  const providerError = searchParams.get('error_description') || searchParams.get('error')

  if (providerError) {
    return NextResponse.redirect(`${origin}/login?error=oauth_cancelled`)
  }

  const supabase = await createClient()

  // Intercambiar el código/token por una sesión según el flujo activo
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return NextResponse.redirect(`${origin}/login?error=link_invalido`)
  } else if (token_hash && (type === 'signup' || type === 'email')) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (error) return NextResponse.redirect(`${origin}/login?error=link_invalido`)
  } else {
    return NextResponse.redirect(`${origin}/login?error=link_invalido`)
  }

  // Leer la sesión activa tras el intercambio
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !session) {
    return NextResponse.redirect(`${origin}/login?error=link_invalido`)
  }

  return await createBackendProfile(session, origin)
}

async function createBackendProfile(session, origin) {
  const { name, last_name } = getProfileNames(session.user.user_metadata)

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, last_name }),
    })

    // Cualquier 2xx confirma creación/actualización; 409 significa que ya existía.
    if ((res.status >= 200 && res.status < 300) || res.status === 409) {
      return await redirectAfterProfile(session.access_token, origin)
    }

    return redirectToRegistration(origin)
  } catch {
    // La sesión ya existe: el registro inicial permite reintentar crear el perfil.
    return redirectToRegistration(origin)
  }
}

async function redirectAfterProfile(accessToken, origin) {
  try {
    const res = await fetch(`${BASE_URL}/users/me/basic-info`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const data = await res.json()
      if (data.onboarding_completed) {
        const response = NextResponse.redirect(`${origin}/home`)
        response.cookies.set('onboarding', 'done', {
          path: '/',
          // 1 año: persistir entre cierres del navegador. Sin maxAge sería cookie de
          // sesión y caducaría al cerrar el navegador → la compuerta del proxy mandaría
          // al usuario ya registrado de vuelta a /initial-registration.
          maxAge: 60 * 60 * 24 * 365,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        })
        return response
      }
    }
  } catch {
    // Si falla la consulta, mandamos a onboarding de todas formas
  }
  return redirectToRegistration(origin)
}

function redirectToRegistration(origin) {
  const response = NextResponse.redirect(`${origin}/initial-registration`)
  // Evitar que una cookie de otro usuario salte el registro del usuario actual.
  response.cookies.delete('onboarding')
  return response
}
