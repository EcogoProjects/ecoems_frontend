import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import raccoonLogo from "@/assets/raccoon-logo.png";

const Footer = () => {
  return (
    <footer className="bg-hero text-secondary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={raccoonLogo} alt="ECOGO" width={32} height={32} className="rounded-full" />
              <span className="font-bold text-lg">ECOGO</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              Tu guía inteligente para dominar el ECOEMS 2026. Estudia mejor, organiza tu tiempo.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">Navegación</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">¿Cómo Funciona?</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Precios</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">Síguenos</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-secondary-foreground/70" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} ECOGO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
