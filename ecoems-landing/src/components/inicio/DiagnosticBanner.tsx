"use client";

import Image from "next/image";
import raccoon from "@/assets/RacconBackpack-removebg-preview.png";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

const DiagnosticBanner = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-6">
      <AnimateOnScroll animation="fade-up">
        <div
          className="rounded-[2rem] overflow-hidden relative"
          style={{ backgroundColor: "#FFF9E4" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, #CDAD7533 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col [@media(min-width:700px)]:flex-row items-center gap-0 [@media(min-width:700px)]:gap-6 px-8 py-8 [@media(min-width:700px)]:px-12 [@media(min-width:700px)]:py-10">
            <div className="flex-shrink-0 w-40 h-40 [@media(min-width:700px)]:w-48 [@media(min-width:700px)]:h-48 relative order-first [@media(min-width:700px)]:order-last">
              <Image
                src={raccoon}
                alt="Mapache ECOGO"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>

            <div className="flex-1 text-center [@media(min-width:700px)]:text-left space-y-4">
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ backgroundColor: "#CDAD75", color: "#472E18" }}
              >
                Completamente gratis
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ color: "#472E18" }}
              >
                ¿Listo para saber dónde estás?
                <br />
                <span style={{ color: "#8B5E2A" }}>
                  Realiza tu examen diagnóstico.
                </span>
              </h2>
              <p className="text-sm md:text-base leading-relaxed max-w-md" style={{ color: "#472E18", opacity: 0.7 }}>
                Descubre tus fortalezas y áreas de oportunidad en minutos. Sin
                registro, sin costo — solo tú y tu conocimiento.
              </p>
              <a
                href="https://app.ecogo.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3 rounded-full font-bold text-sm transition-all duration-200 shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
                style={{ backgroundColor: "#472E18", color: "#FFF9E4" }}
              >
                Hacer examen diagnóstico →
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default DiagnosticBanner;
