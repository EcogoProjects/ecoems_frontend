import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ECOEMS 2026 | Guía completa de asignación a bachillerato en México',
  description: 'Aprende todo sobre el ECOEMS y Mi Derecho Mi Lugar 2026: cómo funciona la asignación a preparatoria, fechas clave, instituciones participantes y cómo usar ECOGO para prepararte.',
  alternates: { canonical: 'https://ecogo.mx' },
  openGraph: {
    title: 'ECOEMS 2026 | Guía de bachillerato en México',
    description: 'Información completa sobre el ECOEMS y Mi Derecho Mi Lugar 2026: fechas, instituciones y cómo prepararte con ECOGO.',
    url: 'https://ecogo.mx',
  },
}

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/inicio/HeroSection'
import DiagnosticBanner from '@/components/inicio/DiagnosticBanner'
import FeatureCards from '@/components/inicio/FeatureCards'
import LatestNews from '@/components/inicio/LatestNews'
import StartBanner from '@/components/inicio/StartBanner'

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className='flex flex-col gap-4  '>
        <HeroSection />
        <DiagnosticBanner />
        <FeatureCards />
        <LatestNews />
        <StartBanner />
      </main>
      <Footer />
    </div>
  )
}
