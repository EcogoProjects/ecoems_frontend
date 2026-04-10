'use client'

import { CalendarDays, ClipboardList, Users } from "lucide-react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

const features = [
  {
    icon: CalendarDays,
    title: "Aprende el método",
    description: "Descubre técnicas reales para estudiar mejor, entender más rápido y dejar de perder tiempo.",
  },
  {
    icon: ClipboardList,
    title: "Aplica mientras estudias",
    description: "No es teoría. Usas los métodos directamente en tus sesiones de estudio ",
  },
  {
    icon: Users,
    title: "Mejora todos los días",
    description: "Ve tu progreso, ajusta tu forma de estudiar y empieza a notar resultados reales.",
  },
];

const FeatureCards = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 relative z-20 pb-8" style={{ marginTop: '30px' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <AnimateOnScroll key={feature.title} animation="fade-up" delay={i * 120}>
            <div className="group bg-card rounded-2xl px-6 py-8 shadow-lg border border-border/50 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default h-full">
              <div className="w-14 h-14 rounded-xl bg-hero-cream flex items-center justify-center group-hover:animate-wiggle transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-hero" strokeWidth={1.8} />
              </div>
              <h3 className="font-bold text-foreground text-base">{feature.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">
                {feature.description}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
