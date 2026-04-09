import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import { blogPosts } from '@/data/blog-posts'

const recentPosts = blogPosts.slice(0, 3)

const LatestNews = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <AnimateOnScroll animation="fade-up">
        <div className="flex flex-col [@media(min-width:922px)]:flex-row [@media(min-width:922px)]:items-end [@media(min-width:922px)]:justify-between gap-3 mb-8">
          <div className="space-y-1 text-center [@media(min-width:922px)]:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Últimas Noticias
            </h2>
            <p className="text-sm text-muted-foreground [@media(min-width:922px)]:whitespace-nowrap">
              Noticias, consejos de estudio y seguimiento de todo lo que necesitas saber sobre tu examen ECOEMS.
            </p>
          </div>
          <div className="flex justify-center [@media(min-width:922px)]:justify-end">
            <Link
              href="/blog"
              className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm text-background hover:opacity-90 transition-opacity shadow-md"
              style={{ backgroundColor: '#3D2B1F' }}
            >
              Ir al Blog →
            </Link>
          </div>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((post, i) => (
          <AnimateOnScroll key={post.slug} animation="fade-up" delay={i * 100}>
            <Link
              href={`/blog/${post.slug}`}
              className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-full h-44 bg-muted relative overflow-hidden">
                {post.coverImage && (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-foreground text-base leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground">{post.date}</p>
                <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <span className="text-xs font-semibold text-foreground">
                    En {post.category}
                  </span>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  )
}

export default LatestNews
