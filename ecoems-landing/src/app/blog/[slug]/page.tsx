import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import BlogPost from '@/components/blog/BlogPost'
import { getPostBySlug, getAllSlugs } from '@/data/blog-posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog ECOGO`,
    description: post.excerpt,
    alternates: { canonical: `https://ecogo.mx/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://ecogo.mx/blog/${slug}`,
      publishedTime: post.date,
      authors: ['ECOGO'],
      images: post.coverImage
        ? [{ url: post.coverImage, width: 800, height: 450, alt: post.title }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : ['/og-image.png'],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'ECOGO', url: 'https://ecogo.mx' },
    publisher: { '@type': 'Organization', name: 'ECOGO', url: 'https://ecogo.mx' },
    url: `https://ecogo.mx/blog/${post.slug}`,
    ...(post.coverImage && { image: `https://ecogo.mx${post.coverImage}` }),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <BlogPost post={post} />
      </main>
      <Footer />
    </div>
  )
}
