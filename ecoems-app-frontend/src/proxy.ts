import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/home', '/exam', '/exam-result', '/analytics', '/profile', '/program', '/coming-soon', '/initial-registration']
const AUTH_ROUTES = ['/login', '/signup']

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Escribir en el request para que los Server Components lo vean
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          // Recrear la response con el request actualizado y escribir cookies en ella
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getUser() verifica el token contra los servidores de Supabase — más seguro que getSession()
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
  const isOnboarding = pathname.startsWith('/initial-registration')

  // Propaga cookies de Supabase al redirect para no perder el refresh de token
  function withCookies(response: NextResponse) {
    supabaseResponse.cookies.getAll().forEach(cookie =>
      response.cookies.set(cookie.name, cookie.value, cookie)
    )
    return response
  }

  // Ruta protegida sin sesión → login
  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return withCookies(NextResponse.redirect(loginUrl))
  }

  if (user) {
    const hasOnboarding = request.cookies.get('onboarding')?.value === 'done'

    // Regla B: onboarding ya completado, intento de volver a /initial-registration → home
    if (hasOnboarding && isOnboarding) {
      return withCookies(NextResponse.redirect(new URL('/home', request.url)))
    }

    // Regla A: sin cookie de onboarding, cualquier ruta que no sea /initial-registration → onboarding
    if (!hasOnboarding && !isOnboarding) {
      return withCookies(NextResponse.redirect(new URL('/initial-registration', request.url)))
    }
  }

  // Ruta de auth con sesión activa → home
  if (isAuthRoute && user) {
    return withCookies(NextResponse.redirect(new URL('/home', request.url)))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
