import Image from "next/image";
import Link from "next/link";
import ecogoLogo from "@/assets/ecogo_logo.png";

const Footer = () => {
  return (
    <footer className="bg-hero text-secondary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Image
                src={ecogoLogo}
                alt="ECOGO"
                width={32}
                height={32}
                className="rounded-full"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(91%) sepia(13%) saturate(395%) hue-rotate(352deg) brightness(96%) contrast(88%)",
                }}
              />
              <span className="font-bold text-lg">ECOGO</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              No dejes tu futuro al azar. Empieza hoy con ECOGO y prepárate de
              forma inteligente para el examen ECOEMS 2026.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li>
                <Link
                  href="/"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/como-funciona"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  ¿Cómo Funciona?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">
              Síguenos
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/app_ecogo?utm_source=qr&igsh=MW91emF6N3RucWV6ag%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@app.ecogo?_r=1&_t=ZS-95Qh5scFwcC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbCEr7M84OmAfxx9ar46"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-secondary-foreground/80">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li>
                <Link
                  href="/privacidad"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Aviso de Privacidad
                </Link>
              </li>
            </ul>
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
