"use client";

import Image from "next/image";
import { useState } from "react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import WaitlistModal from "@/components/shared/WaitlistModal";
import triosRaccoon from "@/assets/TriosRaccoon-removebg-preview.png";

const WhatIsEcogo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="max-w-6xl mx-auto px-6 pt-12 pb-10">
      <AnimateOnScroll animation="fade-up">
        <div
          className="rounded-[2rem] px-6 md:px-16 py-10 md:py-14 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          style={{ backgroundColor: "#debb87" }}
        >
          <div className="flex-1">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "#472E18" }}
            >
              ¿Qué es ECOGO?
            </h2>
            <p
              className="text-base leading-relaxed max-w-xl mb-10 text-justify"
              style={{ color: "#472E18", opacity: 0.8 }}
            >
              ECOGO es una app de estudio diseñada para estudiantes que quieren
              entrar al nivel medio superior a través del ECOEMS 2026. Estamos
              construyendo la herramienta que reúne todo lo que necesitas en un
              solo lugar: práctica, seguimiento y estrategia, para que llegues
              preparado el día del examen. Próximamente disponible — regístrate
              y sé de los primeros en acceder.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95 shadow-md"
              style={{ backgroundColor: "#472E18", color: "#FFF9E4" }}
            >
              Estamos por lanzar, regístrate y asegura tu lugar.
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center animate-float w-full md:w-auto">
            <Image
              src={triosRaccoon}
              alt="Tres mapaches ECOGO"
              width={460}
              height={320}
              className="w-full max-w-[320px] md:max-w-[460px] h-auto"
            />
          </div>
        </div>
      </AnimateOnScroll>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default WhatIsEcogo;
