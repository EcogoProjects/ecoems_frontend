'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ecogoLogo from '@/assets/ecogo_logo.png'
import { APP_LOGIN_URL, APP_SIGNUP_URL } from '@/lib/constants'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/como-funciona', label: '¿Cómo Funciona?' },
  { href: '/mapa-escuelas', label: 'Mapa escuelas' },
  { href: '/blog', label: 'Blog' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={ecogoLogo} alt="ECOGO" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-lg text-foreground">ECOGO</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground">
            {navItems.map((item) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex items-center rounded-full px-3 py-2 transition-colors ${active ? 'text-[#472E18]' : 'text-foreground/80 hover:text-foreground'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-[#472E18] transition-all duration-300 ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                  />
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="[@media(min-width:379px)]:flex hidden px-4 py-2 rounded-full text-sm font-semibold text-[#472E18] hover:bg-[#472E18]/5 transition-colors"
            >
              Iniciar sesión
            </a>

            <a
              href={APP_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="[@media(min-width:379px)]:flex hidden px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#472E18', color: '#EAD9C3' }}
            >
              Regístrate
            </a>

            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span
                className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full z-50 border-t border-border bg-background shadow-lg">
            <div className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-foreground">
              {navItems.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl border px-4 py-3 transition-colors ${active
                        ? 'border-[#472E18]/20 bg-[#472E18]/8 text-[#472E18]'
                        : 'border-transparent hover:bg-foreground/5'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <a
                href={APP_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="[@media(min-width:379px)]:hidden w-full px-5 py-2 rounded-full text-sm font-semibold text-center border border-[#472E18]/30 text-[#472E18] hover:bg-[#472E18]/5 transition-colors"
              >
                Iniciar sesión
              </a>
              <a
                href={APP_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="[@media(min-width:379px)]:hidden w-full px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity text-center"
                style={{ backgroundColor: '#472E18', color: '#EAD9C3' }}
              >
                Regístrate
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="h-[81px]" />
    </>
  )
}

export default Navbar
