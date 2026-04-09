'use client'

import Image from 'next/image'
import { useState } from 'react'
import raccoonStudy from '@/assets/RacconStudy-removebg-preview.png'
import raccoonBackpack from '@/assets/RacconBackpack-removebg-preview.png'
import WaitlistModal from '@/components/shared/WaitlistModal'

const ComoFuncionaHero = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="w-full relative overflow-hidden" style={{ backgroundColor: '#472E18', minHeight: 'clamp(320px, 50vw, 460px)' }}>

      <div className="absolute hidden [@media(min-width:1507px)]:block" style={{ bottom: '140px', left: '5%', zIndex: 20, animation: 'float 4s ease-in-out infinite' }}>
        <Image
          src={raccoonStudy}
          alt="Mapache estudiando"
          width={500}
          height={500}
          style={{
            filter: 'brightness(0) saturate(100%) invert(91%) sepia(18%) saturate(400%) hue-rotate(350deg) brightness(97%) contrast(85%)',
          }}
        />
      </div>

      <div className="absolute hidden [@media(min-width:1507px)]:block" style={{ bottom: '140px', right: '5%', zIndex: 20, animation: 'float 4s ease-in-out 1s infinite' }}>
        <Image
          src={raccoonBackpack}
          alt="Mapache con mochila"
          width={500}
          height={500}
          style={{
            filter: 'brightness(0) saturate(100%) invert(91%) sepia(18%) saturate(400%) hue-rotate(350deg) brightness(97%) contrast(85%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 pt-12 md:pt-16 pb-20 md:pb-36">
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl opacity-0 animate-fade-up"
          style={{ color: '#FFF9E4', animationDelay: '0.1s' }}
        >
          ECOGO
          <br />
          La app para estudiar y pasar el examen ECOEMS 2026
        </h1>
        <p
          className="text-sm md:text-base lg:text-lg max-w-xl leading-relaxed opacity-0 animate-fade-up"
          style={{ color: '#FFF9E4', animationDelay: '0.3s' }}
        >
          Prepárate de forma inteligente, práctica y sin estrés con la app diseñada para
          aspirantes a nivel medio superior. Aprende lo que realmente viene en el examen
          y mejora tus resultados desde hoy.
        </p>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
            style={{ backgroundColor: '#FFF9E4', color: '#472E18' }}
          >
            Cupos limitados para acceso anticipado          </button>
        </div>
      </div>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}

export default ComoFuncionaHero
