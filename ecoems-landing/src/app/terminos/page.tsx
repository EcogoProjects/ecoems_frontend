import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'Términos y Condiciones | ECOGO',
  description: 'Términos de servicio y condiciones de uso para los planes y plataforma de ECOGO.',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>

        <section className="w-full relative overflow-hidden" style={{ backgroundColor: '#472E18', minHeight: '240px' }}>
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{ backgroundColor: 'hsl(var(--background))', height: '30px' }}
          />
          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-4 pt-12 pb-20 md:pb-28">
            <span
              className="text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full"
              style={{ backgroundColor: '#CDAD75', color: '#472E18' }}
            >
              Legal
            </span>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ color: '#FFF9E4' }}
            >
              Términos y Condiciones
            </h1>
            <p className="text-sm" style={{ color: '#EEE4C1', opacity: 0.7 }}>
              Última actualización: 10 de abril de 2026
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-10 text-[15px] md:text-[16px] leading-relaxed">

          <p className="text-foreground/80">
            Al acceder y utilizar <strong>ECOGO.mx</strong>, usted acepta estar sujeto a los siguientes Términos y Condiciones de uso. Por favor, léalos cuidadosamente antes de utilizar nuestros servicios o adquirir cualquier plan, incluyendo el Plan Pro.
          </p>

          <Section title="1. Aceptación de los Términos">
            <p className="text-foreground/80">
              Al registrarse en la plataforma, acceder al contenido o adquirir el <strong>Plan Pro</strong>, usted confirma que ha leído, comprendido y aceptado en su totalidad estos términos. Si no está de acuerdo con alguno de ellos, no debe utilizar nuestros servicios.
            </p>
          </Section>

          <Section title="2. Descripción del Servicio">
            <p className="text-foreground/80">
              ECOGO es una plataforma educativa diseñada para preparar a los aspirantes para el examen ECOEMS. Ofrecemos dos tipos de acceso:
            </p>
            <SubSection title="2.1 Plan Smart (Gratuito)">
              <BulletList items={[
                'Acceso limitado a material de estudio básico.',
                'Acceso a un examen simulacro.',
                'Pistas limitadas por día.'
              ]} />
            </SubSection>
            <SubSection title="2.2 Plan Pro (De Pago)">
              <BulletList items={[
                'Acceso ilimitado a material de estudio.',
                'Hasta 3 exámenes simulacro.',
                'Pistas y explicaciones detalladas para todas las preguntas.'
              ]} />
            </SubSection>
          </Section>

          <Section title="3. Términos Específicos del Plan Pro">
            <SubSection title="3.1 Vigencia del acceso">
              <p className="text-foreground/80">
                Al adquirir el Plan Pro, su cuenta se mantendrá activa y con todas las características premium desbloqueadas hasta la fecha del examen ECOEMS indicada en la plataforma (actualmente 18 de diciembre de 2026). No hay cargos recurrentes ocultos ni renovaciones automáticas sorpresa después de esta fecha.
              </p>
            </SubSection>
            <SubSection title="3.2 Política de Reembolso">
              <p className="text-foreground/80">
                Queremos que estudies con total tranquilidad. Ofrecemos una garantía de satisfacción de 7 días. Si durante su primera semana con el Plan Pro considera que la plataforma no se adapta a sus necesidades, puede solicitar la devolución del 100% de su pago enviando un correo a soporte. Pasados estos 7 días, no se emitirán reembolsos parciales ni totales.
              </p>
            </SubSection>
            <SubSection title="3.3 Uso de la cuenta">
              <p className="text-foreground/80">
                La cuenta del Plan Pro es <strong>personal e intransferible</strong>. Compartir credenciales de acceso con terceros puede resultar en la suspensión temporal o cancelación permanente de la cuenta sin derecho a reembolso.
              </p>
            </SubSection>
          </Section>

          <Section title="4. Pagos y Facturación">
            <p className="text-foreground/80">
              Por el momento, el único método de pago aceptado para la adquisición del Plan Pro es mediante <strong>transferencia bancaria directa</strong>. Nuestro equipo se encuentra trabajando activamente en la futura integración de pasarelas de pago seguras para habilitar transacciones automatizadas con tarjeta de crédito y débito. Los precios mostrados en la plataforma incluyen los impuestos aplicables.
            </p>
          </Section>

          <Section title="5. Propiedad Intelectual">
            <p className="text-foreground/80">
              Todo el contenido, diseño, logotipos, preguntas, explicaciones y software de ECOGO están protegidos por derechos de autor. Queda estrictamente prohibida su reproducción, distribución o uso para fines comerciales sin nuestra autorización explícita.
            </p>
          </Section>

          <Section title="6. Acceso Anticipado y Reporte de Errores">
            <p className="text-foreground/80">
              La plataforma ECOGO se encuentra actualmente en una fase de <strong>acceso anticipado (Early Access)</strong> y en desarrollo continuo. Durante este periodo de mejora constante, es posible que los usuarios experimenten intermitencias temporales, errores técnicos (bugs) o actualizaciones en la interfaz y funcionalidades del sistema.
            </p>
            <p className="text-foreground/80 mt-3">
              Agradecemos su comprensión y colaboración para perfeccionar nuestro servicio. Si identifica alguna falla o anomalía, le solicitamos amablemente notificar a nuestro equipo de soporte enviando un correo electrónico a <strong>contacto.appecogo.mx@gmail.com</strong>, indicando en el asunto <em>"Reporte de errores"</em> para poder brindar el seguimiento oportuno a su incidencia.
            </p>
          </Section>

          <Section title="7. Modificaciones al Servicio">
            <p className="text-foreground/80">
              ECOGO se reserva el derecho de modificar, suspender o discontinuar cualquier parte del servicio (excepto el acceso garantizado del Plan Pro durante su vigencia) en cualquier momento. Nos esforzamos por mantener la plataforma operativa, pero no garantizamos un servicio libre de interrupciones técnicas inherentes a la naturaleza del software.
            </p>
          </Section>

          <div
            className="rounded-2xl px-6 py-5 text-sm border-t-2 text-center"
            style={{ borderTopColor: '#CDAD75', backgroundColor: '#FFF9E4', color: '#472E18' }}
          >
            Última actualización: <strong>10 de abril de 2026</strong> &nbsp;|&nbsp; ECOGO — ecogo.mx
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-extrabold pt-2" style={{ color: '#472E18' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 pl-0 md:pl-4 border-l-2 pl-4" style={{ borderLeftColor: '#CDAD75' }}>
      <h3 className="text-base font-bold" style={{ color: '#472E18' }}>{title}</h3>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-foreground/80">
          <span
            className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#CDAD75' }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}
