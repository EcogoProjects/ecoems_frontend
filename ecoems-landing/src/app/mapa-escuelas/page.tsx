import type { Metadata } from 'next'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import escuelas from '@/data/escuelas.json'
import MapaEscuelasView from '@/components/mapa-escuelas/MapaEscuelasView'

export const metadata: Metadata = {
  title: 'Mapa de escuelas ECOEMS 2026',
  description: 'Explora el mapa interactivo de escuelas participantes del ECOEMS 2026 y filtra por municipio, institución, especialidad y tipo de participación.',
  alternates: { canonical: 'https://ecogo.mx/mapa-escuelas' },
  openGraph: {
    title: 'Mapa de escuelas ECOEMS 2026',
    description: 'Consulta el mapa interactivo de escuelas participantes del ECOEMS 2026.',
    url: 'https://ecogo.mx/mapa-escuelas',
  },
}

export default function MapaEscuelasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <MapaEscuelasView escuelas={escuelas} />
      </main>
      <Footer />
    </div>
  )
}
