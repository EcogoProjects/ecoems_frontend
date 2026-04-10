import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ECOEMS 2026 | Guía completa de asignación a bachillerato en México',
  description: 'Todo sobre ECOEMS y Mi Derecho Mi Lugar: cómo funciona el nuevo sistema de asignación a preparatoria 2026, fechas, instituciones y requisitos. Información clara para aspirantes.',
  alternates: { canonical: 'https://ecogo.mx/inicio' },
  openGraph: {
    title: 'ECOEMS 2026 | Guía de bachillerato en México',
    description: 'Información sobre el nuevo sistema de asignación a preparatoria: ECOEMS y Mi Derecho Mi Lugar.',
    url: 'https://ecogo.mx/inicio',
  },
}

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/inicio/HeroSection'
import FeatureCards from '@/components/inicio/FeatureCards'
import LatestNews from '@/components/inicio/LatestNews'
import StartBanner from '@/components/inicio/StartBanner'

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureCards />
        <LatestNews />
        <StartBanner />
      </main>
      <Footer />
    </div>
  )
}
