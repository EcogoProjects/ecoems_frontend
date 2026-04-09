'use client'

import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import { blogPosts } from '@/data/blog-posts'

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'ECOEMS':    { bg: '#472E18', text: '#FFF9E4' },
  'Consejos':  { bg: '#CDAD75', text: '#472E18' },
  'Bienestar': { bg: '#debb87', text: '#472E18' },
  'Estudio':   { bg: '#3D2B1F', text: '#EEE4C1' },
  'ECOGO':     { bg: '#8B6340', text: '#FFF9E4' },
}

const CategoryBadge = ({ category }: { category: string }) => {
  const colors = CATEGORY_COLORS[category] ?? { bg: '#472E18', text: '#FFF9E4' }
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  )
}

const BlogGrid = () => {
  const featured = blogPosts.find(p => p.featured)!
  const rest = blogPosts.filter(p => !p.featured)

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20 pt-4">

      <AnimateOnScroll animation="fade-up">
        <Link
          href={`/blog/${featured.slug}`}
          className="group flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-10"
        >
          <div className="w-full md:w-1/2 h-56 md:h-72 bg-muted flex-shrink-0 relative overflow-hidden">
            {featured.coverImage && (
              <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" quality={90} />
            )}
          </div>
          <div className="flex flex-col justify-center gap-3 p-7 bg-card flex-1">
            <div className="flex items-center gap-3">
              <CategoryBadge category={featured.category} />
              <span className="text-xs text-muted-foreground">{featured.date}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground leading-snug group-hover:underline underline-offset-4 decoration-2">
              {featured.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-1">
              <span className="text-xs text-muted-foreground">{featured.author}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs font-semibold" style={{ color: '#472E18' }}>Leer artículo →</span>
            </div>
          </div>
        </Link>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Más artículos</h3>
          <div className="flex-1 h-px bg-border" />
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rest.map((post, i) => (
          <AnimateOnScroll key={post.slug} animation="fade-up" delay={i * 80}>
            <Link
              href={`/blog/${post.slug}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-full h-40 bg-muted flex-shrink-0 relative overflow-hidden">
                {post.coverImage && (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CategoryBadge category={post.category} />
                  <span className="text-[10px] text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <span className="text-xs font-semibold" style={{ color: '#472E18' }}>Leer →</span>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>

    </section>
  )
}

export default BlogGrid
