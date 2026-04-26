# Migración de página Signup: app-frontend → landing

## Contexto

La página de registro (`/signup`) existía en `ecoems-app-frontend` (rama `developer`) y se migró al proyecto `ecoems-landing` (rama `landing`) sin romper funcionalidad ni alterar la interfaz visual.

---

## Archivos creados o modificados

### 1. `src/app/signup/page.tsx` *(nuevo)*

Página de registro. Es la traducción directa de `ecoems-app-frontend/src/app/app/signup/page.jsx` a TypeScript. Los cambios mínimos necesarios para el contexto de Next.js 15 con TypeScript:

- Tipado de eventos (`React.FormEvent<HTMLFormElement>`) y elementos del formulario con `as HTMLInputElement`
- `createClient()` se instancia dentro del handler (no en el cuerpo del componente) para evitar que Next.js intente inicializar Supabase durante el prerenderizado estático en build
- Ruta de redirección cambiada de `/app/login` → `/login` para coincidir con las rutas del landing
- Se eliminó el estado `passwordValue` que existía en el original pero nunca se leía (TypeScript lo marcaba como error)

Todo lo demás es igual: validación de contraseña, toggle de visibilidad, registro con Supabase Auth, alertas de error, y todas las clases Tailwind.

### 2. `src/utils/supabase/client.ts` *(nuevo)*

```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
```

Usa `@supabase/ssr` en lugar de `@supabase/supabase-js` directo, que es el patrón recomendado para Next.js App Router.

### 3. `tailwind.config.ts` *(modificado)*

Se añadieron los tokens de diseño del app-frontend que la página usa:

```ts
fontSize: {
  standard: '15px',
},
borderRadius: {
  'box-standard': '18px',   // rounded-box-standard
},
colors: {
  base: {
    DEFAULT: '#EEE4C1',      // bg-base
    hard: '#CDAD75',
    'hard-alt': '#D9AF72',
    soft: '#FFF9E4',         // bg-base-soft
    dark: '#472E18',         // bg-base-dark, text-base-dark
  },
  'text-bottom-soft': '#A7A7A7',  // text-text-bottom-soft
},
```

Estos tokens van en `theme.extend` para no pisar los colores existentes del landing (shadcn/ui).

### 4. `package.json` *(modificado)*

Dependencias agregadas:

| Paquete | Versión | Motivo |
|---|---|---|
| `@supabase/supabase-js` | `^2.50.5` | Cliente de Supabase |
| `@supabase/ssr` | `^0.6.1` | Wrapper SSR para Next.js App Router |
| `react-icons` | `^5.6.0` | Iconos `IoEyeOutline` / `IoEyeOffOutline` usados en el toggle de contraseña |

### 5. `public/backgrounds/login-bg-long.png` *(nuevo)*

Imagen de fondo para la vista desktop (`lg:bg-[url('/backgrounds/login-bg-long.png')]`). Copiada desde `ecoems-app-frontend/public/backgrounds/`.

---

## Variables de entorno requeridas

Agregar en `ecoems-landing/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
```

Se obtienen desde: **Supabase Dashboard → Project Settings → API**.

---

## Ruta en el landing

La página queda disponible en: `https://ecogo.mx/signup`

El link "Inicia sesión" apunta a `/login`. Si esa ruta no existe aún en el landing, deberá crearse.
