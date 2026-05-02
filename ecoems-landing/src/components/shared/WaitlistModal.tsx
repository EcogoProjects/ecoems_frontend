'use client'

import Image from 'next/image'
import ecogoLogo from '@/assets/ecogo_logo.png'

const FORM_URL = 'https://forms.google.com/placeholder'

interface WaitlistModalProps {
  onClose: () => void
}

export default function WaitlistModal({ onClose }: WaitlistModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto px-3 py-4 sm:items-center sm:px-4 sm:py-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-sm overflow-y-auto rounded-[1.5rem] bg-background px-4 py-6 text-center shadow-2xl sm:max-h-[calc(100vh-3rem)] sm:rounded-2xl sm:px-6 sm:py-8 md:rounded-3xl md:px-8 md:py-10 flex flex-col items-center gap-4 sm:gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-lg leading-none text-muted-foreground transition-colors hover:text-foreground sm:right-4 sm:top-4 sm:text-xl"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div
          className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#CDAD75' }}
        >
          <Image src={ecogoLogo} alt="ECOGO" width={52} height={52} className="h-auto w-10 sm:w-12 md:w-14" />
        </div>

        <div className="w-full max-w-xl mx-auto text-center space-y-2">
          <h2 className="text-lg font-extrabold leading-snug text-foreground sm:text-xl">
            Estamos preparando ECOGO
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            La app que te ayudará a estudiar mejor para el <span className="font-bold">ECOEMS 2026</span> está por lanzarse.
            <br />
            <span className="font-bold">Regístrate</span> ahora y sé de los primeros en obtener <span className="font-bold">acceso anticipado</span>
          </p>
        </div>
        <a
          href="https://app.ecogo.mx/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full px-4 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 shadow-md"
          style={{ backgroundColor: '#472E18', color: '#EAD9C3' }}
        >
          Regístrate para el lanzamiento
        </a>
      </div>
    </div>
  )
}
