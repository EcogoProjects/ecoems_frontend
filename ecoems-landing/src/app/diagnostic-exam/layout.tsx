import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulador ECOEMS 2026 | Examen Diagnóstico Gratis',
  description: 'Prueba el simulador ECOEMS oficial en ECOGO. Con nuestro examen diagnóstico ECOEMS, prepárate con reactivos actualizados para asegurar tu lugar en el concurso ECOEMS 2026.',
  keywords: [
    'Simulador ECOEMS',
    'examen diagnostico ecoems',
    'ecoems 2026',
    'Simulador ECOEMS 2026',
    'Examen Diagnóstico ECOEMS 2026',
    'ECOGO',
    'examen diagnóstico gratis',
    'guía ECOEMS'
  ],
  alternates: {
    canonical: '/diagnostic-exam',
  },
  openGraph: {
    title: 'Simulador ECOEMS 2026 | Examen Diagnóstico Gratis',
    description: 'Prueba el simulador del examen ECOEMS en ECOGO. Realiza el examen diagnóstico ECOEMS 2026 y mide tus conocimientos.',
    url: 'https://ecogo.mx/diagnostic-exam',
    type: 'website',
  },
}

export default function DiagnosticExamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
