import Image from 'next/image'
import Link from 'next/link'

export default function EmailConfirmation() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-base-soft text-base-dark px-6 pt-10 pb-8">

      {/* Botanical deco — top left */}
      <svg
        className="absolute -top-10 -left-10 opacity-55 pointer-events-none z-0"
        width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true"
      >
        <path d="M40 240 Q 60 160, 120 110 Q 170 75, 220 50" stroke="#472E18" strokeWidth="1.2" fill="none" opacity="0.5" />
        <ellipse cx="80" cy="190" rx="18" ry="9" fill="#CDAD75" transform="rotate(-30 80 190)" opacity="0.6" />
        <ellipse cx="135" cy="135" rx="20" ry="10" fill="#472E18" transform="rotate(35 135 135)" opacity="0.45" />
        <ellipse cx="195" cy="80" rx="15" ry="7" fill="#CDAD75" transform="rotate(-15 195 80)" opacity="0.7" />
        <circle cx="50" cy="120" r="3" fill="#472E18" opacity="0.4" />
        <circle cx="240" cy="160" r="4" fill="#CDAD75" opacity="0.5" />
      </svg>

      {/* Botanical deco — bottom right */}
      <svg
        className="absolute -bottom-15 -right-15 opacity-45 pointer-events-none z-0 rotate-180"
        width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true"
      >
        <path d="M40 280 Q 90 200, 160 150 Q 220 110, 280 70" stroke="#472E18" strokeWidth="1.2" fill="none" opacity="0.45" />
        <ellipse cx="100" cy="210" rx="22" ry="11" fill="#CDAD75" transform="rotate(-25 100 210)" opacity="0.55" />
        <ellipse cx="180" cy="140" rx="18" ry="9" fill="#472E18" transform="rotate(40 180 140)" opacity="0.4" />
        <ellipse cx="250" cy="90" rx="16" ry="8" fill="#CDAD75" transform="rotate(-10 250 90)" opacity="0.65" />
      </svg>

      {/* Scattered decorative dots */}
      <span className="absolute top-[90px] right-[12%] w-1.5 h-1.5 rounded-full bg-base-dark opacity-[0.18] pointer-events-none" />
      <span className="absolute top-[24%] left-[8%] w-1 h-1 rounded-full bg-base-dark opacity-30 pointer-events-none" />
      <span className="absolute bottom-[30%] right-[9%] w-2 h-2 rounded-full bg-base-dark opacity-[0.12] pointer-events-none" />
      <span className="absolute bottom-[18%] left-[14%] w-[5px] h-[5px] rounded-full bg-base-dark opacity-[0.22] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-[980px] flex items-center gap-2.5 z-10">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-[10px] bg-base flex items-center justify-center overflow-hidden border border-base-dark/10">
            <Image src="/assets/logo.png" alt="Ecogo" width={40} height={40} className="w-[110%] h-[110%] object-cover" />
          </span>
          <span className="font-semibold text-[19px] tracking-tight">ecogo</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-[560px] z-10 py-6">

        {/* Hero flotante */}
        <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] mb-7 sm:mb-9 animate-floaty">
          {/* Círculo base */}
          <div className="absolute inset-0 rounded-full bg-base" />
          {/* Anillos decorativos */}
          <div
            className="absolute rounded-full border border-dashed border-base-dark/25"
            style={{ inset: '-14px' }}
          />
          <div
            className="absolute rounded-full border border-dashed border-base-dark/[0.12]"
            style={{ inset: '-32px' }}
          />
          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="Mapache de Ecogo leyendo"
              width={172}
              height={172}
              className="object-contain w-[78%] h-[78%]"
              priority
            />
          </div>
          {/* Badge de sobre */}
          <div
            className="absolute right-[-6px] bottom-[10px] w-[54px] h-[54px] sm:w-16 sm:h-16 rounded-full bg-base-soft border border-base-dark flex items-center justify-center shadow-[0_10px_24px_rgba(71,46,24,0.18)]"
            aria-hidden="true"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="13" rx="1.6" stroke="#472E18" strokeWidth="1.6" />
              <path d="M4 7 L12 13 L20 7" stroke="#472E18" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Sello de estado */}
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-base text-xs font-medium tracking-widest uppercase text-base-dark mb-4">
          <span className="relative block w-[7px] h-[7px] rounded-full bg-base-dark after:content-[''] after:absolute after:inset-[-3px] after:block after:rounded-full after:bg-base-dark after:opacity-30 after:animate-pulse-dot" />
          Cuenta creada
        </span>

        <h1 className="text-[clamp(30px,5.4vw,52px)] font-semibold tracking-tight leading-[1.05] mb-5 text-balance">
          ¡Casi listo! Revisa tu correo
        </h1>

        <p className="text-[clamp(15px,1.7vw,18px)] leading-relaxed mb-7 opacity-75 text-pretty max-w-[480px]">
          Te enviamos un enlace de confirmación a tu bandeja de entrada.
          Ábrelo para activar tu cuenta y comenzar tu camino con Ecogo.
        </p>

        {/* Nota de spam */}
        <div className="inline-flex items-center gap-2.5 px-4 py-3 bg-base-extra-light rounded-xl border border-base-dark/[0.08] text-sm text-base-dark opacity-85">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="12" cy="12" r="9" stroke="#472E18" strokeWidth="1.6" />
            <path d="M12 8 V 12.5" stroke="#472E18" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="#472E18" />
          </svg>
          <span>
            Si no lo encuentras, revisa <strong className="font-semibold">spam</strong> o{' '}
            <strong className="font-semibold">promociones</strong>.
          </span>
        </div>

        <Link
          href="/app/login"
          className="mt-8 text-sm underline opacity-55 hover:opacity-100 transition-opacity"
        >
          Ir al inicio de sesión
        </Link>
      </main>

      {/* Footer */}
    </div>
  )
}
