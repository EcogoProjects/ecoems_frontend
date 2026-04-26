# ecoems-landing

Public-facing landing site for ECOGO — the study app for the ECOEMS 2026 exam.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + `tailwindcss-animate` |
| UI components | shadcn/ui (base: slate, CSS variables) |
| Server state | TanStack Query |
| Font | System sans-serif via Tailwind |

## Commands

All commands must be run from the `ecoems-landing/` directory.

```bash
npm install       # install dependencies
npm run dev       # development server at http://localhost:3000
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
```

## Project structure

```
src/
  app/                  # Next.js App Router pages
    layout.tsx          # root layout — providers, global CSS
    page.tsx            # / redirects to /inicio
    inicio/page.tsx     # main landing page
    como-funciona/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    not-found.tsx
  components/
    shared/             # layout-level components (Navbar, Footer, etc.)
    inicio/             # sections for /inicio
    como-funciona/      # sections for /como-funciona
    blog/               # sections for /blog
    ui/                 # shadcn/ui primitives
  data/
    blog-posts.ts       # static blog content — add posts here
  lib/
    utils.ts            # cn() class merge utility
```

## Path alias

`@` resolves to `src/`. Example: `import Navbar from '@/components/shared/Navbar'`.

## Rendering model

Pages and section components are **Server Components** by default. Mark components `'use client'` only when they use browser APIs, event handlers, or React hooks. Keep the client boundary as deep in the tree as possible.

## Adding blog posts

Open `src/data/blog-posts.ts` and add a new object to the `blogPosts` array following the existing `BlogPost` shape. The entry appears automatically in the grid and generates a static page at build time via `generateStaticParams`.

## Images

Use `next/image` for all local assets. Importing a PNG returns a `StaticImageData` object, not a string — pass it directly to the `src` prop. Assets live in `src/assets/`.

## Security headers

HTTP security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, etc.) are applied globally in `next.config.ts`.
