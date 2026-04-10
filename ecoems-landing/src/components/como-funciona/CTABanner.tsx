"use client";

import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

const CTABanner = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <AnimateOnScroll animation="fade-up">
        <div
          className="rounded-[2rem] px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          style={{ backgroundColor: "#debb87" }}
        >
          <div className="space-y-2">
            <h2
              className="text-xl md:text-2xl lg:text-3xl font-bold"
              style={{ color: "#472E18" }}
            >
              ¿Listo para empezar tu preparación?
            </h2>
            <p
              className="text-sm max-w-md text-justify"
              style={{ color: "#472E18", opacity: 0.7 }}
            >
              El examen ECOEMS es un gran paso, pero no tienes que darlo solo.
              Empieza hoy tu entrenamiento con ECOGO y llega al día de la prueba
              con la confianza de haber estudiado de forma inteligente.
              <br />
              ¡Inicia tu camino al éxito ahora!
            </p>
          </div>
          <Link
            href="/contacto"
            className="flex-shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95 shadow-md"
            style={{ backgroundColor: "#472E18", color: "#FFF9E4" }}
          >
            Ponte en contacto
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default CTABanner;
