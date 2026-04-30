import type { Metadata } from 'next'
import {Analytics} from '@vercel/analytics/next'
import './globals.css'
import Providers from './providers'
import FaviconSwitcher from '@/components/shared/FaviconSwitcher'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'
import { Outfit } from "next/font/google";
import 'katex/dist/katex.min.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit'
});

export const metadata: Metadata = {
  title: {
    default: 'ECOGO | Guía para el ECOEMS 2026',
    template: '%s | ECOGO',
  },
  description: 'ECOGO es la app para prepararte para el ECOEMS 2026 y Mi Derecho Mi Lugar. Estudia con ejercicios tipo examen, sigue tu progreso y asegura tu lugar en la preparatoria que quieres.',
  keywords: [
    'ECOEMS', 'Mi Derecho Mi Lugar', 'COMIPEMS 2026',
    'bachillerato México', 'asignación preparatoria', 'educación media superior',
    'UNAM IPN 2026', 'preparatoria 2026 CDMX', 'bachillerato 2026 México',
    'proceso de asignación preparatoria', 'examen UNAM IPN 2026 en línea',
  ],
  authors: [{ name: 'ECOGO' }],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://ecogo.mx'),
  alternates:{
      canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://ecogo.mx',
    siteName: 'ECOGO',
    title: 'ECOGO | Guía para el ECOEMS 2026',
    description: 'ECOGO es la app para estudiar y dominar el ECOEMS 2026. Practica con ejercicios tipo examen y asegura tu lugar en la preparatoria que quieres.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECOGO - Asegura tu lugar con ECOGO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECOGO | Guía para el ECOEMS 2026',
    description: 'ECOGO es la app para estudiar y dominar el ECOEMS 2026. Practica con ejercicios tipo examen y asegura tu lugar en la preparatoria que quieres.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/ecogo_logo.png" />
      </head>
      <body>
        <GoogleAnalytics />
        <FaviconSwitcher />
        <Providers>{children}</Providers>
        <Analytics/>
      </body>
    </html>
  )
}
