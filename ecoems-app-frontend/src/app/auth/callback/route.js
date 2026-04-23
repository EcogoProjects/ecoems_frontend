import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Supabase redirige aquí en dos situaciones:
 *
 * 1. Confirmación de email (PKCE — usado por @supabase/ssr por defecto):
 *    URL: /auth/callback?code=<code>
 *    Después de exchangeCodeForSession se llama al backend para crear el perfil.
 *    Solo redirige al home si el backend responde 201.
 *
 * 2. Confirmación de email (OTP — flujo alternativo sin PKCE):
 *    URL: /auth/callback?token_hash=<hash>&type=signup
 *    Misma lógica de backend.
 */
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type       = searchParams.get('type')
  const code       = searchParams.get('code')

  const supabase = await createClient()

  // --- PKCE: confirmación de email vía code (flujo por defecto con @supabase/ssr) ---
  if (code) {
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !session) {
      return NextResponse.redirect(`${origin}/app/login?error=link_invalido`)
    }

    return await createBackendProfile(session, origin)
  }

  // --- OTP: confirmación de email vía token_hash (flujo alternativo sin PKCE) ---
  // type='signup' para registro, type='email' para cambio de correo
  if (token_hash && (type === 'signup' || type === 'email')) {
    const { data: { session }, error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })

    if (error || !session) {
      return NextResponse.redirect(`${origin}/app/login?error=link_invalido`)
    }

    return await createBackendProfile(session, origin)
  }

  return NextResponse.redirect(`${origin}/app/login?error=link_invalido`)
}

async function createBackendProfile(session, origin) {
  const { name = '', last_name = '' } = session.user.user_metadata ?? {}

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, last_name }),
    })

    if (res.status === 201) {
      return NextResponse.redirect(`${origin}/app/home`)
    }

    return NextResponse.redirect(`${origin}/app/login?error=registro_fallido`)
  } catch {
    return NextResponse.redirect(`${origin}/app/login?error=servidor_no_disponible`)
  }
}
