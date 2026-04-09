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
