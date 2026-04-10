'use client'

import Image from 'next/image'
import { useState } from 'react'
import ecogoLogo from '@/assets/ecogo_logo.png'
import WaitlistModal from '@/components/shared/WaitlistModal'

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="max-w-6xl mx-auto px-6 pt-4">
      <div className="rounded-[2rem] overflow-hidden relative min-h-[360px] md:min-h-[440px]" style={{ backgroundColor: '#472E18' }}>
        <div className="absolute inset-0 overflow-hidden hidden [@media(min-width:922px)]:block">
          <div
            className="absolute -top-20 -right-10 w-[50%] h-[130%] rounded-[50%_30%_40%_60%]"
            style={{
              backgroundColor: '#CDAD75',
              animation: 'fade-in 1.2s ease-out forwards, breathe 6s ease-in-out 1.2s infinite',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col [@media(min-width:922px)]:flex-row items-center px-6 [@media(min-width:922px)]:px-14 py-10 [@media(min-width:922px)]:py-16 gap-6 [@media(min-width:922px)]:gap-8">
          <div className="max-w-2xl space-y-5 flex-1 text-center [@media(min-width:922px)]:text-left">

            {/* Logo above heading — only on small screens */}
            <div className="flex justify-center opacity-0 animate-fade-in [@media(min-width:922px)]:hidden" style={{ animationDelay: '0.05s' }}>
              <div className="rounded-full p-4 animate-float" style={{ backgroundColor: '#CDAD75' }}>
                <Image
                  src={ecogoLogo}
                  alt="ECOGO"
                  width={100}
                  height={100}
                  className="drop-shadow-xl"
                />
              </div>
            </div>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.24] text-secondary-foreground opacity-0 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Estudia mejor.
              <br />
              Aprende más rápido.
              <br />
              Sin estrés.
            </h1>
            <p
              className="text-secondary-foreground/75 text-sm md:text-base max-w-md leading-relaxed opacity-0 animate-fade-up mx-auto [@media(min-width:922px)]:mx-0"
              style={{ animationDelay: '0.3s' }}
            >
              La app que te ayuda a memorizar, entender y aprobar cualquier examen con métodos simples y efectivos.
            </p>
            <div className="opacity-0 animate-fade-up flex justify-center [@media(min-width:922px)]:justify-start" style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 text-center"
                style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
              >
                Estamos por lanzar — regístrate y asegura tu lugar
              </button>
            </div>
          </div>

          <div
            className="flex-shrink-0 flex items-center justify-center opacity-0 animate-fade-in hidden [@media(min-width:922px)]:flex"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="animate-float">
              <Image
                src={ecogoLogo}
                alt="ECOGO"
                width={180}
                height={180}
                className="drop-shadow-2xl md:w-[220px] md:h-[220px] [filter:brightness(0)_invert(1)_sepia(1)_saturate(0.4)_hue-rotate(5deg)_brightness(0.97)] md:[filter:drop-shadow(0_25px_25px_rgb(0_0_0/0.15))]"
              />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}

export default HeroSection
