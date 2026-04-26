export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "button"; label: string; href: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  featured?: boolean;
  coverImage?: string;
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "llave-mx-ecoems-2026-como-crear",
    title: "Llave MX 2026: el primer paso obligatorio para entrar a la prepa",
    excerpt:
      "Qué es la Llave MX, cómo crearla correctamente y los errores que pueden complicar tu registro ECOEMS 2026.",
    date: "Abr 17, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: true,
    coverImage: "/blog/Blog4.jpg",
    content: [
      {
        type: "paragraph",
        text: "Antes de pensar en la UNAM, el IPN o cualquier otra preparatoria, hay un paso que debes completar primero: crear tu Llave MX. Sin esto no puedes iniciar tu registro en el proceso ECOEMS 2026.",
      },
      {
        type: "paragraph",
        text: "Aunque parece un trámite sencillo, es el inicio de todo. Cada año hay estudiantes que se retrasan o cometen errores en este punto por no prestar atención o dejarlo al final. Sin Llave MX no hay acceso al sistema y sin acceso no hay registro.",
      },
      {
        type: "heading",
        text: "Qué es la Llave MX y por qué es tan importante",
      },
      {
        type: "paragraph",
        text: "La Llave MX es tu identidad digital dentro de los sistemas del gobierno. Funciona como tu usuario oficial para realizar trámites en línea.",
      },
      {
        type: "paragraph",
        text: "En el proceso “Mi Derecho, Mi Lugar”, es la puerta de entrada al registro. Todo depende de que tengas tu cuenta creada correctamente desde el inicio.",
      },
      {
        type: "heading",
        text: "Lo que necesitas antes de empezar",
      },
      {
        type: "paragraph",
        text: "Antes de crear tu cuenta, asegúrate de tener listos los siguientes datos:",
      },
      {
        type: "list",
        items: [
          "CURP actualizada",
          "Correo electrónico activo",
          "Número telefónico",
        ],
      },
      {
        type: "paragraph",
        text: "Todos los datos deben ser del aspirante. Usar información de otra persona es un error común que puede generar problemas más adelante.",
      },
      {
        type: "heading",
        text: "Cómo crear tu Llave MX paso a paso",
      },
      {
        type: "paragraph",
        text: "Debes ingresar únicamente al sitio oficial del gobierno. Evita enlaces desconocidos o páginas externas.",
      },
      {
        type: "button",
        label: "Ir al sitio oficial: llave.gob.mx →",
        href: "https://www.llave.gob.mx/",
      },
      {
        type: "paragraph",
        text: "Dentro del sitio, captura los datos del aspirante, valida la información y confirma tu correo electrónico y número telefónico.",
      },
      {
        type: "paragraph",
        text: "Después deberás crear una contraseña. Es importante que sea segura y que no la olvides, ya que la utilizarás durante todo el proceso, incluso para consultar tus resultados.",
      },
      {
        type: "heading",
        text: "Errores que debes evitar",
      },
      {
        type: "list",
        items: [
          "Escribir mal la CURP",
          "Usar un correo que no revisas",
          "Registrar datos de otra persona",
          "Dejar el trámite para el último momento",
        ],
      },
      {
        type: "paragraph",
        text: "Este trámite es completamente gratuito. Si alguien intenta cobrarte por hacerlo, no es necesario y debes evitarlo.",
      },
      {
        type: "heading",
        text: "Consejo importante",
      },
      {
        type: "paragraph",
        text: "Crea tu Llave MX lo antes posible. Cuando el registro comienza, muchas personas intentan hacerlo al mismo tiempo, lo que puede generar saturación o errores por la prisa.",
      },
      {
        type: "heading",
        text: "Aquí es donde entra ECOGO (Guía ECOEMS)",
      },
      {
        type: "paragraph",
        text: "Sabemos que este tipo de pasos generan dudas, por eso estamos creando ECOGO, una app diseñada para acompañarte durante todo el proceso.",
      },
      {
        type: "list",
        items: [
          "Guía paso a paso desde la creación de Llave MX",
          "Indicaciones claras en cada etapa",
          "Prevención de errores comunes",
          "Preparación para el examen UNAM/IPN",
        ],
      },
      {
        type: "paragraph",
        text: "La Llave MX no es solo un trámite, es el acceso a todo tu proceso. Hacerlo bien desde el inicio puede evitarte muchos problemas después.",
      },
      {
        type: "paragraph",
        text: "No lo dejes para después. Hazlo con tiempo, hazlo bien y continúa avanzando.",
      },
    ],
  },
  {
    slug: "modalidades-ecoems-2026-como-elegir",
    title:
      "Modalidades ECOEMS 2026: la decisión que puede definir en qué prepa te quedas",
    excerpt:
      "Entiende las 3 modalidades del ECOEMS 2026 y elige la mejor estrategia para asegurar tu lugar.",
    date: "Abr 17, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    coverImage: "/blog/Blog5.webp",
    content: [
      {
        type: "paragraph",
        text: "Si ya revisaste la convocatoria o estás a punto de registrarte, hay una decisión que probablemente no estás dimensionando lo suficiente: la modalidad que eliges. Aunque parece solo otro paso del registro, en realidad es de lo más importante del proceso, porque define cómo vas a participar, qué oportunidades tienes y qué tan protegido estás si las cosas no salen como esperabas.",
      },
      {
        type: "paragraph",
        text: "No se trata de elegir rápido y seguir avanzando, sino de entender bien qué implica cada opción. Una mala decisión aquí puede dejarte sin las opciones que querías o complicar tu resultado final. Cada año muchos estudiantes se equivocan no por falta de capacidad, sino por no entender esto desde el inicio.",
      },
      {
        type: "heading",
        text: "Primero lo básico: tienes 3 formas de participar",
      },
      {
        type: "paragraph",
        text: "Dentro del sistema “Mi Derecho, Mi Lugar” existen tres modalidades, y cada una funciona de forma distinta.",
      },
      {
        type: "heading",
        text: "Modalidad 1: Sin examen",
      },
      {
        type: "paragraph",
        text: "Esta opción es para quienes buscan ingresar directamente a escuelas que garantizan un lugar dependiendo de la disponibilidad, como bachilleratos, CONALEP o IEMS. No necesitas presentar examen.",
      },
      {
        type: "paragraph",
        text: "Debes elegir entre 5 y 10 opciones, y el sistema te asigna según el orden que pongas y los espacios disponibles. Es una modalidad más segura, pero requiere elegir bien tus opciones, ya que dependes completamente de esa lista.",
      },
      {
        type: "heading",
        text: "Modalidad 2: Con examen (UNAM o IPN)",
      },
      {
        type: "paragraph",
        text: "Esta modalidad es para quienes buscan ingresar a la UNAM o al IPN. Necesitas un promedio mínimo de 7.0 y presentar un examen en línea de 128 preguntas.",
      },
      {
        type: "paragraph",
        text: "Puedes elegir hasta 10 opciones entre ambas instituciones. Sin embargo, si no alcanzas el puntaje necesario, no hay un respaldo automático dentro de esta modalidad, lo que significa que podrías quedarte sin lugar en esta fase.",
      },
      {
        type: "heading",
        text: "Modalidad 3: Mixta",
      },
      {
        type: "paragraph",
        text: "Esta es la opción más estratégica porque combina las dos anteriores. Haces una lista de opciones con examen (UNAM/IPN) y otra sin examen, lo que funciona como una red de seguridad.",
      },
      {
        type: "paragraph",
        text: "Si no logras el puntaje necesario, el sistema puede asignarte en alguna de tus opciones sin examen. Además, es la única modalidad donde puedes registrar hasta 20 opciones en total, lo que te da mayor margen de decisión.",
      },
      {
        type: "heading",
        text: "La realidad que muchos no consideran",
      },
      {
        type: "paragraph",
        text: "Muchos estudiantes eligen la Modalidad 2 solo porque quieren UNAM o IPN, sin pensar en qué pasa si no lo logran. No está mal intentarlo, pero hacerlo sin estrategia puede dejarte sin alternativas.",
      },
      {
        type: "paragraph",
        text: "Aquí es importante ser honesto contigo mismo: decidir si quieres arriesgar todo por una sola opción o tener un plan más equilibrado que te mantenga dentro del proceso pase lo que pase.",
      },
      {
        type: "heading",
        text: "Tips que pueden cambiar tu resultado",
      },
      {
        type: "list",
        items: [
          "El orden de tus opciones sí importa, el sistema asigna según prioridad.",
          "Evita elegir opciones si no cumples los requisitos.",
          "Piensa siempre en un plan B.",
          "Descarga tu comprobante en PDF al terminar el registro.",
        ],
      },
      {
        type: "heading",
        text: "Aquí es donde entra ECOGO (Guía ECOEMS)",
      },
      {
        type: "paragraph",
        text: "Sabemos que este proceso puede ser confuso y que nadie te explica claramente cómo tomar estas decisiones. Por eso estamos creando ECOGO, una app diseñada para ayudarte desde el inicio.",
      },
      {
        type: "list",
        items: [
          "Explicación clara de cada modalidad",
          "Apoyo para elegir opciones estratégicamente",
          "Guía paso a paso durante el proceso",
          "Preparación para el examen UNAM/IPN",
        ],
      },
      {
        type: "paragraph",
        text: "Elegir modalidad no es un trámite, es una estrategia. Los que entienden cómo funciona el proceso son quienes terminan más cerca de la escuela que quieren.",
      },
      {
        type: "paragraph",
        text: "Antes de tomar una decisión, analiza bien tus opciones y elige con claridad.",
      },
    ],
  },
  {
    slug: "convocatoria-ecoems-2026-fechas-pasos-unam-ipn",
    title:
      "Convocatoria ECOEMS 2026: fechas, pasos y lo que debes entender si quieres entrar a la UNAM o IPN",
    excerpt:
      "Fechas clave, modalidades y errores que debes evitar en el proceso ECOEMS 2026.",
    date: "Abr 17, 2026",
    coverImage: "/blog/Blog6.jpeg",
    author: "ECOGO",
    category: "ECOEMS",
    content: [
      {
        type: "paragraph",
        text: "Si estás en 3° de secundaria (o eres mamá, papá o profesor acompañando este proceso), este momento es clave, porque ya salió la convocatoria oficial del proceso ECOEMS 2026. Con ella inicia todo lo que va a definir en qué preparatoria vas a estudiar.",
      },
      {
        type: "paragraph",
        text: "Aunque por fuera parece solo un trámite más, la realidad es que aquí comienzan decisiones importantes que pueden acercarte o alejarte de la escuela que realmente quieres.",
      },
      {
        type: "paragraph",
        text: "Lo primero que debes entender es que este sistema garantiza un lugar para todos los aspirantes, pero eso no significa que será en la escuela que tú esperas. Por eso es clave entender bien el proceso desde el inicio y no hacerlo sin atención.",
      },
      {
        type: "heading",
        text: "Las fechas ECOEMS 2026 que no se te pueden pasar",
      },
      {
        type: "paragraph",
        text: "El proceso comenzó con la publicación de la convocatoria el 13 de febrero de 2026 y a partir de ahí se divide en varias etapas importantes.",
      },
      {
        type: "list",
        items: [
          "Registro: del 17 de marzo al 14 de abril de 2026",
          "Proceso para examen (UNAM/IPN): del 18 al 22 de mayo",
          "Examen: en línea, con 128 preguntas",
          "Resultados finales: 18 de agosto de 2026",
        ],
      },
      {
        type: "paragraph",
        text: "Aunque parece sencillo, muchos fallan porque creen que con registrarse ya terminaron, cuando cada etapa tiene requisitos y pasos que deben cumplirse correctamente.",
      },
      {
        type: "heading",
        text: "Las 3 decisiones más importantes que vas a tomar",
      },
      {
        type: "paragraph",
        text: "Durante tu registro no solo llenas datos, también defines tu camino. Tendrás que elegir una modalidad:",
      },
      {
        type: "list",
        items: [
          "Modalidad 1: Solo escuelas sin examen (acceso directo)",
          "Modalidad 2: Solo UNAM o IPN (con examen)",
          "Modalidad 3: Mixta (con examen y opciones sin examen como respaldo)",
        ],
      },
      {
        type: "paragraph",
        text: "El orden en el que pongas tus opciones sí importa, ya que el sistema te asigna con base en esa prioridad. No es aleatorio.",
      },
      {
        type: "heading",
        text: "El error que más se repite cada año",
      },
      {
        type: "paragraph",
        text: "Uno de los errores más comunes es pensar que todavía hay tiempo o dejar el proceso para después.",
      },
      {
        type: "paragraph",
        text: "Muchos estudiantes con potencial terminan complicando su ingreso por no seguir bien el proceso, no revisar correos o no entender qué sigue después del registro.",
      },
      {
        type: "paragraph",
        text: "No es falta de capacidad, es falta de información y guía.",
      },
      {
        type: "heading",
        text: "Aquí es donde entra ECOGO (Guía ECOEMS)",
      },
      {
        type: "paragraph",
        text: "Sabemos que el proceso puede ser confuso y que hay demasiada información. Por eso estamos creando ECOGO, una app pensada para ayudarte en cada paso.",
      },
      {
        type: "list",
        items: [
          "Entender el proceso paso a paso",
          "Saber qué hacer en cada etapa",
          "Recibir recordatorios de fechas importantes",
          "Prepararte mejor para el examen UNAM/IPN",
        ],
      },
      {
        type: "paragraph",
        text: "La idea es que no tengas que adivinar qué hacer, sino que tengas claridad desde el inicio.",
      },
      {
        type: "paragraph",
        text: "Este proceso apenas comienza, pero lo que hagas desde hoy tiene un impacto real. Puedes dejarlo pasar o puedes entender cómo funciona y usarlo a tu favor.",
      },
      {
        type: "paragraph",
        text: "Porque al final, no se trata solo de tener un lugar, sino de entrar a la escuela que realmente quieres.",
      },
    ],
  },
  {
    slug: "que-es-el-ecoems",
    title:
      "¿Qué es el ECOEMS y cómo funciona? (Guía básica para no perderte en el proceso)",
    excerpt:
      "El proceso que organiza cómo los estudiantes de secundaria en México son asignados a una preparatoria pública. Explicado simple.",
    date: "Abr 7, 2026",
    coverImage: "/blog/Blog1.png",
    author: "ECOGO",
    category: "ECOEMS",
    content: [
      { type: "heading", text: "¿Qué es el ECOEMS?" },
      {
        type: "paragraph",
        text: "El ECOEMS es el proceso que organiza cómo los estudiantes de secundaria en México son asignados a una preparatoria pública. Es básicamente el sistema que decide en qué prepa vas a estudiar. Antes existía un examen único (COMIPEMS), pero ahora el proceso cambió. Hoy todo gira alrededor de una plataforma llamada Mi Derecho Mi Lugar.",
      },
      {
        type: "list",
        items: [
          "Tu registro",
          "Tu lista de opciones de prepa",
          "El seguimiento de tu asignación",
        ],
      },
      { type: "heading", text: "Explicado fácil (como si fuera un juego)" },
      {
        type: "paragraph",
        text: 'Imagina que el ECOEMS es como una fila gigante de estudiantes. Cada quien dice: "Estas son las escuelas donde me gustaría quedar, en este orden". Entonces el sistema revisa tu primera opción, si hay lugar te quedas ahí, si no pasa a tu segunda opción, y así sucesivamente hasta encontrar una escuela donde sí puedas entrar.',
      },
      {
        type: "callout",
        text: "No todos alcanzan todas las escuelas, porque algunas tienen muchísima demanda.",
      },
      { type: "heading", text: "Traducción a la vida real" },
      {
        type: "paragraph",
        text: "Piensa en esto como elegir lugares en un concierto: hay zonas VIP muy demandadas, zonas generales y lugares más accesibles. Si todos quieren VIP, no todos van a entrar ahí. Y eso mismo pasa con las prepas.",
      },
      { type: "heading", text: "Errores comunes desde el inicio" },
      {
        type: "list",
        items: [
          "Pensar que es solo un trámite sencillo — en realidad es una decisión estratégica",
          "No investigar cómo funciona — terminan eligiendo sin entender",
          'Confiarse en lo que dicen otros — "mi primo hizo esto" no siempre aplica',
          "Dejar todo al último momento — eso aumenta errores y estrés",
        ],
      },
      { type: "heading", text: "Información clave que debes saber" },
      {
        type: "list",
        items: [
          "No es un proceso al azar",
          "Sí importa el orden de tus opciones",
          "Algunas escuelas son mucho más difíciles de obtener",
          "Todo se hace a través de Mi Derecho Mi Lugar",
        ],
      },
      { type: "callout", text: "Entender esto desde el inicio te da ventaja." },
      { type: "heading", text: "Es normal no entender al principio" },
      {
        type: "paragraph",
        text: "Si todo esto te parece nuevo o confuso, es completamente normal. Nadie te enseña esto en la escuela. Y la información que hay afuera muchas veces está incompleta o mal explicada. No estás tarde. No estás perdido. Solo estás empezando.",
      },
      { type: "heading", text: "¿Cómo te ayuda ECOGO?" },
      {
        type: "paragraph",
        text: "Entender el proceso es una cosa, pero tomar decisiones correctas es otra. ECOGO te ayuda a entender mejor cómo funciona la asignación, simular opciones de prepa, ver qué tan probable es quedar en cada una y tomar decisiones con más seguridad.",
      },
      { type: "callout", text: "No es adivinar… es decidir con información." },
      { type: "heading", text: '¿Qué es "Mi Derecho Mi Lugar"?' },
      {
        type: "paragraph",
        text: "Es la plataforma oficial donde ocurre todo el proceso. Ahí vas a crear tu cuenta, registrarte, elegir tus opciones y ver tus resultados. Es tu centro de control del ECOEMS. Por eso es clave saber usarla bien.",
      },
      { type: "heading", text: "Cuidado con la desinformación" },
      {
        type: "paragraph",
        text: 'En redes hay mucha información incorrecta: "Da igual qué pongas", "Siempre hay lugar en algún lado", "No importa el orden". Esto puede hacer que tomes malas decisiones. Siempre verifica y trata de entender, no solo copiar.',
      },
      { type: "heading", text: "En resumen" },
      {
        type: "paragraph",
        text: "El ECOEMS no es imposible, solo es confuso cuando nadie te lo explica bien. Pero ahora ya tienes algo que muchos no: claridad desde el inicio. Y eso cambia todo.",
      },
      {
        type: "callout",
        text: "Comparte este artículo con alguien que también esté empezando este proceso. Seguro también está igual de perdido.",
      },
    ],
  },
  {
    slug: "ecogo-la-app-para-estudiar",
    title:
      "ECOGO: la app que te ayuda a estudiar mejor para el ECOEMS (sin perder tiempo ni sentirte perdido)",
    excerpt:
      "Si no sabes por dónde empezar a estudiar, esto es para ti. El problema no es el examen — es estudiar sin estrategia.",
    date: "Abr 7, 2026",
    coverImage: "/blog/Blog2.png",
    author: "ECOGO",
    category: "ECOGO",
    content: [
      { type: "heading", text: '"Quiero estudiar… pero no sé qué estudiar"' },
      {
        type: "paragraph",
        text: "Este es el problema más común. No es flojera. No es falta de ganas. Es falta de claridad. Porque cuando piensas en el ECOEMS, te llegan mil dudas: ¿Qué temas vienen? ¿Por dónde empiezo? ¿Estoy estudiando lo correcto? ¿Y si pierdo el tiempo? Y entonces pasa: no estudias… o estudias sin dirección.",
      },
      { type: "heading", text: "El problema real (que casi nadie te dice)" },
      {
        type: "paragraph",
        text: "No es que el examen sea imposible. Es que la mayoría estudia sin estrategia. Repasan cosas al azar, ven videos sin orden, hacen ejercicios sin saber si van a venir. Y eso genera algo muy peligroso: sensación de avance… sin resultados reales.",
      },
      { type: "heading", text: "¿Qué necesitas realmente para estudiar bien?" },
      {
        type: "paragraph",
        text: "No necesitas estudiar TODO. Necesitas saber qué temas son importantes, tener un orden claro, medir si estás entendiendo y detectar en qué estás fallando. Eso es estudiar con estrategia.",
      },
      {
        type: "callout",
        text: "Es como ir al gimnasio: puedes ir todos los días, pero si no tienes rutina no avanzas igual. No es cuánto estudias. Es cómo estudias.",
      },
      { type: "heading", text: "Errores comunes al estudiar para el ECOEMS" },
      {
        type: "list",
        items: [
          "Estudiar sin un plan",
          "Cambiar de tema todos los días sin orden",
          "Solo leer y no practicar",
          "No saber en qué estás fallando",
          "Dejar todo para el final",
        ],
      },
      { type: "heading", text: "Info clave que debes saber" },
      {
        type: "list",
        items: [
          "El examen evalúa habilidades específicas",
          "No todos los temas pesan igual",
          "Practicar es más importante que solo leer",
          "La constancia gana más que estudiar todo en un día",
        ],
      },
      {
        type: "callout",
        text: "Estudiar mejor es más importante que estudiar más.",
      },
      { type: "heading", text: "Todavía estás a tiempo" },
      {
        type: "paragraph",
        text: "Si sientes que no has empezado bien, no pasa nada. Literalmente muchísima gente está igual. Lo importante no es cómo empezaste. Es cómo decides seguir.",
      },
      { type: "heading", text: "¿Qué hace ECOGO?" },
      {
        type: "paragraph",
        text: "ECOGO es una app que te ayuda a estudiar para el ECOEMS de forma clara, ordenada y estratégica. No es solo contenido. Es una guía.",
      },
      {
        type: "list",
        items: [
          "Estudia por temas importantes",
          "Entiende en qué estás fallando",
          "Practica con ejercicios tipo examen",
          "Mide tu progreso",
        ],
      },
      {
        type: "callout",
        text: "No estudias a ciegas. Sabes qué estás haciendo y por qué.",
      },
      { type: "heading", text: "Tips para estudiar mejor" },
      {
        type: "list",
        items: [
          "Estudia por bloques (no todo al mismo tiempo)",
          "Practica más de lo que lees",
          "Identifica tus errores",
          "Repite lo que no entiendes",
          "Sé constante (aunque sean 30 min)",
        ],
      },
      { type: "heading", text: "¿Cuándo empezar a estudiar para el ECOEMS?" },
      {
        type: "paragraph",
        text: "Lo antes posible. Pero no desde el miedo — desde la estrategia. No necesitas estudiar 5 horas diarias. Necesitas empezar. Aunque sea poco.",
      },
      { type: "heading", text: "En resumen" },
      {
        type: "paragraph",
        text: "El ECOEMS no se pasa con suerte. Se pasa con preparación. Pero no cualquier preparación: preparación inteligente. ECOGO no estudia por ti. Pero te enseña a estudiar mejor. Y eso puede hacer toda la diferencia.",
      },
      {
        type: "callout",
        text: "Comparte este artículo con alguien que esté intentando estudiar. Probablemente también está perdido.",
      },
    ],
  },
  {
    slug: "convocatoria-ecoems-2026",
    title:
      "Convocatoria ECOEMS 2026: TODO lo que tienes que saber (sin confundirte)",
    excerpt:
      "Fechas, requisitos, registro y errores que debes evitar. Te lo explicamos todo de forma simple para que no te pierdas nada.",
    date: "Abr 7, 2026",
    coverImage: "/blog/Blog3.png",
    author: "ECOGO",
    category: "ECOEMS",
    content: [
      {
        type: "heading",
        text: '"Ya salió la convocatoria… pero no entiendo nada"',
      },
      {
        type: "paragraph",
        text: 'Este momento es donde todo empieza a sentirse real. Ya no es "algún día voy a elegir prepa"… ya es ahora. Y cuando abres la convocatoria, pasa esto: mucho texto, palabras complicadas, reglas que no quedan claras. Y terminas más confundido que antes. Tranquilo. Aquí te lo explico TODO de forma simple.',
      },
      { type: "heading", text: "¿Qué es la convocatoria del ECOEMS?" },
      {
        type: "paragraph",
        text: "Es el documento oficial que explica cómo vas a entrar a la prepa. Incluye quién puede participar, cómo registrarte, qué necesitas, fechas importantes y cómo funciona la asignación. Básicamente: las reglas del juego.",
      },
      { type: "heading", text: "¿Quiénes pueden participar?" },
      {
        type: "list",
        items: [
          "Estudiantes que están en 3° de secundaria",
          "Personas que ya terminaron secundaria y tienen certificado",
          "No importa si egresaste hace años — mientras tengas secundaria terminada, puedes participar",
        ],
      },
      { type: "heading", text: "Fechas importantes (esto sí o sí guárdalo)" },
      {
        type: "list",
        items: [
          "Publicación de convocatoria: Febrero 2026",
          "Registro: 17 de marzo al 14 de abril",
          "Examen (UNAM/IPN): 20, 21, 27 y 28 de junio",
          "Resultados: 18 de agosto",
        ],
      },
      {
        type: "callout",
        text: "Si te pierdes estas fechas… se complica TODO. Ponlas en tu calendario ahora mismo.",
      },
      { type: "heading", text: "¿Cómo funciona el proceso?" },
      {
        type: "paragraph",
        text: "Todo pasa en una sola plataforma: Mi Derecho Mi Lugar. Ahí haces tu registro, subes documentos, eliges tus opciones de prepa y ves resultados. Es tu centro de control de todo el proceso.",
      },
      {
        type: "paragraph",
        text: 'Es como si llenaras una solicitud donde dices: "Estas son las escuelas donde quiero quedar, en este orden". Y el sistema intenta darte la mejor opción posible según lo que elegiste y la disponibilidad.',
      },
      { type: "heading", text: "Hay 3 formas de entrar" },
      {
        type: "list",
        items: [
          "1. Opciones sin examen — Acceso directo, depende del orden de tus opciones",
          "2. Opciones con examen — Solo para escuelas como UNAM e IPN, dependes de tu resultado",
          "3. Modalidad mixta — Combinas ambas, puedes tener más oportunidades",
        ],
      },
      {
        type: "callout",
        text: "Esto es nuevo vs COMIPEMS. Ahora tienes más control en tus decisiones.",
      },
      { type: "heading", text: "Errores comunes" },
      {
        type: "list",
        items: [
          "No registrarte a tiempo",
          "Subir mal tus documentos",
          "Elegir opciones sin entender el orden",
          "Pensar que todo depende del examen",
          "No revisar la convocatoria completa",
        ],
      },
      { type: "heading", text: "Requisitos básicos" },
      {
        type: "list",
        items: [
          "CURP",
          "Acta de nacimiento",
          "Certificado o constancia de secundaria",
          "Correo electrónico",
          "Cuenta en Llave MX",
        ],
      },
      { type: "heading", text: "¿Dónde entra ECOGO?" },
      {
        type: "paragraph",
        text: "La convocatoria te dice QUÉ hacer, pero no te dice CÓMO hacerlo bien. Ahí entra ECOGO. ECOGO te ayuda a entender qué estudiar, practicar tipo examen, no perder tiempo en temas innecesarios y llegar preparado (especialmente para UNAM/IPN).",
      },
      {
        type: "callout",
        text: "La convocatoria te abre la puerta. ECOGO te ayuda a pasar.",
      },
      { type: "heading", text: "Tips que te pueden salvar el proceso" },
      {
        type: "list",
        items: [
          "Lee la convocatoria (aunque sea resumida)",
          "No dejes el registro al último día",
          "Ten listos tus documentos",
          "Piensa bien tus opciones",
          "Empieza a estudiar desde ya",
        ],
      },
      { type: "heading", text: "Cuidado con la desinformación" },
      {
        type: "paragraph",
        text: 'Hay muchísima desinformación en redes: "No importa el orden", "Siempre hay lugar donde tú quieras", "No pasa nada si te equivocas". Falso. La convocatoria es la única fuente confiable.',
      },
      { type: "heading", text: "En resumen" },
      {
        type: "paragraph",
        text: "La convocatoria no está hecha para asustarte. Está hecha para darte reglas. Pero si nadie te las explica bien… se siente imposible. Hoy ya tienes algo que muchos no: entender el proceso completo. Y eso te pone adelante.",
      },
      {
        type: "callout",
        text: "Si este artículo te ayudó, compártelo con alguien que esté entrando a este proceso. Seguro también está confundido.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
