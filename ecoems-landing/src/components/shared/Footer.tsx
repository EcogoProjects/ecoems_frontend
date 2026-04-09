import Image from 'next/image'
import ecogoLogo from '@/assets/ecogo_logo.png'

const Footer = () => {
  return (
    <footer className="bg-hero text-secondary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={ecogoLogo} alt="ECOGO" width={32} height={32} className="rounded-full" style={{ filter: 'brightness(0) saturate(100%) invert(91%) sepia(13%) saturate(395%) hue-rotate(352deg) brightness(96%) contrast(88%)' }} />
              <span className="font-bold text-lg">ECOGO</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              No dejes tu futuro al azar.
              <br />
              Empieza hoy con ECOGO y prepárate de forma inteligente para el examen
              <br />
              ECOEMS 2026.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">Navegación</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">¿Cómo Funciona?</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} ECOGO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
