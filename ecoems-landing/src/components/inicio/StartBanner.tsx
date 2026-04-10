import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

const StartBanner = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <AnimateOnScroll animation="fade-up">
        <div
          className="rounded-[2rem] px-6 py-7 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 text-center md:text-left"
          style={{ backgroundColor: "#472E18" }}
        >
          <div className="space-y-1">
            <h2 className="text-xl font-bold" style={{ color: "#FFF9E4" }}>
              Empieza hoy.
            </h2>
            <p className="text-sm" style={{ color: "#EEE4C1", opacity: 0.7 }}>
              Deja de perder tiempo estudiando sin resultados.
            </p>
          </div>
          <Link
            href="/contacto"
            className="flex-shrink-0 px-7 py-3 rounded-full font-semibold text-sm hover:scale-105 hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md"
            style={{ backgroundColor: "#CDAD75", color: "#472E18" }}
          >
            Contáctanos
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default StartBanner;
