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
│       ├── initial-registration/page.jsx  # → /initial-registration (onboarding inicial tras confirmar email)
│       ├── home/page.jsx      # → /home  (dashboard con selector de examen)
│       ├── exam/page.jsx      # → /exam
│       ├── analytics/page.jsx # → /analytics
│       ├── profile/page.jsx   # → /profile
│       ├── program/page.jsx   # → /program
│       └── coming-soon/page.jsx  # → /coming-soon
├── components/
│   ├── AppProvider.tsx        # Puebla el store de Zustand en page refresh / navegación directa con sesión existente
│   ├── AppLink.jsx            # Wrapper de next/link: enciende el overlay de navegación via onNavigate (solo SPA); usar en lugar de Link para navegación interna
│   ├── NavigationOverlay.jsx  # Overlay global (montado en root layout): círculo de carga sobre la página actual mientras carga la destino; se apaga al cambiar pathname (timeout de seguridad 8s)
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
│   │   ├── ExamHeader.jsx       # Barra superior del examen: tipo, NavExam, botón Ayuda (deshabilitable por pregunta con isHelpDisabled), flechas prev/next (desktop)
│   │   ├── NavExam.jsx          # Burbuja de navegación horizontal entre preguntas; usa q.id como key
│   │   ├── QuestionPanel.jsx    # Panel izq: muestra reading, enunciado, opciones A-D (texto o imagen), botón Contestar (muestra "Enviando..." con isSubmitting, error con submitError via patrón opacidad)
│   │   ├── ResourcePanel.jsx    # Panel der: imagen de la pregunta, pista (revealHint), explicación (revealExplanation); recibe hint + hintCount ("Pistas usadas: X/5") y answerResult { isCorrect, correctAnswer, explanation } para ExamExplanation; usa useLatexScanner
│   │   ├── HintBox.jsx          # Overlay de ayuda: opciones "Mostrar pista" y "Ver explicación directa"; muestra carga/error via props mientras llama al backend
│   │   ├── FinishedExamDashboard.jsx  # Componente legacy de resultado final; el flujo actual usa /exam-result con ResultQuestions*
│   │   ├── Timer.jsx            # Countdown timer con persistencia en localStorage (exam_end_time). Deshabilitado en exam/page.jsx por ahora.
│   │   └── ExamDescription.jsx  # Modal de configuración de examen: selects en cascada (materia→tema→subtema) con datos de useSyllabus, indicador de vidas (FaHeart), props onStart({subtopic_id}) e isStarting para conectar con startExamSession
│   ├── homepage/
│   │   ├── ExamSelector.jsx     # Botones de tipo de examen; al click en Rápido verifica canQuickExam (via useExam) y abre ExamDescription o modal de límite diario; Seguimiento y Libre abren modal "Recurso disponible próximamente"; bloquea scroll del body mientras hay modal abierto
│   │   └── ExamLivesBar.jsx     # Dos tarjetas (rápidos y simulacro) entre navbar y ExamSelector; patas PiPawPrintFill restantes/usadas + conteo X/N consumiendo useExam; infinito (PiInfinityBold) si remaining === 999; skeleton de puntos durante carga
│   └── profilepage/
│       └── AvatarSelector.jsx
├── store/
│   ├── userStore.ts           # Store Zustand global: name, avatar_url, onboarding_completed, plan_type, isLoaded
│   └── navigationStore.ts     # Store Zustand: isNavigating + startNavigation()/stopNavigation() para el overlay de navegación
├── hooks/
│   ├── useEstadosMunicipios.ts
│   ├── useProfile.ts              # Carga y cachea el perfil completo del usuario (GET /users/me). Exporta updateProfileCache(), clearProfileCache() y el hook useProfile() → { data, isLoading }.
│   ├── useUpdateAvatar.ts         # PATCH de avatar: patchAvatar(avatarUrl) con isAvatarLoading.
│   ├── useUpdateProfile.ts        # PATCH de datos personales: patchProfile(payload) con isProfileLoading.
│   ├── useSyllabus.ts             # Carga y cachea el temario completo (GET /syllabus). Mapea name → subject/topic para TopicAccordion. → { data: SyllabusSubject[], isLoading }.
│   ├── useExam.ts                 # Gestiona sesión de examen y uso diario. Expone startExamSession(params), isLoading, session, dailyUsage, isUsageLoading, canQuickExam. Cachés de módulo: dailyUsageCache y sessionCache (este último persiste la sesión durante la navegación a /exam).
│   ├── useExamResult.ts           # Caché efímero en memoria para el resultado final de submitExam; habilita /exam-result solo tras Finalizar.
│   └── useQuickExamLogic.ts       # Lógica de UI del examen rápido: lee session de useExam, mapea ExamQuestion → MappedQuestion (snake_case→camelCase, exam_area desde ExamSession), gestiona currentIndex, answers, swipe, finish. exam_area viene de session.exam_area (nivel de sesión, no de pregunta).
├── lib/
│   ├── api/                   # Toda la capa de I/O con Supabase — SIEMPRE usar esto
│   │   ├── index.js           # Re-exporta todo: import { fn } from '@/lib/api'
│   │   ├── auth.js            # signInWithEmail, signInWithGoogle, signUp, signOut, getUser, getSession, onAuthStateChange
│   │   ├── client.js          # Fetcher base (solo cliente — NO usar en Route Handlers de servidor)
│   │   ├── profile.js         # getUserMe, getUserBasicInfo, patchUserMe, getProfile, updateProfile, updateAvatar
│   │   ├── exam.js            # startExam, getCurrentSession(exam_type) → GET /exams/active?exam_type=, getDailyUsage, getSimulacroUsege → GET /users/me/usage/simulacro, submitAnswer({ session_id, question_id, selected_answer }) → POST /exams/{session_id}/answer; submitExam(session_id) → POST /exams/{session_id}/submit; closeExam(exam_type) → POST /exams/close (body { exam_type }); getHint/getExplication
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
        └── examLogic.ts       # DailyUsage + SimulacroUsage (interfaces) + canTakeQuickExam(usage) → boolean (regla: quick_exams_remaining > 0)
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
| `animate-spinner-appear` | Fade-in con delay de 0.2s y fill `both` — anti-parpadeo del overlay de navegación: en navegaciones rápidas el spinner nunca llega a verse |

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
| | GET | `/users/me/usage/simulacro` |
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
| | GET | `/exams/active?exam_type=` |
| | POST | `/exams/{session_id}/answer` |
| | POST | `/exams/{session_id}/hint` |
| | POST | `/exams/{session_id}/explanation` |
| | POST | `/exams/{session_id}/submit` |
| | POST | `/exams/close` (body `{ exam_type }`) |

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
| `/home`, `/exam`, `/analytics`, `/profile`, `/program`, `/coming-soon`, `/initial-registration` (`PROTECTED_ROUTES`) | → `/login?redirect=<ruta>` | pasa (sujeto a la compuerta de onboarding) |
| `/login`, `/signup` (`AUTH_ROUTES`) | pasa | → `/home` |
| `/` (raíz) | → `/login` | → `/home` (sujeto a la compuerta de onboarding en la siguiente petición) |
| Todo lo demás (`/plans`, `/auth/callback`, estáticos) | pasa | pasa (sujeto a la compuerta de onboarding) |

**Compuerta de onboarding** (solo aplica si hay sesión): se basa en la cookie `onboarding` (`'done'` = onboarding completado).
- **Regla A** — sin cookie `onboarding` y la ruta NO es `/initial-registration` → redirige a `/initial-registration`. Fuerza a todo usuario nuevo a completar el registro inicial antes de usar la app.
- **Regla B** — con cookie `onboarding=done` e intento de volver a `/initial-registration` → redirige a `/home`. Evita re-hacer el onboarding ya completado.

La cookie `onboarding=done` la setean: el login (`setOnboardingCookie()`), el callback de `/auth/callback` (`redirectAfterProfile`), y se borra en el signOut (`clearOnboardingCookie()`).

#### Convención de atributos de la cookie `onboarding`

Todas las escrituras de esta cookie (cliente y servidor) usan los mismos atributos:

| Atributo | Valor | Por qué |
|---|---|---|
| `path` | `/` | Disponible en toda la app |
| `sameSite` | `'lax'` (NO `'strict'`) | El link de confirmación de email llega **cross-site** desde el cliente de correo → `'strict'` bloquearía la cookie en esa primera navegación y rompería la compuerta de onboarding |
| `secure` | **condicional** según entorno (NO `true` fijo) | `localhost` corre sobre **HTTP**; con `secure: true` fijo el navegador descarta la cookie en dev y el usuario queda atrapado en bucle hacia `/initial-registration` |

Cómo se evalúa el entorno para `secure` según dónde se escribe la cookie:
- **Cliente** (`utils/onboardingCookie.ts`): `hostname === 'localhost' \|\| '127.0.0.1'` → omite `Secure`
- **Servidor** (`auth/callback/route.js`): `process.env.NODE_ENV === 'production'` → `secure: true`

**Regla:** nunca usar `secure: true` fijo ni `sameSite: 'strict'` en cookies que participen en flujos cross-site (email) o que deban funcionar en dev.

Reglas críticas al modificar `proxy.ts`:
- Usar **`getUser()`** — nunca `getSession()` (getSession no verifica contra servidores de Supabase)
- Siempre devolver `supabaseResponse` (no un `NextResponse.next()` nuevo) para no romper el refresco de tokens
- Al redirigir, copiar cookies de `supabaseResponse` al redirect para preservar el token (helper `withCookies()`)

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
- Para links internos entre páginas usar **`<AppLink>`** (`src/components/AppLink.jsx`) en lugar de `<Link>` de `next/link` — enciende el overlay global de carga durante la navegación
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
  - `startExamSession({ exam_type, subtopic_id? })` → `{ data: ExamSession, error, status }` — llama a `POST /exams/start`; guarda el resultado en `sessionCache` antes de resolver
  - `continueCurrentSession(exam_type?)` → `{ data: ExamSession, error, status }` — llama a `GET /exams/active?exam_type=<tipo>`; guarda la sesión activa en `sessionCache`. El backend devuelve `answers_saved[]` con `{ question_id, selected_answer }`. **Importante:** `GET /exams/active` puede no devolver `exam_type` en el payload; por eso el hook inyecta el `exam_type` solicitado de forma autoritativa (`{ ...data, exam_type }`) para que `isSimulacro` (y la UI dependiente: botón Ayuda, frase de ayuda en `ResourcePanel`) sea consistente con el flujo de inicio desde cero. Sin el argumento, conserva lo que venga del backend.
  - `isLoading` — true mientras startExamSession o continueCurrentSession están en curso
  - `session: ExamSession | null` — sesión activa con `session_id`, `expires_at`, `exam_area?`, `exam_type?`, `questions[]` y opcionalmente `answers_saved[]`
  - `dailyUsage: DailyUsage | null` — `{ usage_date, quick_exams_count, hints_used_count, quick_exams_remaining, hints_remaining }`
  - `simulacroUsage: SimulacroUsage | null` — `{ simulacro_count, simulacro_remaining }` via `getSimulacroUsege()` (`GET /users/me/usage/simulacro`), con caché de módulo `simulacroUsageCache`
  - `isUsageLoading` — true hasta que llegue la respuesta de `GET /users/me/usage/daily`
  - `canQuickExam: boolean` — derivado de `canTakeQuickExam(dailyUsage)` en `examLogic.ts`
  - `timeRemaining: number` — segundos restantes calculados como `floor((expires_at - Date.now()) / 1000)`, actualizado cada segundo via `setInterval`. Se inicializa desde `sessionCache` para evitar salto en primer render.
  - Importante: `sessionCache` solo vive en memoria del runtime JS; no se persiste en storage ni se recupera desde backend. Mientras el runtime siga vivo, volver a `/exam` por historial adelante/atrás puede reconstruir la sesión desde `sessionCache`. Si hay recarga completa, cierre de pestaña o pérdida de runtime, `sessionCache` vuelve a `null` y `/exam` redirige a `/home`.
- **`useExamResult`**: `src/hooks/useExamResult.ts` — caché efímero de módulo para el resultado final de `submitExam`. Expone `setExamResult(result)`, `getExamResult()` y `clearExamResult()`. Guarda `{ result, message, session_id, finished_at }`, donde `result` incluye `score`, conteos, uso de pistas/explicaciones, tiempo y `breakdown[]`. No persiste en storage: al refrescar o abrir `/exam-result` directo, el caché queda `null` y la página redirige a `/home`.
- **`useQuickExamLogic`**: `src/hooks/useQuickExamLogic.ts` — lógica de UI del examen rápido consumida por `exam/page.jsx`. Lee `session` y `timeRemaining` de `useExam()`. Mapea cada `ExamQuestion` a `MappedQuestion` (snake_case→camelCase); `subject` usa `session.exam_area` y cae a `session.exam_type` cuando viene de `GET /exams/active`. Inicializa `answers` desde `session.answers_saved[]` para que una sesión continuada muestre preguntas ya contestadas como `Contestado`, las bloquee y marque NavExam; abre en la primera pregunta sin contestar. Gestiona `currentIndex`, `answers`, `selectedOption`, swipe táctil y `finishExam`. Flujo de respuesta: `handleContestar` (async) llama `submitAnswer` → guarda `{ isCorrect, correctAnswer, explanation }` en `answerResults[question_id]` → llama `saveAnswer`. Flujo de pista: `handleShowHint` (async) llama `getHint({ session_id, question_id })` → response `{ hint, detail, hint_available, count_hints }`; si `hint_available === true`, guarda `{ hint, countHints }` en `hintResults[question_id]`, muestra `revealHint` y `ResourcePanel` renderiza `Pistas usadas: count_hints`; si `hint_available === false`, cierra `HintBox` y abre `showHintLimitModal` con el mensaje de límite diario. Flujo de explicación directa: `handleExplicacionDirecta` llama `getExplication({ session_id, question_id })`, guarda `{ isCorrect: false, correctAnswer: '', explanation }`, llama `saveAnswer('-')` y se cuenta como incorrecta. `revealExplanation` se deriva de `answerResults` (se activa automáticamente al contestar o pedir explicación directa). `finishExam` (async) llama `submitExam` para obtener el resultado real, guarda el response completo en `useExamResult` y navega a `/exam-result`; usa `isFinishingRef` para prevenir doble llamada. Timer: `useEffect([timeRemaining])` dispara `finishExam('timeout', ...)` cuando llega a 0. Exporta además: `answerResults`, `hintResults`, `showHintLimitModal`, `submitError`, `isSubmitting`, `isHintLoading`, `isExplanationLoading`, `timeRemaining`.
- **`examLogic.ts`**: `src/utils/exam/examLogic.ts` — lógica pura de elegibilidad. `DailyUsage` interface + `canTakeQuickExam(usage): boolean` (regla: `quick_exams_remaining > 0`). El hook solo llama esta función; la decisión vive aquí.
- **`exam/page.jsx`**: usa `useQuickExamLogic`. Si `session` es null redirige a `/home`. La vista de examen no renderiza `NavBarDesktop` ni `NavBarMovile`: durante el examen solo se muestra la UI del examen. Muestra el timer `MM:SS` centrado en un div independiente arriba de las acciones (rojo al llegar a ≤60s). Debajo del timer muestra una fila con botón sutil `Salir del examen` (icono `LuArrowLeft`) y botón `Finalizar`. `Finalizar` llama `finishExam("manual", answers)`, que termina con `submitExam`, guarda el resultado en memoria y navega a `/exam-result`; ya no muestra `FinishedExamDashboard` como modal. `Salir del examen` usa `window.location.href = '/home'` para forzar navegación real y disparar `beforeunload`; no usa `router.push`. Mientras hay una sesión activa y `isExamFinished` es false, registra `beforeunload` para advertir al cerrar pestaña, recargar, escribir otra URL o salir del sitio. Limitación conocida: `beforeunload` no bloquea de forma fiable navegación SPA/historial interno de Next; con atrás/adelante del navegador, si `sessionCache` sigue en memoria, el usuario puede volver a `/exam`. Pasa `answerResult={answerResults[currentQ.id] ?? null}`, `hint={hintResults[currentQ.id]?.hint ?? currentQ.hint}` y `hintCount={hintResults[currentQ.id]?.countHints ?? ''}` a `ResourcePanel`, y `submitError`/`isSubmitting` a `QuestionPanel`. Pasa `isHelpDisabled={!!answers[currentQ.id]}` a `ExamHeader`: el botón Ayuda queda deshabilitado para esa pregunta tras `handleContestar` o `handleExplicacionDirecta` porque ambos escriben en `answers`; pedir pista no lo deshabilita. Renderiza `ExamHeader`, `QuestionPanel`, `ResourcePanel`, `HintBox`, modal de límite diario de pistas e `ImageModal`.
- **`exam-result/page.jsx`**: ruta protegida por sesión en `proxy.ts`, pero además requiere venir del flujo de `Finalizar`: lee `getExamResult()` y si es `null` hace `router.replace('/home')`. Mapea el response real de `submitExam` al shape que consumen `ResultQuestionsSummary` y `QuestionsBreakdown`: score sobre 10, correctas/incorrectas, `skipped_count` como parciales, tiempo total/promedio, y `breakdown[]` con respuesta seleccionada/correcta convertida de letra (`a`-`d`) a texto usando `options`. El botón `Continuar` de `ResultQuestionsHeader` llama `clearExamResult()` y `router.replace('/home')`, por lo que volver con historial a `/exam-result` redirige a home.
- **`ExamSelector` sesión activa**: si `startExamSession()` recibe `status === 409` (`You already have an active quick session.`), cierra el selector correspondiente y abre un modal de sesión activa con botones `Empezar nuevo` y `Continuar examen`. El estado `activeSessionSource` (`'quick'` | `'simulacro'`) guarda qué flujo disparó el modal: se setea a `'quick'` en `handleStart` y a `'simulacro'` en `handleSelectSimulacro`, y determina tanto el `exam_type` que se envía al backend como qué selector reabrir en `Empezar nuevo`. `Empezar nuevo` llama `closeExam(activeSessionSource)` (`POST /exams/close` con body `{ exam_type }`); si responde `204`, cierra el modal y vuelve a abrir el selector del origen (`ExamDescription` para quick, `ExamDescriptionSimulacro` para simulacro); si responde `404` u otro error, cierra el modal y muestra `No se pudo cerrar la sesión activa. Intenta de nuevo.`. `Continuar examen` llama `continueCurrentSession(activeSessionSource)` (`GET /exams/active?exam_type=`), guarda la sesión en `sessionCache` y navega a `/exam`; mientras carga muestra `Cargando...`. **Nota:** `activeSessionSource` hoy solo toma `'quick'`/`'simulacro'`; si se habilitan `seguimiento`/`libre`, setearlo antes de abrir el modal de sesión activa.
- **`ExamSelector` examen próximamente**: los botones `Examen de seguimiento` y `Examen Libre` (en sus instancias móvil y desktop) usan `onClick={handleComingSoon}`, que activa el estado `showComingSoon` y abre un modal `Recurso disponible próximamente` (icono `MdOutlineAccessTime`, mismo patrón visual que el modal de límite diario; botón `Entendido` y cierre al click en backdrop). `showComingSoon` está incluido en `modalOpen` (bloquea scroll del body) y se resetea en `closeAll()`. `Examen Rápido` mantiene su flujo intacto.
- **`ExamDescription`**: `src/components/exam/ExamDescription.jsx` — modal de configuración previa al examen. Selects en cascada (materia → tema → subtema) con datos de `useAvailableSyllabus`; la prop `show_subtopic` (default `true`) oculta el select de subtema cuando es `false`. Nombres largos se truncan a 70 chars con `clip()` + atributo `title` para tooltip. Sección "Tus intentos de hoy": `examsRemaining` patas (PiPawPrintFill) + `examsUsed` patas apagadas + conteo `X/N`; si `examsRemaining === 999` se muestra solo un icono de infinito (PiInfinityBold) sin patas ni conteo. Props: `onStart({ subtopic_id })` (llamado al click de Comenzar) e `isStarting` (muestra "Iniciando..." y deshabilita el botón mientras el fetch está en curso). Botón Comenzar deshabilitado (`bg-base-hard/60`) hasta que los selects requeridos tienen valor o mientras `isStarting`.
- **`ExamLivesBar`**: `src/components/homepage/ExamLivesBar.jsx` — dos tarjetas `LivesCard` en `/home` (grid 1/2 columnas): "Exámenes rápidos" (`quick_exams_remaining`/`quick_exams_count` de `dailyUsage`) y "Exámenes simulacro" (`simulacro_remaining`/`simulacro_count` de `simulacroUsage`). Cada tarjeta muestra patas PiPawPrintFill encendidas/apagadas + conteo `X/N`. Si `remaining === 999` (sentinela de ilimitado) se muestra PiInfinityBold en lugar de las patas; la prop `hideCountWhenUnlimited` (solo la tarjeta de rápidos la pasa) oculta además el conteo `X/N` en ese caso. Durante carga: 3 círculos con `animate-pulse`. Consume `useExam()`; la caché del hook evita doble fetch con ExamSelector.
- **Overlay de navegación (círculo de carga entre páginas)**: tres piezas — `store/navigationStore.ts` (Zustand: `isNavigating`), `components/AppLink.jsx` y `components/NavigationOverlay.jsx` (montado en el root layout, después de `AppProvider`). `AppLink` envuelve `next/link` y en su `onNavigate` (solo dispara en navegación SPA, no en ctrl+click ni `target="_blank"`) llama `startNavigation()` — salvo que el `href` apunte al `pathname` actual. El overlay (`fixed inset-0 z-[100] bg-base-dark/30` + spinner) se renderiza **encima de la página actual** mientras carga la destino, se apaga en el `useEffect` que observa `usePathname()` y tiene timeout de seguridad de 8s. Anti-parpadeo: todo el overlay usa `animate-spinner-appear` (delay 0.2s), así que en navegaciones rápidas nunca se ve. **No usar `loading.jsx`** para esto: esa convención reemplaza la página por la UI de carga (se ve como "otra página") en lugar de superponerla. Los navbars y los links de login/signup/profile/email-confirmation ya usan `AppLink`; `FinishedExamDashboard` (legacy) conserva `Link`. Los `router.push` programáticos con su propio indicador ("Iniciando...", "Cargando...") no encienden el overlay.
- **Animación acordeón (grid trick)**: para animar apertura/cierre de contenido sin JavaScript de medición, usar el patrón `grid-rows-[0fr]/[1fr]` con `transition-all`. El contenido **siempre está en el DOM**; el div exterior alterna entre las dos clases y el div interior lleva `overflow-hidden`. Usado en `TopicAccordion`.
- **Caché `.next` y cambios de rutas**: Next.js 16 usa Turbopack por defecto en dev y mantiene un caché persistente en `.next/dev/cache/turbopack/`. Si se reorganiza la estructura de rutas (ej. renombrar carpetas), ese caché queda corrupto y puede causar crash del sistema por agotamiento de RAM al arrancar `npm run dev`. Solución: borrar `.next/` antes de levantar el servidor. Quien tenga el proyecto localmente con la estructura anterior necesita hacer `rm -rf .next` una vez. Clones frescos no tienen este problema.
