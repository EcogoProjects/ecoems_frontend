import { CalendarDays, ClipboardList, Users } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Calendario Inteligente",
    description: "ECOGO simplifies your study, organizes your time, para ECOEMS 2026.",
  },
  {
    icon: ClipboardList,
    title: "Simulacros de Examen",
    description: "Simulacros con examen, organize your time, and Simulacro de Examen.",
  },
  {
    icon: Users,
    title: "Progreso para Padres",
    description: "Progreso para conoce misma progreso/mama y progreso para Padres.",
  },
];

const FeatureCards = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 mt-16 relative z-20 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-card rounded-2xl px-6 py-8 shadow-lg border border-border/50 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-hero-cream flex items-center justify-center">
              <feature.icon className="w-7 h-7 text-hero" strokeWidth={1.8} />
            </div>
            <h3 className="font-bold text-foreground text-base">{feature.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
