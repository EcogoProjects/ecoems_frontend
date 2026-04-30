'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ecogoLogo from '@/assets/ecogo_logo.png'
import WaitlistModal from './WaitlistModal'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <nav className="relative max-w-6xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={ecogoLogo} alt="ECOGO" width={32} height={32} className="rounded-full" />
          <span className="font-bold text-lg text-foreground">ECOGO</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <Link href="/" className="hover:opacity-70 transition-opacity">Inicio</Link>
          <Link href="/como-funciona" className="hover:opacity-70 transition-opacity">¿Cómo Funciona?</Link>
          <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="[@media(min-width:379px)]:flex hidden px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#472E18', color: '#EAD9C3' }}
          >
            Regístrate
          </button>

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
        <div className="md:hidden absolute left-0 right-0 top-full z-50 bg-background border-t border-border shadow-lg px-6 py-4 flex flex-col gap-4 text-sm font-medium text-foreground">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity">
            Inicio
          </Link>
          <Link href="/como-funciona" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity">
            ¿Cómo Funciona?
          </Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity">
            Blog
          </Link>
          <button
            onClick={() => { setMenuOpen(false); setModalOpen(true) }}
            className="[@media(min-width:379px)]:hidden w-full px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity text-center"
            style={{ backgroundColor: '#472E18', color: '#EAD9C3' }}
          >
            Próximamente
          </button>
        </div>
      )}

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </nav>
  )
}

export default Navbar
