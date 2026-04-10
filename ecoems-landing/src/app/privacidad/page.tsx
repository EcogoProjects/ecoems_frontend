import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'Aviso de Privacidad | ECOGO',
  description: 'Conoce cómo ECOGO recopila, usa y protege tus datos personales conforme a la LFPDPPP.',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>

        {/* Hero */}
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
              Aviso de Privacidad
            </h1>
            <p className="text-sm" style={{ color: '#EEE4C1', opacity: 0.7 }}>
              Última actualización: 10 de abril de 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-10 text-[15px] md:text-[16px] leading-relaxed">

          <p className="text-foreground/80">
            <strong>ECOGO.mx</strong> es responsable del tratamiento de sus datos personales conforme a la{' '}
            <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</em> y su Reglamento.
          </p>

          {/* Section 1 */}
          <Section title="1. Datos personales que recopilamos">
            <SubSection title="1.1 Datos de registro e identificación">
              <BulletList items={[
                'Nombre completo',
                'Correo electrónico',
                'Número de teléfono',
                'Contraseña (almacenada en forma cifrada; ECOGO nunca tiene acceso a su contraseña en texto claro)',
              ]} />
            </SubSection>
            <SubSection title="1.2 Datos de perfil (opcionales)">
              <BulletList items={[
                'Género',
                'Domicilio y ciudad de residencia',
                'Avatar seleccionado',
              ]} />
            </SubSection>
            <SubSection title="1.3 Datos académicos y de uso">
              <BulletList items={[
                'Resultados de exámenes y calificaciones obtenidas dentro de la plataforma',
                'Progreso de estudio por materia, tema y subtema',
                'Historial de sesiones y exámenes realizados',
                'Escuela objetivo seleccionada',
              ]} />
            </SubSection>
            <SubSection title="1.4 Datos de pago">
              <p className="text-foreground/80">
                Los datos de tarjeta de crédito o débito son procesados directamente por <strong>Stripe, Inc.</strong> ECOGO
                únicamente recibe y almacena el identificador de transacción generado por Stripe y el estado del pago
                (aprobado/rechazado). ECOGO <strong>nunca</strong> almacena números de tarjeta, CVV, ni datos bancarios sensibles.
              </p>
            </SubSection>
          </Section>

          {/* Section 2 */}
          <Section title="2. Finalidades del tratamiento">
            <SubSection title="2.1 Finalidades primarias (necesarias para el servicio)">
              <BulletList items={[
                'Crear y gestionar su cuenta de usuario en la plataforma ECOGO.',
                'Proveer los servicios de preparación para el ECOEMS: exámenes rápidos, de seguimiento y simulacros.',
                'Mostrar estadísticas de progreso personalizadas en el dashboard "Mi Recorrido".',
                'Procesar pagos del plan Premium mediante Stripe y activar el plan en su cuenta.',
                'Enviar comunicaciones transaccionales: confirmación de registro, cambio de correo, cambio de contraseña, confirmación de pago.',
                'Dar cumplimiento a obligaciones legales aplicables.',
              ]} />
            </SubSection>
            <SubSection title="2.2 Finalidades secundarias (opcionales, puede oponerse)">
              <BulletList items={[
                'Envío de comunicaciones promocionales sobre nuevas funciones, contenidos o convocatorias del ECOEMS.',
                'Realización de encuestas de satisfacción y estudios de uso de la plataforma.',
                'Análisis estadísticos agregados y anónimos para mejorar el servicio.',
              ]} />
              {/* <Callout>
                Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un
                correo a <strong>privacidad@ecogo.mx</strong> indicando "Oposición a finalidades secundarias". Su negativa
                no afectará el acceso al servicio.
              </Callout> */}
            </SubSection>
          </Section>

          {/* Section 3 */}
          <Section title="3. Transferencia de datos a terceros">
            <p className="text-foreground/80">
              Para la operación de la plataforma, sus datos pueden ser compartidos con terceros sub-encargados, quienes
              actúan bajo instrucciones de ECOGO y cuentan con políticas de privacidad propias. ECOGO no comercializa,
              vende, ni cede sus datos personales a terceros con fines distintos a los descritos en este Aviso.
            </p>
          </Section>

          {/* Section 4 */}
          <Section title="4. Derechos ARCO">
            <p className="text-foreground/80">
              Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> al tratamiento de sus datos
              personales (Derechos ARCO), así como a revocar su consentimiento y limitar el uso o divulgación de sus datos.
            </p>
            <SubSection title="4.1 ¿Cómo ejercer sus derechos ARCO?">
              {/* <p className="text-foreground/80 mb-4">
                Puede enviar su solicitud al correo <strong>privacidad@ecogo.mx</strong> con los siguientes elementos:
              </p> */}
              <BulletList items={[
                'Nombre completo y correo electrónico registrado en ECOGO.',
                'Descripción clara del derecho que desea ejercer y los datos a los que se refiere.',
                'Copia de su identificación oficial vigente.',
              ]} />
              <div className="mt-4 space-y-1 text-sm text-foreground/70">
                <p><strong>Plazo de respuesta:</strong> 20 días hábiles a partir de la recepción de la solicitud completa.</p>
                <p><strong>Vigencia de la resolución:</strong> 15 días hábiles para hacerla efectiva, una vez comunicada.</p>
              </div>
              <p className="mt-4 text-foreground/80 text-sm">
                La cancelación de datos no procederá cuando exista una obligación legal de conservarlos o cuando sean
                necesarios para el cumplimiento de una relación jurídica vigente.
              </p>
            </SubSection>
          </Section>

          {/* Section 5 */}
          <Section title="5. Consentimiento">
            <p className="text-foreground/80">
              Al registrarse en ECOGO y marcar la casilla de aceptación correspondiente, usted otorga su{' '}
              <strong>consentimiento expreso</strong> para el tratamiento de sus datos personales conforme a las finalidades
              primarias descritas en este Aviso.
            </p>
            <p className="text-foreground/80 mt-3">
              El tratamiento para finalidades secundarias requiere su consentimiento por separado y puede ser revocado en
              cualquier momento sin consecuencias para el acceso al servicio.
            </p>
            <Callout>
              Si usted es menor de edad: al registrarse declara contar con la autorización de su padre, madre o tutor legal
              para el tratamiento de sus datos personales conforme a este Aviso. ECOGO se reserva el derecho de solicitar
              evidencia de dicha autorización en cualquier momento.
            </Callout>
          </Section>

          {/* Section 6 */}
          <Section title="6. Seguridad de los datos">
            <p className="text-foreground/80 mb-4">
              ECOGO implementa medidas técnicas, administrativas y físicas para proteger sus datos personales contra
              pérdida, robo, acceso no autorizado, divulgación, alteración o destrucción:
            </p>
            <BulletList items={[
              'Cifrado de contraseñas mediante algoritmos seguros.',
              'Comunicación mediante HTTPS con certificado SSL en todo el sitio.',
              'Control de acceso por roles dentro del sistema.',
              'Políticas de seguridad a nivel de base de datos.',
              'Almacenamiento de datos de pago exclusivamente en los servidores certificados PCI-DSS de Stripe.',
            ]} />
          </Section>

          {/* Section 7 */}
          <Section title="7. Conservación de los datos">
            <p className="text-foreground/80">
              Sus datos personales serán conservados durante el tiempo que mantenga una cuenta activa en ECOGO y hasta por{' '}
              <strong>1 año</strong> posterior a la cancelación de su cuenta, en cumplimiento de las obligaciones legales
              aplicables.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Cambios a este Aviso de Privacidad">
            <p className="text-foreground/80">
              ECOGO se reserva el derecho de actualizar este Aviso de Privacidad en cualquier momento. Cualquier
              modificación sustancial será notificada mediante un aviso visible en la plataforma y/o por correo electrónico
              al usuario. La versión vigente siempre estará disponible en{' '}
              <strong>https://ecogo.mx/privacidad</strong>.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Autoridad competente">
            <p className="text-foreground/80">
              Si considera que sus derechos han sido vulnerados, puede presentar una queja ante el{' '}
              <strong>Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)</strong>.
            </p>
          </Section>

          {/* Footer note */}
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

/* ── Helpers ─────────────────────────────────────────── */

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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl px-6 py-5 text-sm font-medium border-l-4 mt-4"
      style={{ backgroundColor: '#FFF9E4', color: '#472E18', borderLeftColor: '#CDAD75' }}
    >
      {children}
    </div>
  )
}
