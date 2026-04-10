"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ecogoLogo from "@/assets/ecogo_logo.png";

export default function NotFound() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative px-6"
      style={{ backgroundColor: "#F5EFE4" }}
    >
      <div
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30 animate-breathe"
        style={{ backgroundColor: "#CDAD75", animationDelay: "0s" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full opacity-20 animate-breathe"
        style={{ backgroundColor: "#472E18", animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/2 -left-16 w-[200px] h-[200px] rounded-full opacity-15 animate-breathe"
        style={{ backgroundColor: "#CDAD75", animationDelay: "3s" }}
      />
      <div
        className="absolute -top-10 right-1/4 w-[140px] h-[140px] rounded-full opacity-20 animate-breathe"
        style={{ backgroundColor: "#472E18", animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-[100px] h-[100px] rounded-full opacity-25 animate-breathe"
        style={{ backgroundColor: "#CDAD75", animationDelay: "0.8s" }}
      />
      <div
        className="absolute top-1/3 -right-10 w-[180px] h-[180px] rounded-full opacity-15 animate-breathe"
        style={{ backgroundColor: "#CDAD75", animationDelay: "2.5s" }}
      />
      <div
        className="absolute bottom-1/3 -right-20 w-[260px] h-[260px] rounded-full opacity-10 animate-breathe"
        style={{ backgroundColor: "#472E18", animationDelay: "4s" }}
      />
      <div
        className="absolute top-20 left-1/3 w-[70px] h-[70px] rounded-full opacity-20 animate-breathe"
        style={{ backgroundColor: "#472E18", animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 right-1/3 w-[50px] h-[50px] rounded-full opacity-30 animate-breathe"
        style={{ backgroundColor: "#CDAD75", animationDelay: "3.5s" }}
      />
      <div
        className="absolute -bottom-10 left-1/2 w-[220px] h-[220px] rounded-full opacity-15 animate-breathe"
        style={{ backgroundColor: "#CDAD75", animationDelay: "1.2s" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-lg">
        <div
          className="rounded-full p-5 shadow-2xl animate-float"
          style={{
            backgroundColor: "#CDAD75",
            opacity: ready ? 1 : 0,
            transform: ready
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.85)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "0.1s",
          }}
        >
          <Image
            src={ecogoLogo}
            alt="ECOGO"
            width={72}
            height={72}
            className="drop-shadow-xl"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4 leading-none select-none">
          {["4", "0", "4"].map((digit, i) => (
            <span
              key={i}
              className="text-[7rem] md:text-[10rem] font-extrabold"
              style={{
                color: i === 1 ? "#472E18" : "#CDAD75",
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
                transitionDelay: `${0.25 + i * 0.1}s`,
                display: "inline-block",
                lineHeight: 1,
                animation: ready
                  ? `float ${4 + i * 0.8}s ease-in-out ${i * 0.4}s infinite`
                  : "none",
              }}
            >
              {digit}
            </span>
          ))}
        </div>

        <div
          className="space-y-2"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "0.6s",
          }}
        >
          <h1
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: "#472E18" }}
          >
            Te perdiste antes del examen
          </h1>
          <p
            className="text-sm md:text-base leading-relaxed max-w-sm mx-auto"
            style={{ color: "#472E18", opacity: 0.6 }}
          >
            Esta página no existe. Pero tu lugar en la prepa sí puede existir.
            <br /> Vuelve al inicio y retoma el camino.
          </p>
        </div>

        <div
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "0.85s",
          }}
        >
          <Link
            href="/inicio"
            className="inline-block px-9 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 animate-pulse-soft"
            style={{ backgroundColor: "#472E18", color: "#e0d2b8" }}
          >
            Volver al inicio
          </Link>
        </div>

        <div
          className="flex items-center gap-3 mt-2"
          style={{
            opacity: ready ? 0.4 : 0,
            transition: "opacity 0.6s ease",
            transitionDelay: "1.1s",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 2 ? 28 : 8,
                height: 8,
                backgroundColor: "#472E18",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
