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
├── app/
│   ├── layout.js              # Root layout (fuente Outfit, lang="es")
│   ├── globals.css            # Variables CSS del tema y base de Tailwind
│   ├── page.jsx               # Landing page (vacía por ahora)
│   ├── plans/page.jsx         # Comparación de planes freemium/premium
│   ├── auth/
│   │   └── callback/route.js  # Route Handler: intercambia code/token y crea perfil en backend
│   └── app/                   # Rutas protegidas de la aplicación
│       ├── login/page.jsx
│       ├── signup/page.jsx
│       ├── email-confirmation/page.jsx  # Pantalla post-registro (revisa tu correo)
│       ├── home/page.jsx      # Dashboard con selector de examen
│       ├── exam/page.jsx      # Examen activo con preguntas
│       ├── analytics/page.jsx # Estadísticas y progreso del usuario
│       ├── profile/page.jsx   # Perfil y configuración del usuario
│       └── program/page.jsx   # Programa de estudio ECOEMS
├── components/
│   ├── NavBarDesktop.jsx      # Navbar fijo superior (oculto en mobile)
│   ├── NavBarMovile.jsx       # Navbar fijo inferior (oculto en desktop)
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
├── lib/
│   └── api/                   # Toda la capa de I/O con Supabase — SIEMPRE usar esto
│       ├── index.js           # Re-exporta todo: import { fn } from '@/lib/api'
│       ├── auth.js            # signInWithEmail, signInWithGoogle, signUp, signOut, getUser, getSession, onAuthStateChange
│       ├── client.js          # Fetcher base (solo cliente — NO usar en Route Handlers de servidor)
│       ├── profile.js         # getProfile, updateProfile, updateAvatar
│       ├── exam.js            # getQuestions, saveExamResult, getExamHistory
│       ├── analytics.js       # getUserStats, getSubjectStats, getTopSubjects, getWeakSubjects, getProgressHistory
│       └── subscription.js    # getSubscription, isPremium
└── utils/
    ├── supabase/
    │   ├── client.ts          # createBrowserClient — solo para lib/api (no usar directo en páginas)
    │   └── server.ts          # createServerClient con cookies (Server Components, middleware)
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
- **Server Components / middleware**: usar `createClient()` de `@/utils/supabase/server`
- Métodos implementados: email/password y Google OAuth
- Facebook OAuth está en la UI pero sin implementar

### Flujo de registro completo

1. Usuario llena el form → `signUp()` llama a `supabase.auth.signUp()` con `emailRedirectTo: /auth/callback`
2. Supabase envía el correo de confirmación; `name` y `last_name` se guardan en `user_metadata`
3. `signUp()` retorna sin llamar al backend — solo redirige a `/app/email-confirmation`
4. Usuario hace clic en el link de su correo → llega a `/auth/callback`
5. El callback intercambia el `code` (PKCE) o `token_hash` (OTP) por una sesión
6. El callback llama a `POST /users/me` con el JWT y los datos de `user_metadata`
7. `201` o `409` (perfil ya existía) → redirect a `/app/home`
8. Cualquier otro error → redirect a `/app/signup?error=profile_creation_failed`

**Detección de email duplicado en `signUp()`:**
- Sin confirmación de email: Supabase retorna `error.message === 'User already registered'`
- Con confirmación de email: Supabase finge éxito pero `data.user.identities` llega vacío (`[]`)
- Ambos casos retornan un mensaje amigable en español

## Convenciones de código

- Todos los componentes son **funcionales** con hooks (`useState`, `useEffect`)
- Sin gestión de estado global (no Redux, no Zustand, no Context)
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

- **React Compiler está activo**: evitar patrones que rompan las reglas de React (efectos en el render, mutaciones de estado directas)
- **Tailwind v4**: no existe `tailwind.config.js`; cualquier extensión del tema va en `globals.css` con `@theme inline`
- **NavBars fijos**: usar `<MarginTop />` y `<MarginBottom />` en páginas protegidas para compensar el espacio de los navbars fijos
- **Next.js 16**: tiene breaking changes respecto a versiones anteriores — consultar `node_modules/next/dist/docs/` antes de usar APIs de Next.js
- **`api` client solo en cliente**: `src/lib/api/client.js` no funciona en Route Handlers de servidor; usar `fetch` directo con `session.access_token`
