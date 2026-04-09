export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  featured?: boolean
  coverImage?: string
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'que-es-el-ecoems',
    title: '¿Qué es el ECOEMS y cómo funciona? (Guía básica para no perderte en el proceso)',
    excerpt: 'El proceso que organiza cómo los estudiantes de secundaria en México son asignados a una preparatoria pública. Explicado simple.',
    date: 'Abr 7, 2026',
    coverImage: '/blog/Blog1.png',
    author: 'ECOGO',
    category: 'ECOEMS',
    featured: true,
    content: [
      { type: 'heading', text: '¿Qué es el ECOEMS?' },
      { type: 'paragraph', text: 'El ECOEMS es el proceso que organiza cómo los estudiantes de secundaria en México son asignados a una preparatoria pública. Es básicamente el sistema que decide en qué prepa vas a estudiar. Antes existía un examen único (COMIPEMS), pero ahora el proceso cambió. Hoy todo gira alrededor de una plataforma llamada Mi Derecho Mi Lugar.' },
      {
        type: 'list', items: [
          'Tu registro',
          'Tu lista de opciones de prepa',
          'El seguimiento de tu asignación',
        ]
      },
      { type: 'heading', text: 'Explicado fácil (como si fuera un juego)' },
      { type: 'paragraph', text: 'Imagina que el ECOEMS es como una fila gigante de estudiantes. Cada quien dice: "Estas son las escuelas donde me gustaría quedar, en este orden". Entonces el sistema revisa tu primera opción, si hay lugar te quedas ahí, si no pasa a tu segunda opción, y así sucesivamente hasta encontrar una escuela donde sí puedas entrar.' },
      { type: 'callout', text: 'No todos alcanzan todas las escuelas, porque algunas tienen muchísima demanda.' },
      { type: 'heading', text: 'Traducción a la vida real' },
      { type: 'paragraph', text: 'Piensa en esto como elegir lugares en un concierto: hay zonas VIP muy demandadas, zonas generales y lugares más accesibles. Si todos quieren VIP, no todos van a entrar ahí. Y eso mismo pasa con las prepas.' },
      { type: 'heading', text: 'Errores comunes desde el inicio' },
      {
        type: 'list', items: [
          'Pensar que es solo un trámite sencillo — en realidad es una decisión estratégica',
          'No investigar cómo funciona — terminan eligiendo sin entender',
          'Confiarse en lo que dicen otros — "mi primo hizo esto" no siempre aplica',
          'Dejar todo al último momento — eso aumenta errores y estrés',
        ]
      },
      { type: 'heading', text: 'Información clave que debes saber' },
      {
        type: 'list', items: [
          'No es un proceso al azar',
          'Sí importa el orden de tus opciones',
          'Algunas escuelas son mucho más difíciles de obtener',
          'Todo se hace a través de Mi Derecho Mi Lugar',
        ]
      },
      { type: 'callout', text: 'Entender esto desde el inicio te da ventaja.' },
      { type: 'heading', text: 'Es normal no entender al principio' },
      { type: 'paragraph', text: 'Si todo esto te parece nuevo o confuso, es completamente normal. Nadie te enseña esto en la escuela. Y la información que hay afuera muchas veces está incompleta o mal explicada. No estás tarde. No estás perdido. Solo estás empezando.' },
      { type: 'heading', text: '¿Cómo te ayuda ECOGO?' },
      { type: 'paragraph', text: 'Entender el proceso es una cosa, pero tomar decisiones correctas es otra. ECOGO te ayuda a entender mejor cómo funciona la asignación, simular opciones de prepa, ver qué tan probable es quedar en cada una y tomar decisiones con más seguridad.' },
      { type: 'callout', text: 'No es adivinar… es decidir con información.' },
      { type: 'heading', text: '¿Qué es "Mi Derecho Mi Lugar"?' },
      { type: 'paragraph', text: 'Es la plataforma oficial donde ocurre todo el proceso. Ahí vas a crear tu cuenta, registrarte, elegir tus opciones y ver tus resultados. Es tu centro de control del ECOEMS. Por eso es clave saber usarla bien.' },
      { type: 'heading', text: 'Cuidado con la desinformación' },
      { type: 'paragraph', text: 'En redes hay mucha información incorrecta: "Da igual qué pongas", "Siempre hay lugar en algún lado", "No importa el orden". Esto puede hacer que tomes malas decisiones. Siempre verifica y trata de entender, no solo copiar.' },
      { type: 'heading', text: 'En resumen' },
      { type: 'paragraph', text: 'El ECOEMS no es imposible, solo es confuso cuando nadie te lo explica bien. Pero ahora ya tienes algo que muchos no: claridad desde el inicio. Y eso cambia todo.' },
      { type: 'callout', text: 'Comparte este artículo con alguien que también esté empezando este proceso. Seguro también está igual de perdido.' },
    ],
  },
  {
    slug: 'ecogo-la-app-para-estudiar',
    title: 'ECOGO: la app que te ayuda a estudiar mejor para el ECOEMS (sin perder tiempo ni sentirte perdido)',
    excerpt: 'Si no sabes por dónde empezar a estudiar, esto es para ti. El problema no es el examen — es estudiar sin estrategia.',
    date: 'Abr 7, 2026',
    coverImage: '/blog/Blog2.png',
    author: 'ECOGO',
    category: 'ECOGO',
    content: [
      { type: 'heading', text: '"Quiero estudiar… pero no sé qué estudiar"' },
      { type: 'paragraph', text: 'Este es el problema más común. No es flojera. No es falta de ganas. Es falta de claridad. Porque cuando piensas en el ECOEMS, te llegan mil dudas: ¿Qué temas vienen? ¿Por dónde empiezo? ¿Estoy estudiando lo correcto? ¿Y si pierdo el tiempo? Y entonces pasa: no estudias… o estudias sin dirección.' },
      { type: 'heading', text: 'El problema real (que casi nadie te dice)' },
      { type: 'paragraph', text: 'No es que el examen sea imposible. Es que la mayoría estudia sin estrategia. Repasan cosas al azar, ven videos sin orden, hacen ejercicios sin saber si van a venir. Y eso genera algo muy peligroso: sensación de avance… sin resultados reales.' },
      { type: 'heading', text: '¿Qué necesitas realmente para estudiar bien?' },
      { type: 'paragraph', text: 'No necesitas estudiar TODO. Necesitas saber qué temas son importantes, tener un orden claro, medir si estás entendiendo y detectar en qué estás fallando. Eso es estudiar con estrategia.' },
      { type: 'callout', text: 'Es como ir al gimnasio: puedes ir todos los días, pero si no tienes rutina no avanzas igual. No es cuánto estudias. Es cómo estudias.' },
      { type: 'heading', text: 'Errores comunes al estudiar para el ECOEMS' },
      {
        type: 'list', items: [
          'Estudiar sin un plan',
          'Cambiar de tema todos los días sin orden',
          'Solo leer y no practicar',
          'No saber en qué estás fallando',
          'Dejar todo para el final',
        ]
      },
      { type: 'heading', text: 'Info clave que debes saber' },
      {
        type: 'list', items: [
          'El examen evalúa habilidades específicas',
          'No todos los temas pesan igual',
          'Practicar es más importante que solo leer',
          'La constancia gana más que estudiar todo en un día',
        ]
      },
      { type: 'callout', text: 'Estudiar mejor es más importante que estudiar más.' },
      { type: 'heading', text: 'Todavía estás a tiempo' },
      { type: 'paragraph', text: 'Si sientes que no has empezado bien, no pasa nada. Literalmente muchísima gente está igual. Lo importante no es cómo empezaste. Es cómo decides seguir.' },
      { type: 'heading', text: '¿Qué hace ECOGO?' },
      { type: 'paragraph', text: 'ECOGO es una app que te ayuda a estudiar para el ECOEMS de forma clara, ordenada y estratégica. No es solo contenido. Es una guía.' },
      {
        type: 'list', items: [
          'Estudia por temas importantes',
          'Entiende en qué estás fallando',
          'Practica con ejercicios tipo examen',
          'Mide tu progreso',
        ]
      },
      { type: 'callout', text: 'No estudias a ciegas. Sabes qué estás haciendo y por qué.' },
      { type: 'heading', text: 'Tips para estudiar mejor' },
      {
        type: 'list', items: [
          'Estudia por bloques (no todo al mismo tiempo)',
          'Practica más de lo que lees',
          'Identifica tus errores',
          'Repite lo que no entiendes',
          'Sé constante (aunque sean 30 min)',
        ]
      },
      { type: 'heading', text: '¿Cuándo empezar a estudiar para el ECOEMS?' },
      { type: 'paragraph', text: 'Lo antes posible. Pero no desde el miedo — desde la estrategia. No necesitas estudiar 5 horas diarias. Necesitas empezar. Aunque sea poco.' },
      { type: 'heading', text: 'En resumen' },
      { type: 'paragraph', text: 'El ECOEMS no se pasa con suerte. Se pasa con preparación. Pero no cualquier preparación: preparación inteligente. ECOGO no estudia por ti. Pero te enseña a estudiar mejor. Y eso puede hacer toda la diferencia.' },
      { type: 'callout', text: 'Comparte este artículo con alguien que esté intentando estudiar. Probablemente también está perdido.' },
    ],
  },
  {
    slug: 'convocatoria-ecoems-2026',
    title: 'Convocatoria ECOEMS 2026: TODO lo que tienes que saber (sin confundirte)',
    excerpt: 'Fechas, requisitos, registro y errores que debes evitar. Te lo explicamos todo de forma simple para que no te pierdas nada.',
    date: 'Abr 7, 2026',
    coverImage: '/blog/Blog3.png',
    author: 'ECOGO',
    category: 'ECOEMS',
    content: [
      { type: 'heading', text: '"Ya salió la convocatoria… pero no entiendo nada"' },
      { type: 'paragraph', text: 'Este momento es donde todo empieza a sentirse real. Ya no es "algún día voy a elegir prepa"… ya es ahora. Y cuando abres la convocatoria, pasa esto: mucho texto, palabras complicadas, reglas que no quedan claras. Y terminas más confundido que antes. Tranquilo. Aquí te lo explico TODO de forma simple.' },
      { type: 'heading', text: '¿Qué es la convocatoria del ECOEMS?' },
      { type: 'paragraph', text: 'Es el documento oficial que explica cómo vas a entrar a la prepa. Incluye quién puede participar, cómo registrarte, qué necesitas, fechas importantes y cómo funciona la asignación. Básicamente: las reglas del juego.' },
      { type: 'heading', text: '¿Quiénes pueden participar?' },
      {
        type: 'list', items: [
          'Estudiantes que están en 3° de secundaria',
          'Personas que ya terminaron secundaria y tienen certificado',
          'No importa si egresaste hace años — mientras tengas secundaria terminada, puedes participar',
        ]
      },
      { type: 'heading', text: 'Fechas importantes (esto sí o sí guárdalo)' },
      {
        type: 'list', items: [
          'Publicación de convocatoria: Febrero 2026',
          'Registro: 17 de marzo al 14 de abril',
          'Examen (UNAM/IPN): 20, 21, 27 y 28 de junio',
          'Resultados: 18 de agosto',
        ]
      },
      { type: 'callout', text: 'Si te pierdes estas fechas… se complica TODO. Ponlas en tu calendario ahora mismo.' },
      { type: 'heading', text: '¿Cómo funciona el proceso?' },
      { type: 'paragraph', text: 'Todo pasa en una sola plataforma: Mi Derecho Mi Lugar. Ahí haces tu registro, subes documentos, eliges tus opciones de prepa y ves resultados. Es tu centro de control de todo el proceso.' },
      { type: 'paragraph', text: 'Es como si llenaras una solicitud donde dices: "Estas son las escuelas donde quiero quedar, en este orden". Y el sistema intenta darte la mejor opción posible según lo que elegiste y la disponibilidad.' },
      { type: 'heading', text: 'Hay 3 formas de entrar' },
      {
        type: 'list', items: [
          '1. Opciones sin examen — Acceso directo, depende del orden de tus opciones',
          '2. Opciones con examen — Solo para escuelas como UNAM e IPN, dependes de tu resultado',
          '3. Modalidad mixta — Combinas ambas, puedes tener más oportunidades',
        ]
      },
      { type: 'callout', text: 'Esto es nuevo vs COMIPEMS. Ahora tienes más control en tus decisiones.' },
      { type: 'heading', text: 'Errores comunes' },
      {
        type: 'list', items: [
          'No registrarte a tiempo',
          'Subir mal tus documentos',
          'Elegir opciones sin entender el orden',
          'Pensar que todo depende del examen',
          'No revisar la convocatoria completa',
        ]
      },
      { type: 'heading', text: 'Requisitos básicos' },
      {
        type: 'list', items: [
          'CURP',
          'Acta de nacimiento',
          'Certificado o constancia de secundaria',
          'Correo electrónico',
          'Cuenta en Llave MX',
        ]
      },
      { type: 'heading', text: '¿Dónde entra ECOGO?' },
      { type: 'paragraph', text: 'La convocatoria te dice QUÉ hacer, pero no te dice CÓMO hacerlo bien. Ahí entra ECOGO. ECOGO te ayuda a entender qué estudiar, practicar tipo examen, no perder tiempo en temas innecesarios y llegar preparado (especialmente para UNAM/IPN).' },
      { type: 'callout', text: 'La convocatoria te abre la puerta. ECOGO te ayuda a pasar.' },
      { type: 'heading', text: 'Tips que te pueden salvar el proceso' },
      {
        type: 'list', items: [
          'Lee la convocatoria (aunque sea resumida)',
          'No dejes el registro al último día',
          'Ten listos tus documentos',
          'Piensa bien tus opciones',
          'Empieza a estudiar desde ya',
        ]
      },
      { type: 'heading', text: 'Cuidado con la desinformación' },
      { type: 'paragraph', text: 'Hay muchísima desinformación en redes: "No importa el orden", "Siempre hay lugar donde tú quieras", "No pasa nada si te equivocas". Falso. La convocatoria es la única fuente confiable.' },
      { type: 'heading', text: 'En resumen' },
      { type: 'paragraph', text: 'La convocatoria no está hecha para asustarte. Está hecha para darte reglas. Pero si nadie te las explica bien… se siente imposible. Hoy ya tienes algo que muchos no: entender el proceso completo. Y eso te pone adelante.' },
      { type: 'callout', text: 'Si este artículo te ayudó, compártelo con alguien que esté entrando a este proceso. Seguro también está confundido.' },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map(p => p.slug)
}
