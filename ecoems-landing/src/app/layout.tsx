import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import FaviconSwitcher from '@/components/shared/FaviconSwitcher'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'ECOGO',
  description: 'Tu guía inteligente para dominar el ECOEMS 2026. Estudia mejor, organiza tu tiempo.',
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
