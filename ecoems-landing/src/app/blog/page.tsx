import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

export const metadata = {
  title: 'Blog | ECOGO',
  description: 'Noticias, consejos de estudio y guías para el examen ECOEMS 2026.',
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
