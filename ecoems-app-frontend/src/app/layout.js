import { Outfit } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import AppProvider from "@/components/AppProvider";
import NavigationOverlay from "@/components/NavigationOverlay";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "ECOGO | App de estudio para el ECOEMS",
  description: "Prepárate para el examen ECOEMS con la mejor app de estudio en línea. Simulacros, examenes interactivos y todo lo que necesitas para asegurar tu lugar.",
  keywords: [
    'ECOEMS', 'Mi Derecho Mi Lugar', 'COMIPEMS 2026',
    'bachillerato México', 'asignación preparatoria', 'educación media superior',
    'UNAM IPN 2026', 'preparatoria 2026 CDMX', 'bachillerato 2026 México',
    'proceso de asignación preparatoria', 'examen UNAM IPN 2026 en línea',
    'ECOGO', 'ECOGO app', 'ECOEMS simulacro', 'ECOEMS guía', 'ECOEMS 2026'
  ],
  authors: [{ name: 'ECOGO' }],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://app.ecogo.mx/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ECOGO | App de estudio para el ECOEMS",
    description: "Prepárate para el examen ECOEMS con la mejor app de estudio en línea. Simulacros, guías interactivas y todo lo que necesitas para asegurar tu lugar.",
    url: "https://app.ecogo.mx/",
    siteName: "ECOGO",
    images: [
      {
        url: "/metadata/metadata_image.png",
        width: 1200,
        height: 630,
        alt: "ECOGO | App de estudio para el ECOEMS",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECOGO | App de estudio para el ECOEMS",
    description: "Prepárate para el examen ECOEMS con la mejor app de estudio en línea. Simulacros, guías interactivas y todo lo que necesitas para asegurar tu lugar.",
    images: ["/metadata/metadata_image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppProvider>{children}</AppProvider>
        <NavigationOverlay />
        <Analytics />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
