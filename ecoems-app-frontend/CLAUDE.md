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
- Lenguaje de código: mezcla de **JS/JSX** (mayoría) y **TS** (solo utils/supabase)

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
│   │   └── TopicAccordion.jsx
│   ├── exam/                  # Componentes específicos de examen
│   │   ├── ExamOption.jsx
│   │   ├── ExamExplanation.jsx
│   │   └── ExamTypeButton.jsx
│   ├── homepage/
│   │   └── ExamSelector.jsx
│   └── profilepage/
│       └── AvatarSelector.jsx
├── store/
│   └── userStore.ts           # Store Zustand global: name, avatar_url, onboarding_completed, plan_type, isLoaded
├── hooks/
│   ├── useEstadosMunicipios.ts
│   ├── useProfile.ts              # Carga y cachea el perfil completo del usuario (GET /users/me). Exporta updateProfileCache(), clearProfileCache() y el hook useProfile() → { data, isLoading }.
│   ├── useUpdateAvatar.ts         # PATCH de avatar: patchAvatar(avatarUrl) con isAvatarLoading.
│   └── useUpdateProfile.ts        # PATCH de datos personales: patchProfile(payload) con isProfileLoading.
├── lib/
│   ├── api/                   # Toda la capa de I/O con Supabase — SIEMPRE usar esto
│   │   ├── index.js           # Re-exporta todo: import { fn } from '@/lib/api'
│   │   ├── auth.js            # signInWithEmail, signInWithGoogle, signUp, signOut, getUser, getSession, onAuthStateChange
│   │   ├── client.js          # Fetcher base (solo cliente — NO usar en Route Handlers de servidor)
│   │   ├── profile.js         # getUserMe, getUserBasicInfo, patchUserMe, getProfile, updateProfile, updateAvatar
│   │   ├── exam.js            # getQuestions, saveExamResult, getExamHistory
│   │   ├── analytics.js       # getUserStats, getSubjectStats, getTopSubjects, getWeakSubjects, getProgressHistory
│   │   └── subscription.js    # getSubscription, isPremium
│   └── data/
│       └── avatars.json       # Lista de avatares disponibles para el onboarding
└── utils/
    ├── supabase/
    │   ├── client.ts          # createBrowserClient — solo para lib/api (no usar directo en páginas)
    │   └── server.ts          # createServerClient con cookies (Server Components, proxy)
    ├── onboardingCookie.ts    # setOnboardingCookie() / clearOnboardingCookie()
    ├── ecoems_program.js      # Estructura del programa ECOEMS (materias > temas > subtemas)
    └── questions_examples.js  # Preguntas de ejemplo (datos mock)
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
| **Backend `localhost:8000`** | Todos los datos de la app | `profile`, `exam`, `analytics`, `subscription` |

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
- **Caché `.next` y cambios de rutas**: Next.js 16 usa Turbopack por defecto en dev y mantiene un caché persistente en `.next/dev/cache/turbopack/`. Si se reorganiza la estructura de rutas (ej. renombrar carpetas), ese caché queda corrupto y puede causar crash del sistema por agotamiento de RAM al arrancar `npm run dev`. Solución: borrar `.next/` antes de levantar el servidor. Quien tenga el proyecto localmente con la estructura anterior necesita hacer `rm -rf .next` una vez. Clones frescos no tienen este problema.
