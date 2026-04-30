import Image from 'next/image'

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-base-dark text-base-soft px-6 pt-10 pb-8">

      {/* Botanical deco — top left */}
      <svg
        className="absolute -top-10 -left-10 opacity-35 pointer-events-none z-0"
        width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true"
      >
        <path d="M40 240 Q 60 160, 120 110 Q 170 75, 220 50" stroke="#FFF9E4" strokeWidth="1.2" fill="none" opacity="0.5" />
        <ellipse cx="80" cy="190" rx="18" ry="9" fill="#CDAD75" transform="rotate(-30 80 190)" opacity="0.7" />
        <ellipse cx="135" cy="135" rx="20" ry="10" fill="#EEE4C1" transform="rotate(35 135 135)" opacity="0.5" />
        <ellipse cx="195" cy="80" rx="15" ry="7" fill="#CDAD75" transform="rotate(-15 195 80)" opacity="0.75" />
        <circle cx="50" cy="120" r="3" fill="#FFF9E4" opacity="0.5" />
        <circle cx="240" cy="160" r="4" fill="#CDAD75" opacity="0.6" />
      </svg>

      {/* Botanical deco — bottom right */}
      <svg
        className="absolute -bottom-15 -right-15 opacity-30 pointer-events-none z-0 rotate-180"
        width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true"
      >
        <path d="M40 280 Q 90 200, 160 150 Q 220 110, 280 70" stroke="#FFF9E4" strokeWidth="1.2" fill="none" opacity="0.45" />
        <ellipse cx="100" cy="210" rx="22" ry="11" fill="#CDAD75" transform="rotate(-25 100 210)" opacity="0.6" />
        <ellipse cx="180" cy="140" rx="18" ry="9" fill="#EEE4C1" transform="rotate(40 180 140)" opacity="0.45" />
        <ellipse cx="250" cy="90" rx="16" ry="8" fill="#CDAD75" transform="rotate(-10 250 90)" opacity="0.65" />
      </svg>

      {/* Scattered dots */}
      <span className="absolute top-[100px] right-[12%] w-1.5 h-1.5 rounded-full bg-base-soft opacity-25 pointer-events-none" />
      <span className="absolute top-[26%] left-[8%] w-1 h-1 rounded-full bg-base-soft opacity-30 pointer-events-none" />
      <span className="absolute bottom-[30%] right-[9%] w-2 h-2 rounded-full bg-base-soft opacity-[0.12] pointer-events-none" />
      <span className="absolute bottom-[22%] left-[14%] w-[5px] h-[5px] rounded-full bg-base-soft opacity-[0.22] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-[980px] flex items-center gap-2.5 z-10">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-[10px] bg-base flex items-center justify-center overflow-hidden border border-base-soft/15">
            <Image src="/assets/logo.png" alt="Ecogo" width={40} height={40} className="w-[110%] h-[110%] object-cover" />
          </span>
          <span className="font-semibold text-[19px] tracking-tight text-base-soft">ecogo</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-[600px] z-10 py-6">

        {/* Hero */}
        <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] mb-8">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-base-hard" />

          {/* Spinning ring 1 */}
          <div
            className="absolute rounded-full border border-dashed border-base-soft/35"
            style={{ inset: '-16px', animation: 'spin-slow 40s linear infinite' }}
          />
          {/* Spinning ring 2 */}
          <div
            className="absolute rounded-full border border-dashed border-base-soft/[0.18]"
            style={{ inset: '-36px', animation: 'spin-slow 70s linear infinite reverse' }}
          />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center animate-floaty">
            <Image
              src="/assets/logo.png"
              alt="Mapache de Ecogo trabajando"
              width={192}
              height={192}
              className="object-contain w-[78%] h-[78%]"
              priority
            />
          </div>

          {/* Tool badge — top right (wrench) */}
          <div
            className="absolute -top-1.5 right-1 w-14 h-14 sm:w-[56px] sm:h-[56px] rounded-full bg-base-soft border border-base-dark flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] z-10"
            style={{ animation: 'bob 4.5s ease-in-out infinite' }}
            aria-hidden="true"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.7 6.3 a 4 4 0 0 0 -5.4 5.4 L 3 18 l 3 3 l 6.3 -6.3 a 4 4 0 0 0 5.4 -5.4 l -2.3 2.3 l -2.7 -2.7 z"
                stroke="#472E18" strokeWidth="1.6" strokeLinejoin="round" fill="none"
              />
            </svg>
          </div>

          {/* Tool badge — bottom left (settings/sun) */}
          <div
            className="absolute bottom-3.5 -left-2.5 w-14 h-14 sm:w-[56px] sm:h-[56px] rounded-full bg-base-soft border border-base-dark flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] z-10"
            style={{ animation: 'bob 4.5s ease-in-out 1.5s infinite' }}
            aria-hidden="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#472E18" strokeWidth="1.6" />
              <path
                d="M12 3 v 2 M12 19 v 2 M3 12 h 2 M19 12 h 2 M5.6 5.6 l 1.4 1.4 M17 17 l 1.4 1.4 M5.6 18.4 l 1.4 -1.4 M17 7 l 1.4 -1.4"
                stroke="#472E18" strokeWidth="1.6" strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Tool badge — bottom right (clipboard check) */}
          <div
            className="absolute -bottom-0.5 right-4 w-12 h-12 sm:w-[48px] sm:h-[48px] rounded-full bg-base-soft border border-base-dark flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.35)] z-10"
            style={{ animation: 'bob 4.5s ease-in-out 0.8s infinite' }}
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 3 l 6 0 l 0 4 l 4 0 l 0 14 l -14 0 l 0 -14 l 4 0 z"
                stroke="#472E18" strokeWidth="1.6" strokeLinejoin="round" fill="none"
              />
              <path d="M8 13 l 3 3 l 5 -6" stroke="#472E18" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Stamp badge */}
        <span className="inline-flex items-center gap-2 px-3.5 py-[7px] rounded-full bg-base-soft/10 border border-base-soft/20 text-xs font-medium tracking-widest uppercase text-base-soft mb-4">
          <span className="relative block w-[7px] h-[7px] rounded-full bg-base-hard after:content-[''] after:absolute after:inset-[-3px] after:block after:rounded-full after:bg-base-hard after:opacity-40 after:animate-pulse-dot" />
          En desarrollo
        </span>

        <h1 className="text-[clamp(34px,5.4vw,54px)] font-semibold tracking-tight leading-[1.02] mb-5 text-balance text-base-soft">
          Estamos puliendo<br />los últimos detalles
        </h1>

        <p className="text-[clamp(16px,1.7vw,18px)] leading-relaxed mb-8 text-base-soft/80 text-pretty max-w-[500px]">
          Nuestro equipo está terminando la app para que pronto puedas
          empezar a moverte de forma consciente. En los próximos días
          recibirás un correo con tu acceso.
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-[420px] mb-7" aria-hidden="true">
          <div className="relative h-2 bg-base-soft/[0.12] rounded-full overflow-hidden border border-base-soft/[0.08]">
            <div
              className="absolute top-0 bottom-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #CDAD75, #FFF9E4)',
                animation: 'progress-shimmer 2.6s ease-in-out infinite',
              }}
            />
          </div>
          <div className="flex justify-between mt-2.5 text-xs font-medium tracking-wider uppercase text-base-soft/60">
            <span>Construyendo</span>
            <span>Muy pronto</span>
          </div>
        </div>

        {/* Note */}
        <div className="inline-flex items-center gap-2.5 px-4 py-3 bg-base-soft/[0.08] rounded-xl border border-base-soft/15 text-sm text-base-soft">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <rect x="3" y="6" width="18" height="13" rx="1.6" stroke="#FFF9E4" strokeWidth="1.6" />
            <path d="M4 7 L12 13 L20 7" stroke="#FFF9E4" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span>Te avisaremos por <strong className="font-semibold">correo</strong> en cuanto esté lista.</span>
        </div>

      </main>

    </div>
  )
}