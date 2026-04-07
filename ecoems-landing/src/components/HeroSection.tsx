import phoneMockup from "@/assets/phone-mockup.png";

const HeroSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-4">
      <div className="rounded-[2rem] overflow-hidden relative min-h-[440px]" style={{ backgroundColor: '#3D2B1F' }}>
        {/* Decorative organic shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large blue-steel curved shape on right */}
          <div
            className="absolute -top-20 -right-10 w-[50%] h-[130%] rounded-[50%_30%_40%_60%]"
            style={{ backgroundColor: 'rgba(96, 125, 150, 0.55)' }}
          />
          {/* Cream/beige large circle bottom-right */}
          <div
            className="absolute -bottom-16 right-[5%] w-80 h-80 rounded-full"
            style={{ backgroundColor: 'rgba(210, 190, 165, 0.3)' }}
          />
          {/* Smaller cream circle top-center-right */}
          <div
            className="absolute top-[10%] right-[30%] w-28 h-28 rounded-full"
            style={{ backgroundColor: 'rgba(210, 190, 165, 0.2)' }}
          />
          {/* Extra beige accent blob */}
          <div
            className="absolute top-[40%] right-[18%] w-44 h-44 rounded-full"
            style={{ backgroundColor: 'rgba(190, 170, 140, 0.15)' }}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center px-8 md:px-14 py-12 md:py-16 gap-8">
          {/* Left content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] text-secondary-foreground">
              Domina tu Futuro Educativo: Tu Guía Inteligente para ECOEMS 2026.
            </h1>
            <p className="text-secondary-foreground/75 text-sm md:text-base max-w-md leading-relaxed">
              ECOGO simplifies your study, organizes your time, and ensures you're prepared. Perfect for students and parents seeking peace of mind.
            </p>
            <button className="bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg">
              Descargar App
            </button>
          </div>

          {/* Phone mockup */}
          <div className="flex-shrink-0 relative">
            <img
              src={phoneMockup}
              alt="ECOGO App"
              width={280}
              height={420}
              className="drop-shadow-2xl relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
