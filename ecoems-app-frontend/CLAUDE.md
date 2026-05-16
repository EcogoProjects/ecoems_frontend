@AGENTS.md

# Ecogo — ECOEMS Frontend

Plataforma de preparación para el examen ECOEMS (Examen de Conocimiento y Habilidades para el Egreso de la Educación Media Superior) en México. Permite a estudiantes practicar exámenes, analizar su progreso y repasar el programa de estudio.

## Stack tecnológico

- **Next.js 16.2.1** con App Router (`src/app/`) — leer `node_modules/next/dist/docs/` antes de usar cualquier API de Next.js
- **React 19.2.4** con React Compiler habilitado (`reactCompiler: true` en `next.config.mjs`)
- **Tailwind CSS v4** — sin `tailwind.config.js`; el tema se define con `@theme inline` en `src/app/globals.css`
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) para autenticación y base de datos
- **Recharts 3** para gráficas en analytics
- **react-icons 5** y **@boxicons/react** para iconografía
- Lenguaje de código: mezcla de **JS/JSX** (mayoría) y **TS** (utils/supabase y todos los hooks en `src/hooks/`)

## Estructura del proyecto

```
src/
├── proxy.ts               # Route guard: protege rutas, redirige no-autenticados a /login
├── app/
│   ├── layout.js              # Root layout (fuente Outfit, lang="es")
│   ├── globals.css            # Variables CSS del tema y base de Tailwind
│   ├── page.jsx               # Landing page (vacía por ahora)
│   ├── plans/page.jsx         # Comparación de planes freemium/premium
│   ├── auth/
│   │   └── callback/route.js  # Route Handler: intercambia code/token y crea perfil en backend
│   └── (app)/                 # Route group — rutas protegidas (el (app) NO aparece en la URL)
│       ├── login/page.jsx     # → /login
│       ├── signup/page.jsx    # → /signup
│       ├── email-confirmation/page.jsx  # → /email-confirmation
│       ├── home/page.jsx      # → /home  (dashboard con selector de examen)
│       ├── exam/page.jsx      # → /exam
│       ├── analytics/page.jsx # → /analytics
│       ├── profile/page.jsx   # → /profile
│       ├── program/page.jsx   # → /program
│       └── coming-soon/page.jsx  # → /coming-soon
├── components/
│   ├── AppProvider.tsx        # Puebla el store de Zustand en page refresh / navegación directa con sesión existente
│   ├── NavBarDesktop.jsx      # Navbar fijo superior (oculto en mobile) — altura fija h-14; izquierda: logo + links de nav (Home, Dashboard) con indicador activo border-b en --base-hard-color via usePathname; derecha: botón avatar+nombre abre dropdown (w-64) con link a /profile y signOut
│   ├── NavBarMovile.jsx       # Navbar fijo inferior (oculto en desktop) — dropdown con signOut al hacer clic en avatar
│   ├── Announcement_box.jsx
│   ├── Timer.jsx
│   ├── MarginTop.jsx / MarginBottom.jsx  # Espaciado para compensar navbars fijos
│   ├── ImageModal.jsx
│   ├── PremiumBox.jsx
│   ├── analytics/             # Componentes específicos de analytics
│   │   ├── CircleAvgIndicator.jsx
│   │   ├── ExamProgressChart.jsx
│   │   ├── SubjectScoreItem.jsx
│   │   ├── TopicAccordion.jsx
│   │   └── TopicAccordionSkeleton.jsx  # Skeleton de carga para TopicAccordion
│   ├── exam/                  # Componentes específicos de examen
│   │   ├── ExamOption.jsx
│   │   ├── ExamExplanation.jsx
│   │   ├── ExamTypeButton.jsx
│   │   ├── ExamHeader.jsx       # Barra superior del examen: tipo, NavExam, botón Ayuda, flechas prev/next (desktop)
│   │   ├── NavExam.jsx          # Burbuja de navegación horizontal entre preguntas; usa q.id como key
│   │   ├── QuestionPanel.jsx    # Panel izq: muestra reading, enunciado, opciones A-D (texto o imagen), botón Contestar (muestra "Enviando..." con isSubmitting, error con submitError via patrón opacidad)
│   │   ├── ResourcePanel.jsx    # Panel der: imagen de la pregunta, pista (revealHint), explicación (revealExplanation); recibe answerResult { isCorrect, correctAnswer, explanation } para ExamExplanation; usa useLatexScanner
│   │   ├── HintBox.jsx          # Overlay de ayuda: opciones "Mostrar pista" y "Ver explicación directa"
│   │   ├── FinishedExamDashboard.jsx  # Modal de resultado final: CircleAvgIndicator + mensaje según score + link a /home
│   │   ├── Timer.jsx            # Countdown timer con persistencia en localStorage (exam_end_time). Deshabilitado en exam/page.jsx por ahora.
│   │   └── ExamDescription.jsx  # Modal de configuración de examen: selects en cascada (materia→tema→subtema) con datos de useSyllabus, indicador de vidas (FaHeart), props onStart({subtopic_id}) e isStarting para conectar con startExamSession
│   ├── homepage/
│   │   ├── ExamSelector.jsx     # Botones de tipo de examen; al click en Rápido verifica canQuickExam (via useExam) y abre ExamDescription o modal de límite diario; bloquea scroll del body mientras hay modal abierto
│   │   └── DailyLivesBar.jsx    # Barra prominente entre navbar y ExamSelector; muestra quick_exams_remaining (corazones rojos) y quick_exams_count (corazones apagados) consumiendo useExam; skeleton de puntos animados durante carga
│   └── profilepage/
│       └── AvatarSelector.jsx
├── store/
│   └── userStore.ts           # Store Zustand global: name, avatar_url, onboarding_completed, plan_type, isLoaded
├── hooks/
│   ├── useEstadosMunicipios.ts
│   ├── useProfile.ts              # Carga y cachea el perfil completo del usuario (GET /users/me). Exporta updateProfileCache(), clearProfileCache() y el hook useProfile() → { data, isLoading }.
│   ├── useUpdateAvatar.ts         # PATCH de avatar: patchAvatar(avatarUrl) con isAvatarLoading.
│   ├── useUpdateProfile.ts        # PATCH de datos personales: patchProfile(payload) con isProfileLoading.
│   ├── useSyllabus.ts             # Carga y cachea el temario completo (GET /syllabus). Mapea name → subject/topic para TopicAccordion. → { data: SyllabusSubject[], isLoading }.
│   ├── useExam.ts                 # Gestiona sesión de examen y uso diario. Expone startExamSession(params), isLoading, session, dailyUsage, isUsageLoading, canQuickExam. Cachés de módulo: dailyUsageCache y sessionCache (este último persiste la sesión durante la navegación a /exam).
│   └── useQuickExamLogic.ts       # Lógica de UI del examen rápido: lee session de useExam, mapea ExamQuestion → MappedQuestion (snake_case→camelCase, exam_area desde ExamSession), gestiona currentIndex, answers, swipe, finish. exam_area viene de session.exam_area (nivel de sesión, no de pregunta).
├── lib/
│   ├── api/                   # Toda la capa de I/O con Supabase — SIEMPRE usar esto
│   │   ├── index.js           # Re-exporta todo: import { fn } from '@/lib/api'
│   │   ├── auth.js            # signInWithEmail, signInWithGoogle, signUp, signOut, getUser, getSession, onAuthStateChange
│   │   ├── client.js          # Fetcher base (solo cliente — NO usar en Route Handlers de servidor)
│   │   ├── profile.js         # getUserMe, getUserBasicInfo, patchUserMe, getProfile, updateProfile, updateAvatar
│   │   ├── exam.js            # startExam, getDailyUsage, submitAnswer({ session_id, question_id, selected_answer }) → POST /exams/{session_id}/answer; submitExam(session_id) → POST /exams/{session_id}/submit
│   │   ├── analytics.js       # getUserStats, getSubjectStats, getTopSubjects, getWeakSubjects, getProgressHistory
│   │   ├── subscription.js    # getSubscription, isPremium
│   │   └── syllabus.js        # getSyllabus() → GET /syllabus
│   └── data/
│       └── avatars.json       # Lista de avatares disponibles para el onboarding
└── utils/
    ├── supabase/
    │   ├── client.ts          # createBrowserClient — solo para lib/api (no usar directo en páginas)
    │   └── server.ts          # createServerClient con cookies (Server Components, proxy)
    ├── onboardingCookie.ts    # setOnboardingCookie() / clearOnboardingCookie()
    ├── ecoems_program.js      # Estructura del programa ECOEMS (materias > temas > subtemas)
    ├── questions_examples.js  # Preguntas de ejemplo (datos mock)
    └── exam/
        └── examLogic.ts       # DailyUsage (interface) + canTakeQuickExam(usage) → boolean (regla: quick_exams_remaining > 0)
```

## Tema visual y estilos

El tema usa variables CSS definidas en `src/app/globals.css` con `@theme inline`:

| Variable CSS | Valor | Uso |
|---|---|---|
| `--base-color` | `#EEE4C1` | Fondo principal |
| `--base-hard-color` | `#CDAD75` | Tono oscuro |
| `--base-soft-color` | `#FFF9E4` | Tono claro |
| `--base-dark-color` | `#472E18` | Color primario oscuro (textos, botones) |
| `--base-extra-light-color` | `#EEE7DD` | Fondo más claro |
| `--premium-box-color` | `#b8925a` | UI premium |

Clases Tailwind personalizadas disponibles: `bg-base`, `bg-base-dark`, `bg-base-soft`, `bg-base-hard`, `text-base-dark`, `text-base`, `rounded-box-standard` (18px).

La fuente global es **Outfit** (Google Fonts via `next/font/google`), disponible como variable CSS `--font-outfit`.

### Animaciones globales

Definidas como `@keyframes` en `globals.css` y registradas como tokens en `@theme inline`:

| Clase Tailwind | Efecto |
|---|---|
| `animate-floaty` | Float vertical suave (6s, usado en hero de email-confirmation) |
| `animate-pulse-dot` | Pulso radial expandiéndose (1.8s, usado en badges de estado) |

## Capa API (`src/lib/api/`)

**Regla:** todo acceso a datos pasa por `src/lib/api/`. Los componentes y páginas nunca llaman a `createClient()` directamente ni usan `fetch` suelto.

```js
// Importación única desde cualquier componente 'use client'
import { signInWithEmail, getProfile, getUserStats } from '@/lib/api'
```

Patrón de retorno uniforme en todas las funciones:
```js
// Éxito:  { data: <resultado>, error: null }
// Error:  { data: null, error: "mensaje legible" }
```

**Importante:** `src/lib/api/client.js` usa `createBrowserClient` internamente — solo funciona en el cliente. En Route Handlers de servidor (como `/auth/callback`) hay que hacer `fetch` directamente con el token de la sesión.

### Arquitectura de dos capas

| Capa | Responsable de | Módulos |
|---|---|---|
| **Supabase** | Auth: login, registro, OAuth, sesión | `auth.js` |
| **Backend `localhost:8000`** | Todos los datos de la app | `profile`, `exam`, `analytics`, `subscription`, `syllabus` |

El flujo de autenticación con el backend es:
1. Usuario se loguea → Supabase devuelve un **JWT**
2. Cada request al backend incluye `Authorization: Bearer <JWT>`
3. El backend verifica el JWT con la clave de Supabase para identificar al usuario

### `client.js` — fetcher base

Ubicado en `src/lib/api/client.js`. Obtiene el token de la sesión de Supabase e inyecta el header automáticamente. Maneja errores de red y respuestas no-OK.

```js
import { api } from '@/lib/api'
const { data, error } = await api.get('/api/v1/profile')
const { data, error } = await api.post('/api/v1/exam-results', payload)
```

### Endpoints del backend

| Módulo | Método | Endpoint |
|---|---|---|
| **users** | POST | `/users/me` |
| | GET | `/users/me` |
| | GET | `/users/me/basic-info` |
| | PATCH | `/users/me` |
| | GET | `/users/me/usage/daily` |
| **schools** | GET | `/schools` |
| **profile** | GET | `/api/v1/profile` |
| | PUT | `/api/v1/profile` |
| | PATCH | `/api/v1/profile/avatar` |
| **exam** | GET | `/api/v1/questions?subject=&exam_type=&limit=` |
| | POST | `/api/v1/exam-results` |
| | GET | `/api/v1/exam-results?limit=` |
| **analytics** | GET | `/api/v1/analytics/stats` |
| | GET | `/api/v1/analytics/subjects` |
| | GET | `/api/v1/analytics/subjects/top?limit=` |
| | GET | `/api/v1/analytics/subjects/weak?limit=` |
| | GET | `/api/v1/analytics/progress?limit=` |
| **subscription** | GET | `/api/v1/subscription` |
| **syllabus** | GET | `/syllabus` |
| **exams** | POST | `/exams/start` |
| | POST | `/exams/{session_id}/answer` |
| | POST | `/exams/{session_id}/submit` |

## Autenticación (Supabase)

Variables de entorno requeridas en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=...
```

- **Desde componentes**: usar funciones de `@/lib/api` (nunca `createClient()` directo)
- **Server Components / proxy**: usar `createClient()` de `@/utils/supabase/server`
- Métodos implementados: email/password y Google OAuth
- Facebook OAuth está en la UI pero sin implementar

### Protección de rutas (`src/proxy.ts`)

El archivo `proxy.ts` (equivalente al `middleware.ts` de Next.js ≤15 — renombrado en v16) actúa como route guard:

| Ruta | Sin sesión | Con sesión |
|---|---|---|
| `/home`, `/exam`, `/analytics`, `/profile`, `/program`, `/coming-soon` | → `/login?redirect=<ruta>` | pasa |
| `/login`, `/signup` | pasa | → `/home` |
| Todo lo demás (`/`, `/plans`, `/auth/callback`, estáticos) | pasa | pasa |

Reglas críticas al modificar `proxy.ts`:
- Usar **`getUser()`** — nunca `getSession()` (getSession no verifica contra servidores de Supabase)
- Siempre devolver `supabaseResponse` (no un `NextResponse.next()` nuevo) para no romper el refresco de tokens
- Al redirigir, copiar cookies de `supabaseResponse` al redirect para preservar el token

### Store de usuario y AppProvider

`src/store/userStore.ts` guarda `{ name, avatar_url, onboarding_completed, plan_type, isLoaded }`. El flag `isLoaded` evita llamadas duplicadas al backend.

`AppProvider` (montado en el root layout) llama a `getUserBasicInfo()` una sola vez cuando `isLoaded` es `false`. Cubre el caso de **page refresh o navegación directa a una ruta protegida** con sesión preexistente.

**Importante:** `AppProvider` dispara en el primer render del layout, que puede ocurrir antes de que el usuario haya iniciado sesión (ej. cuando aterriza en `/login`). En ese caso la llamada falla, `isLoaded` queda en `true` con datos vacíos, y `AppProvider` no volverá a intentarlo. Por eso el flujo de login **debe** poblar el store directamente (ver abajo).

### Flujo de login con email/contraseña

1. `signInWithEmail()` → Supabase autentica y guarda la sesión
2. `getUserBasicInfo()` → obtiene `name`, `avatar_url`, `plan_type`, `onboarding_completed`
3. `useUserStore.getState().setUser({ ...basicInfo, isLoaded: true })` → puebla el store **antes** de redirigir
4. Si `onboarding_completed`: `setOnboardingCookie()` + `router.push(safeRedirect)`; si no: `router.push('/initial-registration')`

### Flujo de signOut

1. `supabase.auth.signOut()` elimina la sesión
2. `clearOnboardingCookie()` borra la cookie `onboarding` del browser
3. `clearProfileCache()` resetea el caché de perfil a `null` — **crítico** para que el siguiente usuario no vea datos del anterior
4. `useUserStore.getState().clear()` resetea el store a valores nulos (`isLoaded: false`)
5. `router.push('/login')`

Las tres limpiezas ocurren en el componente (NavBarDesktop / NavBarMovile), no en el proxy.

### Flujo de login con redirect

`/login` acepta el parámetro `?redirect=/ruta` y redirige ahí tras autenticarse:
- El proxy lo inyecta automáticamente cuando bloquea una ruta protegida
- Validación de seguridad: solo se acepta si empieza con `/` (previene open redirect)

### Flujo de registro completo

1. Usuario llena el form → `signUp()` llama a `supabase.auth.signUp()` con `emailRedirectTo: /auth/callback`
2. Supabase envía el correo de confirmación; `name` y `last_name` se guardan en `user_metadata`
3. `signUp()` retorna sin llamar al backend — solo redirige a `/email-confirmation`
4. Usuario hace clic en el link de su correo → llega a `/auth/callback`
5. El callback intercambia el `code` (PKCE) o `token_hash` (OTP) por una sesión
6. El callback llama a `POST /users/me` con el JWT y los datos de `user_metadata`
7. `201` o `409` (perfil ya existía) → redirect a `/coming-soon`
8. Cualquier otro error → redirect a `/signup?error=profile_creation_failed`

**Detección de email duplicado en `signUp()`:**
- Sin confirmación de email: Supabase retorna `error.message === 'User already registered'`
- Con confirmación de email: Supabase finge éxito pero `data.user.identities` llega vacío (`[]`)
- Ambos casos retornan un mensaje amigable en español

## Convenciones de código

- Todos los componentes son **funcionales** con hooks (`useState`, `useEffect`)
- Estado global con **Zustand** (`src/store/userStore.ts`) — solo para datos del usuario autenticado (`name`, `avatar_url`, `plan_type`, `onboarding_completed`, `isLoaded`)
- Navegación client-side con `useRouter` y `usePathname` de `'next/navigation'`
- Alias de importación `@/` apunta a `src/` (configurado en `jsconfig.json`)
- Páginas interactivas usan `'use client'` al inicio del archivo
- Todo el texto de UI está en **español**

### Mensajes de error en formularios sin layout shift

Para evitar que los mensajes de error muevan el layout del formulario al aparecer/desaparecer:
- El elemento `<p>` de error **siempre está en el DOM** con altura fija (`h-11 overflow-hidden`)
- Se alterna visibilidad con `opacity-0 select-none` / `opacity-100` — nunca con montaje/desmontaje condicional
- Mismo patrón para hints inline (ej. requisitos de contraseña): un solo `<p>` con clases condicionales, no dos elementos alternos

```jsx
// Correcto — altura fija, siempre en DOM
<p className={`h-11 overflow-hidden text-sm transition-opacity ${error ? 'opacity-100' : 'opacity-0 select-none'}`}>
  {error ?? ' '}
</p>

// Incorrecto — causa layout shift
{error && <p>{error}</p>}
```

## Comandos de desarrollo

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## Datos mock actuales

- `src/utils/questions_examples.js` — preguntas de examen de ejemplo (hardcoded)
- `src/utils/ecoems_program.js` — estructura completa del programa ECOEMS
- Datos de analytics en los componentes están hardcoded (pendiente integrar con Supabase)

## Notas importantes

- **`proxy.ts` no `middleware.ts`**: en Next.js 16 el archivo de middleware se renombró a `proxy.ts` y la función exportada se llama `proxy` (no `middleware`). Crear un `middleware.ts` no tendrá efecto.
- **React Compiler está activo**: evitar patrones que rompan las reglas de React (efectos en el render, mutaciones de estado directas)
- **Tailwind v4**: no existe `tailwind.config.js`; cualquier extensión del tema va en `globals.css` con `@theme inline`
- **NavBars fijos**: usar `<MarginTop />` y `<MarginBottom />` en páginas protegidas para compensar el espacio de los navbars fijos
- **Next.js 16**: tiene breaking changes respecto a versiones anteriores — consultar `node_modules/next/dist/docs/` antes de usar APIs de Next.js
- **`api` client solo en cliente**: `src/lib/api/client.js` no funciona en Route Handlers de servidor; usar `fetch` directo con `session.access_token`
- **`useProfile` y caché de módulo**: `src/hooks/useProfile.ts` usa una variable `let profileCache` a nivel de módulo para cachear el perfil. Expone tres funciones además del hook:
  - `updateProfileCache(updates)` — muta campos concretos del caché y notifica a todas las instancias activas del hook vía un `Set<setData>` de suscriptores, provocando re-render inmediato sin recargar.
  - `clearProfileCache()` — resetea el caché a `null`. **Debe llamarse en el signOut** para evitar que el siguiente usuario vea datos del anterior.
  - `useProfile()` → `{ data, isLoading }` — el hook se registra como suscriptor al montarse y se da de baja al desmontarse.
- **`useUpdateAvatar`**: `src/hooks/useUpdateAvatar.ts` — PATCH del avatar. Expone `patchAvatar(avatarUrl)` e `isAvatarLoading`. Llama a `updateProfileCache` y `useUserStore.getState().setUser()` al completarse.
- **`useUpdateProfile`**: `src/hooks/useUpdateProfile.ts` — PATCH de datos personales (`name`, `last_name`, `phone`, `gender`, `state`, `town`). Expone `patchProfile(payload)` e `isProfileLoading`. Mismo patrón de cache y store que `useUpdateAvatar`.
- **`useSyllabus`**: `src/hooks/useSyllabus.ts` — carga el temario completo (`GET /syllabus`) con caché de módulo (`let syllabusCache`). Mapea el campo `name` de la API a `subject` (materias) y `topic` (temas) para que `TopicAccordion` lo consuma sin cambios. Retorna `{ data: SyllabusSubject[] | null, isLoading }`. La home page muestra `<TopicAccordionSkeleton />` mientras `isLoading` es `true`.
- **`useExam`**: `src/hooks/useExam.ts` — gestiona sesión de examen y uso diario. Dos cachés de módulo: `dailyUsageCache` (evita fetches duplicados de `/users/me/usage/daily`) y `sessionCache` (persiste la `ExamSession` durante la navegación a `/exam`, ya que el estado de React no sobrevive el unmount). Expone:
  - `startExamSession({ exam_type, subtopic_id? })` → `{ data: ExamSession, error }` — llama a `POST /exams/start`; guarda el resultado en `sessionCache` antes de resolver
  - `isLoading` — true mientras startExamSession está en curso
  - `session: ExamSession | null` — sesión activa con `session_id`, `expires_at`, `exam_area` y `questions[]`
  - `dailyUsage: DailyUsage | null` — `{ usage_date, quick_exams_count, hints_used_count, quick_exams_remaining, hints_remaining }`
  - `isUsageLoading` — true hasta que llegue la respuesta de `GET /users/me/usage/daily`
  - `canQuickExam: boolean` — derivado de `canTakeQuickExam(dailyUsage)` en `examLogic.ts`
  - `timeRemaining: number` — segundos restantes calculados como `floor((expires_at - Date.now()) / 1000)`, actualizado cada segundo via `setInterval`. Se inicializa desde `sessionCache` para evitar salto en primer render.
- **`useQuickExamLogic`**: `src/hooks/useQuickExamLogic.ts` — lógica de UI del examen rápido consumida por `exam/page.jsx`. Lee `session` y `timeRemaining` de `useExam()`. Mapea cada `ExamQuestion` a `MappedQuestion` (snake_case→camelCase). Gestiona `currentIndex`, `answers`, `selectedOption`, swipe táctil y `finishExam`. Flujo de respuesta: `handleContestar` (async) llama `submitAnswer` → guarda `{ isCorrect, correctAnswer, explanation }` en `answerResults[question_id]` → llama `saveAnswer`. `revealExplanation` se deriva de `answerResults` (se activa automáticamente al contestar). `finishExam` (async) llama `submitExam` para obtener el score real; usa `isFinishingRef` para prevenir doble llamada. Timer: `useEffect([timeRemaining])` dispara `finishExam('timeout', ...)` cuando llega a 0. Exporta además: `answerResults`, `submitError`, `isSubmitting`, `timeRemaining`.
- **`examLogic.ts`**: `src/utils/exam/examLogic.ts` — lógica pura de elegibilidad. `DailyUsage` interface + `canTakeQuickExam(usage): boolean` (regla: `quick_exams_remaining > 0`). El hook solo llama esta función; la decisión vive aquí.
- **`exam/page.jsx`**: usa `useQuickExamLogic`. Si `session` es null redirige a `/home`. Muestra el timer `MM:SS` (rojo al llegar a ≤60s) a la izquierda del botón Finalizar. Pasa `answerResult={answerResults[currentQ.id] ?? null}` a `ResourcePanel` y `submitError`/`isSubmitting` a `QuestionPanel`. Renderiza `ExamHeader`, `QuestionPanel`, `ResourcePanel`, `HintBox`, `FinishedExamDashboard` e `ImageModal`.
- **`ExamDescription`**: `src/components/exam/ExamDescription.jsx` — modal de configuración previa al examen. Selects en cascada (materia → tema → subtema) con datos de `useSyllabus`. Nombres largos se truncan a 70 chars con `clip()` + atributo `title` para tooltip. Sección de vidas: `examsRemaining` corazones rojos + `examsUsed` corazones apagados. Props: `onStart({ subtopic_id })` (llamado al click de Comenzar) e `isStarting` (muestra "Iniciando..." y deshabilita el botón mientras el fetch está en curso). Botón Comenzar deshabilitado (`bg-base-hard/60`) hasta que los 3 selects tienen valor o mientras `isStarting`.
- **`DailyLivesBar`**: `src/components/homepage/DailyLivesBar.jsx` — barra prominente en `/home` entre la AnnouncementBox y el ExamSelector. Muestra `quick_exams_remaining` (corazones rojos FaHeart) y `quick_exams_count` (corazones apagados) con el conteo `X/N`. Durante carga: 3 círculos con `animate-pulse`. Consume `useExam()`; la caché del hook evita doble fetch con ExamSelector.
- **Animación acordeón (grid trick)**: para animar apertura/cierre de contenido sin JavaScript de medición, usar el patrón `grid-rows-[0fr]/[1fr]` con `transition-all`. El contenido **siempre está en el DOM**; el div exterior alterna entre las dos clases y el div interior lleva `overflow-hidden`. Usado en `TopicAccordion`.
- **Caché `.next` y cambios de rutas**: Next.js 16 usa Turbopack por defecto en dev y mantiene un caché persistente en `.next/dev/cache/turbopack/`. Si se reorganiza la estructura de rutas (ej. renombrar carpetas), ese caché queda corrupto y puede causar crash del sistema por agotamiento de RAM al arrancar `npm run dev`. Solución: borrar `.next/` antes de levantar el servidor. Quien tenga el proyecto localmente con la estructura anterior necesita hacer `rm -rf .next` una vez. Clones frescos no tienen este problema.
