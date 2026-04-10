import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost as BlogPostType } from '@/data/blog-posts'

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'ECOEMS':    { bg: '#472E18', text: '#FFF9E4' },
  'Consejos':  { bg: '#CDAD75', text: '#472E18' },
  'Bienestar': { bg: '#debb87', text: '#472E18' },
  'Estudio':   { bg: '#3D2B1F', text: '#EEE4C1' },
  'ECOGO':     { bg: '#8B6340', text: '#FFF9E4' },
}

interface Props {
  post: BlogPostType
}

const BlogPost = ({ post }: Props) => {

  return (
    <article>
      <div style={{ backgroundColor: '#472E18' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 flex flex-col gap-4 md:gap-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium w-fit px-4 py-1.5 rounded-full transition-all hover:opacity-80"
            style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
          >
            ← Volver al blog
          </Link>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight" style={{ color: '#FFF9E4' }}>
            {post.title}
          </h1>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: '#EEE4C1', opacity: 0.75 }}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between gap-3 pt-4 border-t flex-wrap" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
              >
                E
              </div>
              <span className="text-sm font-medium" style={{ color: '#EEE4C1' }}>By {post.author}</span>
              <span style={{ color: '#EEE4C1', opacity: 0.3 }}>·</span>
              <span className="text-xs" style={{ color: '#EEE4C1', opacity: 0.6 }}>{post.date}</span>
            </div>
            {(() => {
              const colors = CATEGORY_COLORS[post.category] ?? { bg: '#CDAD75', text: '#472E18' }
              return (
                <span
                  className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {post.category}
                </span>
              )
            })()}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 md:pt-10">
        {post.coverImage && (
          <div className="w-full rounded-2xl overflow-hidden bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-6 text-[15px] md:text-[16px] leading-relaxed">
        {post.content.map((block, i) => {
          if (block.type === 'paragraph') {
            return <p key={i} className="text-foreground/80">{block.text}</p>
          }
          if (block.type === 'heading') {
            return (
              <h2 key={i} className="text-xl md:text-2xl font-extrabold pt-4" style={{ color: '#472E18' }}>
                {block.text}
              </h2>
            )
          }
          if (block.type === 'list') {
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-foreground/80">
                    <span
                      className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#CDAD75' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )
          }
          if (block.type === 'callout') {
            return (
              <div
                key={i}
                className="rounded-2xl px-6 py-5 text-sm font-medium border-l-4"
                style={{
                  backgroundColor: '#FFF9E4',
                  color: '#472E18',
                  borderLeftColor: '#CDAD75',
                }}
              >
                {block.text}
              </div>
            )
          }
          return null
        })}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
        <div
          className="rounded-2xl px-5 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
          style={{ backgroundColor: '#472E18' }}
        >
          <div className="space-y-1">
            <p className="font-bold text-lg" style={{ color: '#FFF9E4' }}>¿Listo para prepararte?</p>
            <p className="text-sm" style={{ color: '#EEE4C1', opacity: 0.7 }}>
              Empieza hoy con ECOGO y llega preparado al ECOEMS 2026.
            </p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
          >
            Ver ECOGO →
          </Link>
        </div>
      </div>

    </article>
  )
}

export default BlogPost
