'use client'

import { useState } from 'react'
import Image from 'next/image'
import ecogoLogo from '@/assets/ecogo_logo.png'
import { Check, Copy, Mail } from 'lucide-react'
import { toast } from 'sonner'

interface TransferModalProps {
  onClose: () => void
}

export default function TransferModal({ onClose }: TransferModalProps) {
  const [copiedClabe, setCopiedClabe] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedSubject, setCopiedSubject] = useState(false)

  const handleCopy = (text: string, type: 'clabe' | 'email' | 'subject') => {
    navigator.clipboard.writeText(text)
    if (type === 'clabe') {
      setCopiedClabe(true)
      setTimeout(() => setCopiedClabe(false), 2000)
      toast.success('CLABE copiada al portapapeles')
    } else if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
      toast.success('Correo copiado al portapapeles')
    } else if (type === 'subject') {
      setCopiedSubject(true)
      setTimeout(() => setCopiedSubject(false), 2000)
      toast.success('Asunto copiado al portapapeles')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto px-3 py-4 sm:items-center sm:px-4 sm:py-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto scrollbar-hide rounded-[1.5rem] bg-background px-4 py-6 text-center shadow-2xl sm:max-h-[calc(100vh-3rem)] sm:rounded-2xl sm:px-6 sm:py-8 md:rounded-3xl md:px-8 md:py-10 flex flex-col items-center gap-4 sm:gap-6"
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

        <div className="w-full mx-auto text-center space-y-2">
          <h2 className="text-lg font-extrabold leading-snug text-foreground sm:text-xl">
            Adquiere tu Plan Pro
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Para obtener acceso ilimitado, realiza una transferencia bancaria con los siguientes datos:
          </p>
        </div>

        <div className="w-full bg-[#EEE7DD] p-4 rounded-xl text-left space-y-3 text-sm text-[#3D281F]">
          <div>
            <span className="font-bold opacity-70 block text-xs uppercase">Banco</span>
            <p className="font-semibold text-[#3D281F]/50">BBVA</p>
          </div>
          <div>
            <span className="font-bold opacity-70 block text-xs uppercase">Beneficiario</span>
            <p className="font-semibold text-[#3D281F]/50">Merari Abigail Tovar Meza</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold opacity-70 block text-xs uppercase">CLABE Interbancaria</span>
              <p className="font-semibold text-[#3D281F]/50">012 180 01527575668 4</p>
            </div>
            <button
              onClick={() => handleCopy('012 180 01527575668 4', 'clabe')}
              className="p-2 hover:bg-[#CDAD75]/20 rounded-lg transition-colors cursor-pointer"
              title="Copiar CLABE"
            >
              {copiedClabe ? (
                <Check size={20} className="text-emerald-700 animate-in fade-in zoom-in-50 duration-200" />
              ) : (
                <Copy size={20} className="text-[#472E18]" />
              )}
            </button>
          </div>
          <div>
            <span className="font-bold opacity-70 block text-xs uppercase">Concepto de pago</span>
            <p className="font-semibold text-[#3D281F]/50">Plan Ecogo Pro - 2026</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold opacity-70 block text-xs uppercase">Monto a transferir</span>
              <p className="font-semibold text-[#3D281F]/50">$299.00 MXN</p>
            </div>
          </div>
        </div>

        {/* Sección de Confirmación de Pago por Correo */}
        <div className="w-full border border-[#472E18]/10 bg-base-hard/60 p-4 rounded-xl text-left space-y-3 text-sm text-[#3D281F]">
          <div className="border-b border-[#472E18]/10 pb-2">
            <span className="font-bold text-[#472E18] text-xs uppercase tracking-wide block">
              Confirmación de Pago
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Envía tu comprobante por correo para activar tu Plan Pro. </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold opacity-70 block text-xs uppercase">Enviar a</span>
                <p className="font-semibold text-[#3D281F]/70 text-xs">contacto.appecogo.mx@gmail.com</p>
              </div>
              <button
                onClick={() => handleCopy('contacto.appecogo.mx@gmail.com', 'email')}
                className="p-1.5 hover:bg-[#CDAD75]/20 rounded-lg transition-colors cursor-pointer"
                title="Copiar Correo"
              >
                {copiedEmail ? (
                  <Check size={16} className="text-emerald-700 animate-in fade-in zoom-in-50 duration-200" />
                ) : (
                  <Copy size={16} className="text-[#472E18]" />
                )}
              </button>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold opacity-70 block text-xs uppercase">Asunto sugerido</span>
                <p className="font-semibold text-[#3D281F]/70 text-xs">Comprobante de Pago Plan Pro - [Tu Nombre]</p>
              </div>
              <button
                onClick={() => handleCopy('Comprobante de Pago Plan Pro - [Tu Nombre]', 'subject')}
                className="p-1.5 hover:bg-[#CDAD75]/20 rounded-lg transition-colors cursor-pointer"
                title="Copiar Asunto"
              >
                {copiedSubject ? (
                  <Check size={16} className="text-emerald-700 animate-in fade-in zoom-in-50 duration-200" />
                ) : (
                  <Copy size={16} className="text-[#472E18]" />
                )}
              </button>
            </div>
          </div>

          <a
            href="mailto:contacto.appecogo.mx@gmail.com?subject=Comprobante%20de%20Pago%20Plan%20Pro%20-%20[Tu%20Nombre]&body=Hola%20equipo%20de%20ECOGO,%0A%0AAdjunto%20mi%20comprobante%20de%20pago%20para%20activar%20el%20Plan%20Pro.%0A%0A[adjunta%20tu%20comprobante]%0A%0AMis%20datos:%0A-%20Nombre%20completo:%20[Tu%20Nombre%20con%20el%20que%20estás%20registrado%20en%20ECOGO]%0A-%20Correo%20registrado:%20[Tu%20Correo%20con%20el%20que%20estás%20registrado%20en%20ECOGO]%0A%0ASaludos!"
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#472E18]/40 px-3 py-2 text-center text-xs font-semibold text-[#472E18] bg-[#EAD9C3]/20 hover:bg-[#EAD9C3]/50 transition-colors shadow-sm"
          >
            <Mail size={15} />
            Redactar correo automáticamente
          </a>
          <p className='text-xs text-center text-base bg-base-dark/60 p-1 rounded-md'>En el correo, asegúrate de incluir: <br />
            <strong className="font-semibold ">Tu nombre completo y correo electrónico registrados en la plataforma</strong>.
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Espera confirmación por parte del equipo en un máximo de <span className="font-semibold text-[#472E18]/80">24 hrs</span>.
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-full px-4 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 shadow-md"
          style={{ backgroundColor: '#472E18', color: '#EAD9C3' }}
        >
          Entendido
        </button>

        <p className="text-[11px] text-muted-foreground opacity-60 text-center -mt-2">
          Al continuar, aceptas nuestros{' '}
          <a
            href="/terminos"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-100 transition-opacity"
          >
            Términos y Condiciones
          </a>
        </p>
      </div>
    </div>
  )
}
