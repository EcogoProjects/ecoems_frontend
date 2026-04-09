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
