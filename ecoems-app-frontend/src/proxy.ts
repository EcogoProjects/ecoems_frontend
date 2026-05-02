import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/home', '/exam', '/analytics', '/profile', '/program', '/coming-soon']
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

  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    const redirectResponse = NextResponse.redirect(loginUrl)
    // Propagar cookies de Supabase para no perder el refresh de token
    supabaseResponse.cookies.getAll().forEach(cookie =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    )
    return redirectResponse
  }

  if (isAuthRoute && user) {
    const redirectResponse = NextResponse.redirect(new URL('/home', request.url))
    supabaseResponse.cookies.getAll().forEach(cookie =>
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    )
    return redirectResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
