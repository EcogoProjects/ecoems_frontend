import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo funciona ECOGO | Prepárate para el ECOEMS 2026',
  description: 'Descubre cómo ECOGO te prepara para el ECOEMS 2026: practica con ejercicios tipo examen personalizados, rastrea tu avance y llega listo al proceso Mi Derecho Mi Lugar.',
  alternates: { canonical: 'https://ecogo.mx/como-funciona' },
  openGraph: {
    title: 'Cómo funciona ECOGO | ECOEMS 2026',
    description: 'Conoce las funciones de ECOGO: ejercicios tipo examen, seguimiento de progreso y estrategia para el ECOEMS 2026.',
    url: 'https://ecogo.mx/como-funciona',
  },
}

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ComoFuncionaHero from '@/components/como-funciona/ComoFuncionaHero'
import WhatIsEcogo from '@/components/como-funciona/WhatIsEcogo'
import AppIncludes from '@/components/como-funciona/AppIncludes'
import HowItWorks from '@/components/como-funciona/HowItWorks'
import CTABanner from '@/components/como-funciona/CTABanner'

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ComoFuncionaHero />
        <WhatIsEcogo />
        <AppIncludes />
        <HowItWorks />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
