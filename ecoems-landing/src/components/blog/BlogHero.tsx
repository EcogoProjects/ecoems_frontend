const BlogHero = () => {
  return (
    <section className="w-full relative overflow-hidden" style={{ backgroundColor: '#472E18', minHeight: '280px' }}>

      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'breathe 6s ease-in-out 1s infinite', transformOrigin: 'bottom center' }}
      >
        <path
          d="M0,180 L0,90 Q240,20 480,90 Q680,150 900,70 Q1100,10 1300,60 L1440,40 L1440,180 Z"
          fill="hsl(var(--background))"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-4 md:gap-5 pt-12 md:pt-14 pb-20 md:pb-32">
        <span
          className="text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full opacity-0 animate-fade-up"
          style={{ backgroundColor: '#CDAD75', color: '#472E18', animationDelay: '0.05s' }}
        >
          Blog ECOGO
        </span>
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl opacity-0 animate-fade-up"
          style={{ color: '#FFF9E4', animationDelay: '0.15s' }}
        >
          Todo lo que necesitas saber para el ECOEMS 2026
        </h1>
        <p
          className="text-base max-w-lg leading-relaxed opacity-0 animate-fade-up"
          style={{ color: '#EEE4C1', animationDelay: '0.3s' }}
        >
          Noticias, consejos de estudio y guías para que llegues preparado al examen más importante de tu vida.
        </p>
      </div>

    </section>
  )
}

export default BlogHero
