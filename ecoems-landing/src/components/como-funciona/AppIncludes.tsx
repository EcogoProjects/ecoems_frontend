'use client'

import { BarChart2, BookOpen, Target, TrendingUp } from 'lucide-react'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

const features = [
  {
    icon: BarChart2,
    title: 'Simuladores de examen',
    description: 'Practica con ejercicios similares a los del examen real para familiarizarte con el formato y mejorar tu tiempo de respuesta.',
  },
  {
    icon: BookOpen,
    title: 'Contenido explicado fácil',
    description: 'Temas organizados y explicados de forma sencilla para que realmente entiendas, no solo memorices.',
  },
  {
    icon: Target,
    title: 'Enfoque en lo importante',
    description: 'Estudia lo que realmente viene en el examen y evita perder tiempo en contenido innecesario.',
  },
  {
    icon: TrendingUp,
    title: 'Seguimiento de tu progreso',
    description: 'Identifica en qué materias necesitas mejorar y enfoca mejor tu estudio.',
  },
]

const AppIncludes = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <AnimateOnScroll animation="fade-up">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#472E18' }}>
          ¿QUÉ INCLUYE LA APP?
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <AnimateOnScroll key={f.title} animation="fade-up" delay={i * 110}>
            <div className="group rounded-2xl overflow-hidden shadow-lg border border-border/50 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div
                className="flex items-center justify-center py-10"
                style={{ backgroundColor: '#472E18' }}
              >
                <f.icon
                  className="w-10 h-10 group-hover:animate-wiggle"
                  style={{ color: '#debb87' }}
                  strokeWidth={1.6}
                />
              </div>
              <div className="bg-card flex flex-col items-center text-center px-5 py-6 space-y-2 flex-1">
                <h3 className="font-bold text-base" style={{ color: '#472E18' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#472E18', opacity: 0.7 }}>
                  {f.description}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AppIncludes
