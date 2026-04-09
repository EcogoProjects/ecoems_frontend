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
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <BlogPost post={post} />
      </main>
      <Footer />
    </div>
  )
}
