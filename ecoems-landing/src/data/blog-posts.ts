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
    slug: "modalidad-3-ecoems-2026-mixta",
    title:
      "Modalidad 3 ECOEMS 2026: la estrategia inteligente para entrar a la prepa",
    excerpt:
      "Descubre cómo funciona la Modalidad 3 del ECOEMS 2026 y por qué es la opción más estratégica para asegurar tu lugar.",
    date: "Abr 28, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: true,
    coverImage: "/blog/Blog11.png",
    content: [
      {
        type: "paragraph",
        text: "Si quieres tomar decisiones inteligentes en el proceso ECOEMS, es importante conocer la Modalidad 3. Esta opción permite combinar aspiración y seguridad en un solo registro.",
      },
      {
        type: "paragraph",
        text: "Muchos estudiantes buscan entrar a la UNAM o al IPN, pero no consideran qué sucede si no alcanzan el puntaje necesario. La Modalidad 3 resuelve este problema al ofrecer una alternativa de respaldo.",
      },

      {
        type: "heading",
        text: "Qué es la Modalidad 3",
      },
      {
        type: "paragraph",
        text: "La Modalidad 3, también llamada modalidad mixta, permite combinar escuelas con examen y sin examen dentro de un mismo registro.",
      },
      {
        type: "paragraph",
        text: "Esto significa que puedes aspirar a la UNAM o al IPN y, al mismo tiempo, incluir opciones que no requieren examen como respaldo.",
      },

      {
        type: "heading",
        text: "Cuántas opciones puedes elegir",
      },
      {
        type: "paragraph",
        text: "Esta modalidad ofrece la mayor flexibilidad dentro del proceso.",
      },
      {
        type: "list",
        items: [
          "Entre 5 y 10 opciones sin examen",
          "Hasta 5 opciones de la UNAM",
          "Hasta 5 opciones del IPN",
        ],
      },
      {
        type: "paragraph",
        text: "En total, puedes registrar hasta 20 opciones, lo que aumenta significativamente tus posibilidades de obtener un lugar.",
      },

      {
        type: "heading",
        text: "Cómo funciona la asignación",
      },
      {
        type: "paragraph",
        text: "El sistema primero evalúa tu resultado en el examen.",
      },
      {
        type: "paragraph",
        text: "Si alcanzas el puntaje necesario, puedes ser asignado a una de tus opciones con examen.",
      },
      {
        type: "paragraph",
        text: "Si no alcanzas el puntaje, el sistema revisa automáticamente tus opciones sin examen y te asigna en función de la disponibilidad.",
      },

      {
        type: "heading",
        text: "Requisitos importantes",
      },
      {
        type: "paragraph",
        text: "Para incluir opciones de UNAM o IPN, necesitas cumplir con un promedio mínimo de 7.0 en secundaria.",
      },
      {
        type: "paragraph",
        text: "Además, deberás pagar el examen, con un costo aproximado de $450 pesos.",
      },

      {
        type: "heading",
        text: "Fechas clave",
      },
      {
        type: "list",
        items: ["Registro: del 17 de marzo al 17 de abril de 2026"],
      },
      {
        type: "paragraph",
        text: "Antes de iniciar, debes contar con tu Llave MX, ya que es obligatoria para el registro.",
      },

      {
        type: "heading",
        text: "Por qué es una estrategia inteligente",
      },
      {
        type: "paragraph",
        text: "La Modalidad 3 combina lo mejor de las otras modalidades.",
      },
      {
        type: "list",
        items: [
          "Permite aspirar a escuelas con examen",
          "Incluye opciones sin examen como respaldo",
          "Reduce el riesgo de quedarse sin lugar",
          "Aumenta tus probabilidades de asignación",
        ],
      },

      {
        type: "heading",
        text: "Cómo te puede ayudar ECOGO",
      },
      {
        type: "paragraph",
        text: "ECOGO es una app diseñada para ayudarte a tomar decisiones estratégicas durante todo el proceso.",
      },
      {
        type: "list",
        items: [
          "Selección de modalidad adecuada",
          "Guía paso a paso en el registro",
          "Apoyo para organizar tus opciones",
          "Preparación para el examen UNAM/IPN",
        ],
      },

      {
        type: "paragraph",
        text: "Elegir modalidad no se trata de facilidad o dificultad, sino de estrategia.",
      },
      {
        type: "paragraph",
        text: "La Modalidad 3 permite aspirar a mejores opciones sin perder seguridad dentro del proceso.",
      },
    ],
  },
  {
    slug: "modalidad-2-ecoems-2026-unam-ipn",
    title:
      "Modalidad 2 ECOEMS 2026: el camino directo a UNAM o IPN (y sus riesgos)",
    excerpt:
      "Descubre cómo funciona la Modalidad 2 del ECOEMS 2026, sus requisitos y los riesgos de elegir solo escuelas con examen.",
    date: "Abr 17, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: false,
    coverImage: "/blog/Blog10.png",
    content: [
      {
        type: "paragraph",
        text: "Si tienes como objetivo entrar a la UNAM o al IPN, es probable que estés considerando la Modalidad 2. Sin embargo, antes de elegirla, es importante entender que es la opción más directa, pero también la más riesgosa.",
      },
      {
        type: "paragraph",
        text: "En esta modalidad no hay respaldo automático. Todo depende de tu resultado en el examen.",
      },

      {
        type: "heading",
        text: "Qué incluye la Modalidad 2",
      },
      {
        type: "paragraph",
        text: "La Modalidad 2 está diseñada exclusivamente para quienes quieren ingresar a escuelas que requieren examen.",
      },
      {
        type: "list",
        items: [
          "UNAM (Escuela Nacional Preparatoria y CCH)",
          "IPN (CECyT y CET)",
        ],
      },
      {
        type: "paragraph",
        text: "No es posible agregar opciones sin examen, por lo que no existe un respaldo dentro de esta modalidad.",
      },

      {
        type: "heading",
        text: "Cuántas opciones puedes elegir",
      },
      {
        type: "paragraph",
        text: "Puedes seleccionar hasta 5 opciones de la UNAM y hasta 5 del IPN, con un máximo de 10 opciones en total.",
      },
      {
        type: "paragraph",
        text: "El orden es importante, pero el factor determinante será tu puntaje en el examen.",
      },

      {
        type: "heading",
        text: "Requisito obligatorio",
      },
      {
        type: "paragraph",
        text: "Para poder elegir esta modalidad, necesitas contar con un promedio mínimo de 7.0 en secundaria.",
      },
      {
        type: "paragraph",
        text: "Si no cumples con este requisito, el sistema no te permitirá seleccionar estas opciones.",
      },

      {
        type: "heading",
        text: "Cómo es el examen",
      },
      {
        type: "paragraph",
        text: "El examen es en línea, consta de 128 preguntas de opción múltiple y evalúa 10 áreas de conocimiento.",
      },
      {
        type: "list",
        items: [
          "Matemáticas",
          "Razonamiento matemático",
          "Español",
          "Razonamiento verbal",
          "Historia",
          "Formación cívica y ética",
          "Física",
          "Química",
          "Biología",
          "Geografía",
        ],
      },
      {
        type: "paragraph",
        text: "Requiere preparación completa, ya que todas las áreas cuentan para tu resultado.",
      },
      {
        type: "paragraph",
        text: "El examen tiene un costo aproximado de $450 pesos.",
      },

      {
        type: "heading",
        text: "El riesgo de esta modalidad",
      },
      {
        type: "paragraph",
        text: "Si no alcanzas el puntaje necesario para ninguna de tus opciones, no recibirás asignación en la primera ronda.",
      },
      {
        type: "paragraph",
        text: "Después podrías participar en un periodo extemporáneo, pero ya competirías por lugares disponibles y no por tus opciones originales.",
      },

      {
        type: "heading",
        text: "Fechas importantes",
      },
      {
        type: "list",
        items: [
          "Registro: del 17 de marzo al 17 de abril de 2026",
          "Indicaciones del examen: del 18 al 22 de mayo",
          "Resultados: 18 de agosto de 2026",
        ],
      },

      {
        type: "heading",
        text: "Cómo te puede ayudar ECOGO",
      },
      {
        type: "paragraph",
        text: "ECOGO es una app diseñada para ayudarte a tomar mejores decisiones y prepararte correctamente.",
      },
      {
        type: "list",
        items: [
          "Evaluación de la mejor modalidad para ti",
          "Preparación para el examen UNAM/IPN",
          "Organización por materias y tiempos",
          "Seguimiento de cada etapa del proceso",
        ],
      },

      {
        type: "paragraph",
        text: "La Modalidad 2 puede llevarte directamente a tu objetivo, pero también implica asumir un mayor riesgo.",
      },
      {
        type: "paragraph",
        text: "Tomar esta decisión requiere preparación, estrategia y claridad sobre tus opciones.",
      },
    ],
  },
  {
    slug: "modalidad-1-ecoems-2026-sin-examen",
    title:
      "Modalidad 1 ECOEMS 2026: cómo entrar a la prepa sin examen y asegurar tu lugar",
    excerpt:
      "Descubre cómo funciona la Modalidad 1 del ECOEMS 2026, qué escuelas puedes elegir y cómo asegurar tu lugar sin examen.",
    date: "Abr 28, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: false,
    coverImage: "/blog/Blog9.png",
    content: [
      {
        type: "paragraph",
        text: "Si el examen te genera estrés o estás buscando una forma más directa de entrar a la preparatoria, es importante que conozcas la Modalidad 1 del ECOEMS.",
      },
      {
        type: "paragraph",
        text: "Esta modalidad permite ingresar al bachillerato sin presentar examen. Es una opción oficial del proceso que busca garantizar un lugar a los aspirantes que completen correctamente su registro.",
      },

      {
        type: "heading",
        text: "Qué es la Modalidad 1",
      },
      {
        type: "paragraph",
        text: "La Modalidad 1 está diseñada para quienes quieren evitar el examen y aun así asegurar un lugar en la preparatoria.",
      },
      {
        type: "paragraph",
        text: "Aquí no compites por puntaje, sino que tu asignación depende de las opciones que elijas y la disponibilidad de espacios en cada plantel.",
      },

      {
        type: "heading",
        text: "Qué escuelas puedes elegir sin examen",
      },
      {
        type: "paragraph",
        text: "En esta modalidad participan distintas instituciones de educación media superior.",
      },
      {
        type: "list",
        items: [
          "Colegio de Bachilleres (COLBACH)",
          "CONALEP",
          "IEMS",
          "DGETI",
          "DGB",
          "DGETAyCM",
          "Opciones del Estado de México (SECTI)",
          "Algunos planteles de la UAEMéx (Texcoco)",
        ],
      },
      {
        type: "paragraph",
        text: "Todas estas opciones no requieren examen, pero es importante elegirlas de forma estratégica.",
      },

      {
        type: "heading",
        text: "Cómo elegir tus opciones correctamente",
      },
      {
        type: "paragraph",
        text: "En Modalidad 1 debes elegir entre 5 y 10 opciones. Sin embargo, lo más importante no es la cantidad, sino el orden en el que las colocas.",
      },
      {
        type: "paragraph",
        text: "El sistema intentará asignarte primero a tu opción principal. Si no hay disponibilidad, continuará con las siguientes hasta encontrar un lugar.",
      },

      {
        type: "heading",
        text: "Cómo funciona la asignación",
      },
      {
        type: "paragraph",
        text: "La asignación no se basa en puntajes, sino en dos factores:",
      },
      {
        type: "list",
        items: [
          "Las opciones que elegiste",
          "La disponibilidad de lugares en cada plantel",
        ],
      },
      {
        type: "paragraph",
        text: "Si hay espacio en alguna de tus opciones, el sistema te asignará ahí.",
      },

      {
        type: "heading",
        text: "Ventajas de la Modalidad 1",
      },
      {
        type: "list",
        items: [
          "No necesitas presentar examen",
          "No tienes que pagar por prueba de admisión",
          "Evitas la presión del examen",
          "Tienes un lugar asegurado dentro del sistema si completas el registro correctamente",
        ],
      },

      {
        type: "heading",
        text: "Fechas importantes",
      },
      {
        type: "list",
        items: ["Registro: del 17 de marzo al 17 de abril de 2026"],
      },
      {
        type: "paragraph",
        text: "Antes de registrarte, debes contar con tu Llave MX, ya que es obligatoria para iniciar el proceso.",
      },

      {
        type: "heading",
        text: "Cómo te puede ayudar ECOGO",
      },
      {
        type: "paragraph",
        text: "ECOGO es una app diseñada para ayudarte a tomar mejores decisiones durante todo el proceso.",
      },
      {
        type: "list",
        items: [
          "Selección estratégica de opciones",
          "Explicación clara del proceso",
          "Recordatorios de fechas importantes",
          "Acompañamiento hasta la asignación final",
        ],
      },

      {
        type: "paragraph",
        text: "No presentar examen no significa que sea más fácil, sino que requiere una mejor estrategia al momento de elegir.",
      },
      {
        type: "paragraph",
        text: "Si eliges correctamente, puedes asegurar tu lugar sin pasar por el proceso de examen.",
      },
    ],
  },
  {
    slug: "que-estudiar-ecoems-2026-materias-examen",
    title:
      "Qué estudiar para el ECOEMS 2026: las materias reales del examen UNAM/IPN",
    excerpt:
      "Conoce las materias que vienen en el examen ECOEMS 2026 y cómo empezar a estudiar de forma estratégica.",
    date: "Abr 28, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: false,
    coverImage: "/blog/Blog8.png",
    content: [
      {
        type: "paragraph",
        text: "Si elegiste la modalidad con examen o estás considerando UNAM o IPN, es normal preguntarte qué necesitas estudiar exactamente. A diferencia de otras opciones, aquí no basta con registrarte, necesitas prepararte de forma estratégica.",
      },
      {
        type: "paragraph",
        text: "El examen no es improvisado. Es una prueba estructurada que mide diferentes conocimientos al mismo tiempo. Se trata de un examen en línea de 128 preguntas de opción múltiple, por lo que además de dominar los temas, debes sentirte cómodo resolviendo todo en computadora y administrando bien tu tiempo.",
      },

      {
        type: "heading",
        text: "Las materias que vienen en el examen",
      },
      {
        type: "paragraph",
        text: "El examen está dividido en 10 áreas específicas, y cada una tiene peso en tu resultado final.",
      },
      {
        type: "list",
        items: [
          "Razonamiento matemático",
          "Matemáticas",
          "Español",
          "Razonamiento verbal",
          "Historia",
          "Formación cívica y ética",
          "Física",
          "Química",
          "Biología",
          "Geografía",
        ],
      },
      {
        type: "paragraph",
        text: "Las materias de ciencias se evalúan por separado, lo que significa que no puedes estudiarlas como un solo bloque. Cada una requiere atención específica.",
      },

      {
        type: "heading",
        text: "El error más común al estudiar",
      },
      {
        type: "paragraph",
        text: "Muchos estudiantes se enfocan solo en matemáticas y español, dejando de lado otras materias. Sin embargo, el examen evalúa equilibrio, no solo fortalezas individuales.",
      },
      {
        type: "paragraph",
        text: "También es común estudiar sin estrategia, sin saber cuánto tiempo dedicar a cada área o sin practicar en condiciones similares al examen real.",
      },

      {
        type: "heading",
        text: "Cómo estudiar de forma inteligente",
      },
      {
        type: "paragraph",
        text: "Para mejorar tu resultado, es importante estudiar con estrategia. Identifica en qué materias eres fuerte y en cuáles necesitas reforzar.",
      },
      {
        type: "list",
        items: [
          "Prioriza tus áreas débiles",
          "Practica en formato digital",
          "Organiza tu tiempo de estudio",
          "No descuides ninguna materia",
        ],
      },
      {
        type: "paragraph",
        text: "Recuerda que también necesitas cumplir con un promedio mínimo de 7.0 para poder acceder a opciones como UNAM o IPN.",
      },

      {
        type: "heading",
        text: "Cómo te puede ayudar ECOGO",
      },
      {
        type: "paragraph",
        text: "ECOGO es una app diseñada para ayudarte a estudiar de forma organizada y efectiva durante todo el proceso.",
      },
      {
        type: "list",
        items: [
          "Guía clara de temas por materia",
          "Organización de estudio por etapas",
          "Práctica tipo examen",
          "Preparación específica para UNAM/IPN",
        ],
      },

      {
        type: "paragraph",
        text: "El examen no es imposible, pero tampoco es algo que puedas dejar para el último momento.",
      },
      {
        type: "paragraph",
        text: "La diferencia no la hace quién estudia más, sino quién estudia mejor. Empieza desde ahora y construye tu preparación paso a paso.",
      },
    ],
  },
  {
    slug: "ecoems-2026-prepas-con-examen-unam-ipn",
    title:
      "ECOEMS 2026: las únicas prepas que sí hacen examen (UNAM e IPN explicado fácil)",
    excerpt:
      "Descubre qué escuelas sí requieren examen en ECOEMS 2026, cómo es la prueba y qué debes considerar antes de elegir.",
    date: "Abr 28, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: false,
    coverImage: "/blog/Blog7.png",
    content: [
      {
        type: "paragraph",
        text: "Si estás en este proceso y tu objetivo es entrar a la UNAM o al IPN, hay algo que debes entender desde el inicio: en el sistema ECOEMS, la mayoría de las escuelas son de acceso directo, pero estas dos instituciones sí requieren examen.",
      },
      {
        type: "paragraph",
        text: "Mientras muchas opciones ya no piden prueba de admisión, la UNAM y el IPN mantienen un examen en línea que define el ingreso.",
      },

      {
        type: "heading",
        text: "Qué escuelas sí hacen examen",
      },
      {
        type: "paragraph",
        text: "Dentro del sistema ECOEMS, únicamente dos instituciones aplican examen:",
      },
      {
        type: "list",
        items: [
          "UNAM (Escuela Nacional Preparatoria y CCH)",
          "IPN (CECyT y CET)",
        ],
      },
      {
        type: "paragraph",
        text: "No hay más opciones con examen dentro del sistema. Si eliges alguna de estas escuelas, deberás presentar la prueba.",
      },

      {
        type: "heading",
        text: "Requisitos importantes que debes cumplir",
      },
      {
        type: "paragraph",
        text: "Para poder elegir UNAM o IPN, necesitas cumplir con ciertos requisitos desde el registro.",
      },
      {
        type: "list",
        items: [
          "Promedio mínimo de 7.0 en secundaria",
          "Elegir Modalidad 2 o Modalidad 3",
          "Pagar el examen (aproximadamente $450 pesos)",
        ],
      },
      {
        type: "paragraph",
        text: "Si no cumples con estos requisitos, el sistema no te permitirá seleccionar estas opciones.",
      },

      {
        type: "heading",
        text: "Cómo es el examen",
      },
      {
        type: "paragraph",
        text: "El examen es completamente en línea y consta de 128 preguntas de opción múltiple.",
      },
      {
        type: "paragraph",
        text: "Evalúa distintas áreas de conocimiento al mismo tiempo, por lo que requiere preparación integral.",
      },
      {
        type: "list",
        items: [
          "Matemáticas",
          "Razonamiento matemático",
          "Español",
          "Razonamiento verbal",
          "Historia",
          "Formación cívica y ética",
          "Física",
          "Química",
          "Biología",
          "Geografía",
        ],
      },
      {
        type: "paragraph",
        text: "Todas las materias cuentan, por lo que no es recomendable enfocarse solo en algunas.",
      },

      {
        type: "heading",
        text: "Fechas clave del proceso",
      },
      {
        type: "list",
        items: [
          "Registro: del 17 de marzo al 17 de abril de 2026",
          "Indicaciones del examen: del 18 al 22 de mayo",
          "Resultados: 18 de agosto de 2026",
        ],
      },

      {
        type: "heading",
        text: "El error más común al elegir modalidad",
      },
      {
        type: "paragraph",
        text: "Elegir únicamente Modalidad 2 puede ser riesgoso. Si no alcanzas el puntaje necesario, no tendrás una opción automática dentro del sistema.",
      },
      {
        type: "paragraph",
        text: "En cambio, la Modalidad 3 permite incluir opciones sin examen como respaldo, aumentando tus probabilidades de obtener un lugar.",
      },

      {
        type: "heading",
        text: "Cómo te puede ayudar ECOGO",
      },
      {
        type: "paragraph",
        text: "ECOGO es una app diseñada para ayudarte a entender y navegar todo el proceso ECOEMS sin errores.",
      },
      {
        type: "list",
        items: [
          "Explicación clara de modalidades",
          "Guía para entender el examen",
          "Recordatorios de fechas importantes",
          "Preparación para UNAM e IPN",
        ],
      },

      {
        type: "paragraph",
        text: "Entrar a la UNAM o al IPN no depende de la suerte. Depende de entender el proceso, tomar buenas decisiones y prepararte correctamente.",
      },
      {
        type: "paragraph",
        text: "Si tu objetivo es una de estas escuelas, el examen es el camino. Y entre mejor te prepares, más cerca estarás de tu primera opción.",
      },
    ],
  },
  {
    slug: "llave-mx-ecoems-2026-como-crear",
    title: "Llave MX 2026: el primer paso obligatorio para entrar a la prepa",
    excerpt:
      "Qué es la Llave MX, cómo crearla correctamente y los errores que pueden complicar tu registro ECOEMS 2026.",
    date: "Abr 17, 2026",
    author: "ECOGO",
    category: "ECOEMS",
    featured: false,
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
