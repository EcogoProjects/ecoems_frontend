import Link from 'next/link'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-6" style={{ marginBottom: '40px' }}>
      <div className="rounded-[2rem] overflow-hidden bg-features/80 py-10 md:py-16 px-5 sm:px-8 md:px-14">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl bg-white/10 px-5 sm:px-8 py-6 text-center md:text-left">
              <div className="space-y-2">
                <p className="text-base font-semibold uppercase tracking-widest text-muted-foreground">Blog</p>
                <p className="text-lg md:text-xl font-bold text-foreground">
                  No te pierdas nada de tu proceso.
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Noticias, consejos de estudio y seguimiento de todo lo que necesitas saber sobre tu examen ECOEMS.
                </p>
              </div>
              <Link
                href="/blog"
                className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm text-background hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                style={{ backgroundColor: '#3D2B1F' }}
              >
                Ir al Blog →
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
