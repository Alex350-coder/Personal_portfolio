# Portafolio personal — proyectos web y software

Monorepo simple con frontend y backend separados e independientes.

```text
/
├── client/   # Interfaz (React + TypeScript + Vite + Tailwind + shadcn/ui)
└── server/   # Backend/API futura (Node + TypeScript), por ahora vacío
```

## Ejecutar

```bash
# Frontend  (http://localhost:5173)
cd client
npm install
npm run dev

# Backend (sin endpoints todavía)
cd server
npm install
npm run dev
```

## Verificación

En `client/` y `server/`:

```bash
npm run typecheck
npm run lint
npm run build
```

## Tecnologías

- **client**: React 19, TypeScript estricto, Vite, Tailwind CSS v4, shadcn/ui (base-nova), lucide-react. Alias `@/` → `client/src`.
- **server**: Node, TypeScript estricto (`nodenext`), tsx (dev), oxlint.

## Hero Section

- `client/src/components/ui/halftone-nebula.tsx`: componente reutilizable WebGL2 (copiado del original; único cambio: `join("\n")` restaurado, llegó con un salto de línea literal que rompía la compilación).
- `client/src/sections/hero/HeroSection.tsx`: Hero del portafolio, usa `HalftoneNebula` (preset `abyssal`) como fondo. Nombre, rol y descripción son **placeholders** (constante `PROFILE`) a reemplazar. Los botones apuntan a los anchors `#proyectos` y `#contacto` (secciones aún no creadas).
- `client/src/App.tsx` renderiza `HeroSection`.

## Dependencias agregadas (client)

`tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `clsx`, `tailwind-merge`, y las que añade el CLI de shadcn (`class-variance-authority`, `@base-ui/react`, `tw-animate-css`, `shadcn`, `@fontsource-variable/geist`). Dev (server): `typescript`, `tsx`, `@types/node`, `oxlint`.

## Planificación y documentación

Fuente de verdad: `Plan.md` (6 fases). Contexto operativo para Claude Code: `CLAUDE.md`. Orden de lectura: `CLAUDE.md → Rules.md → Plan.md → Tasks.md → DefinitionOfDone.md`. Estado: `Progress.md`. Datos verificados del dueño y de sus repos: `docs/ProfileData.md`. Detalle técnico en `docs/` (Architecture, UI, HeroAudit, Accessibility, Performance, SEO, Security, Testing, ContentStrategy, ProjectShowcase, DevelopmentWorkflow, Decisions). Recursos ECC por fase: `.claude/phase-plan.json`; archivos nuevos por fase: `.claude/New_files.md`.
