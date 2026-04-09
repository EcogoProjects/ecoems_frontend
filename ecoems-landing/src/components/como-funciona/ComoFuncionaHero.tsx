'use client'

import Image from 'next/image'
import { useState } from 'react'
import raccoonStudy from '@/assets/RacconStudy-removebg-preview.png'
import raccoonBackpack from '@/assets/RacconBackpack-removebg-preview.png'
import WaitlistModal from '@/components/shared/WaitlistModal'

const ComoFuncionaHero = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="w-full relative overflow-hidden" style={{ backgroundColor: '#CDAD75', minHeight: 'clamp(320px, 50vw, 460px)' }}>

      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'breathe 6s ease-in-out 1s infinite', transformOrigin: 'bottom center' }}
      >
        <path
          d="M0,220 L0,100 Q200,20 420,110 Q600,180 780,80 Q960,0 1200,60 L1440,40 L1440,220 Z"
          fill="#472E18"
        />
      </svg>

      <div className="absolute hidden xl:block" style={{ bottom: '140px', left: '5%', zIndex: 20, animation: 'float 4s ease-in-out infinite' }}>
        <Image
          src={raccoonStudy}
          alt="Mapache estudiando"
          width={500}
          height={500}
        />
      </div>

      <div className="absolute hidden xl:block" style={{ bottom: '140px', right: '5%', zIndex: 20, animation: 'float 4s ease-in-out 1s infinite' }}>
        <Image
          src={raccoonBackpack}
          alt="Mapache con mochila"
          width={500}
          height={500}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 pt-12 md:pt-16 pb-20 md:pb-36">
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl opacity-0 animate-fade-up"
          style={{ color: '#472E18', animationDelay: '0.1s' }}
        >
          ECOGO
          <br />
          La app para estudiar y pasar el examen ECOEMS 2026
        </h1>
        <p
          className="text-sm md:text-base lg:text-lg max-w-xl leading-relaxed opacity-0 animate-fade-up"
          style={{ color: '#472E18', animationDelay: '0.3s' }}
        >
          Prepárate de forma inteligente, práctica y sin estrés con la app diseñada para
          aspirantes a nivel medio superior. Aprende lo que realmente viene en el examen
          y mejora tus resultados desde hoy.
        </p>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
            style={{ backgroundColor: '#472E18', color: '#FFF9E4' }}
          >
            Cupos limitados para acceso anticipado          </button>
        </div>
      </div>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}

export default ComoFuncionaHero
