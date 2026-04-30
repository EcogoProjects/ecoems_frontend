"use client";

import Image from "next/image";
import raccoon from "@/assets/Raccoon_exam.png";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

const DiagnosticBanner = () => {
  return (
    <section className="max-w-6xl md:w-full mx-auto px-6 pb-6">
      <AnimateOnScroll animation="fade-up">
        <div
          className="rounded-[2rem] overflow-hidden relative shadow-md"
          style={{ backgroundColor: "#D9AF72" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, #CDAD7533 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 flex flex-col [@media(min-width:700px)]:flex-row items-center gap-6 px-8 py-8 [@media(min-width:700px)]:px-12 [@media(min-width:700px)]:py-10">

            {/* Contenedor de la Imagen */}
            <div className="flex-shrink-0 w-40 h-40 [@media(min-width:700px)]:w-48 [@media(min-width:700px)]:h-48 relative order-first">
              <Image
                src={raccoon}
                alt="Mapache ECOGO"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>

            {/* Contenedor del Texto y Botón */}
            <div className="flex-1 text-center [@media(min-width:700px)]:text-right space-y-4">
              <h2
                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ color: "#472E18" }}
              >
                ¿Listo para saber que tan preparado estás?
                <div className="flex flex-col md:flex-row md:gap-2 items-center justify-center [@media(min-width:700px)]:justify-end">
                  <p className="text-2xl font-semibold">Realiza tu examen diagnóstico </p>
                  <span className="text-2xl font-semibold" style={{ color: "#472E18" }}>
                    completamente gratis.
                  </span>
                </div>
              </h2>

              {/* Párrafo modificado para alinear el bloque a la derecha en desktop */}
              <p
                className="text-sm md:text-right leading-relaxed max-w-md mx-auto [@media(min-width:700px)]:ml-auto [@media(min-width:700px)]:mr-0"
                style={{ color: "#472E18", opacity: 0.7 }}
              >
                Descubre tus fortalezas y áreas de oportunidad en minutos. Sin
                registro, sin costo — solo tú y tu conocimiento.
              </p>

              {/* Botón */}
              <a
                href="/diagnostic-exam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3 rounded-full font-bold text-sm transition-all duration-200 shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
                style={{ backgroundColor: "#472E18", color: "#FFF9E4" }}
              >
                Hacer examen diagnóstico
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default DiagnosticBanner;