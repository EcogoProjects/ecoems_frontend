import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

export const metadata = {
  title: 'Blog ECOEMS 2026 | Noticias y guías de bachillerato',
  description: 'Noticias, consejos de estudio y guías para el ECOEMS 2026 y el proceso Mi Derecho Mi Lugar. Información clara para aspirantes a preparatoria en México.',
  alternates: { canonical: 'https://ecogo.mx/blog' },
  openGraph: {
    title: 'Blog ECOEMS 2026 | Noticias y guías de bachillerato',
    description: 'Noticias, consejos de estudio y guías para el ECOEMS 2026 y el proceso Mi Derecho Mi Lugar.',
    url: 'https://ecogo.mx/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <BlogHero />
        <BlogGrid />
      </main>
      <Footer />
    </div>
  )
}
