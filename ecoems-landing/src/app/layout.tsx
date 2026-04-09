import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import FaviconSwitcher from '@/components/shared/FaviconSwitcher'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    default: 'ECOGO | Guía para el ECOEMS 2026',
    template: '%s | ECOGO',
  },
  description: 'Tu guía inteligente para dominar el ECOEMS 2026 y el proceso Mi Derecho Mi Lugar. Estudia mejor, elige tu prepa con estrategia.',
  keywords: [
    'ECOEMS', 'Mi Derecho Mi Lugar', 'COMIPEMS 2026',
    'bachillerato México', 'asignación preparatoria', 'educación media superior',
    'UNAM IPN 2026', 'preparatoria 2026 CDMX', 'bachillerato 2026 México',
    'proceso de asignación preparatoria', 'examen UNAM IPN 2026 en línea',
  ],
  authors: [{ name: 'ECOGO' }],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://ecogo.mx'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://ecogo.mx',
    siteName: 'ECOGO',
    title: 'ECOGO | Guía para el ECOEMS 2026',
    description: 'Tu guía inteligente para dominar el ECOEMS 2026 y el proceso Mi Derecho Mi Lugar.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECOGO - Asegura tu lugar con ECOGO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECOGO | Guía para el ECOEMS 2026',
    description: 'Tu guía inteligente para dominar el ECOEMS 2026 y el proceso Mi Derecho Mi Lugar.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/ecogo_logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <GoogleAnalytics />
        <FaviconSwitcher />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
