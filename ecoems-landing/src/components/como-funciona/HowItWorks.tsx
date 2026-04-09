'use client'

import Image from 'next/image'
import { useState } from 'react'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import WaitlistModal from '@/components/shared/WaitlistModal'
import raccoonButton from '@/assets/RacconButton.png'

const steps = [
  'Te registras en la app',
  'Accedes al contenido organizado por materias',
  'Practicas con simuladores tipo examen',
  'Identificas tus áreas de mejora',
  'Repites el proceso hasta sentirte listo',
]

const HowItWorks = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <AnimateOnScroll animation="fade-up">
        <div
          className="rounded-[2rem] px-6 md:px-16 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:gap-10 justify-between"
          style={{ backgroundColor: '#472E18' }}
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#FFF9E4' }}>
              ¿CÓMO FUNCIONA ECOGO?
            </h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <li className="flex items-start gap-3 text-sm" style={{ color: '#EEE4C1' }}>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-sm text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                </AnimateOnScroll>
              ))}
            </ol>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: '#EEE4C1', opacity: 0.6 }}>
              Este método te permite avanzar de forma progresiva y segura, sin sentirte abrumado
              y con claridad sobre tu progreso en todo momento.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src={raccoonButton}
              alt="Mapache ECOGO"
              width={400}
              height={400}
              className="animate-float w-48 sm:w-64 md:w-80 lg:w-[400px] h-auto"
              style={{
                filter: 'brightness(0) saturate(100%) invert(91%) sepia(18%) saturate(400%) hue-rotate(350deg) brightness(97%) contrast(85%)',
              }}
            />
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95 shadow-md"
              style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
            >
              Ya casi listo — ¡no te lo pierdas!
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}

export default HowItWorks
