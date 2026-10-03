# Architecture.md

## Overview
Static-first SPA. `client/` is the product; `server/` is an empty, deferred package (ADR-004).

```text
Browser ── React 19 SPA (Vite build) ── static host (CDN)
              │
              ├─ Hero: HalftoneNebula (WebGL2, self-contained, no assets)
              ├─ Sections/pages read typed data: src/data/{profile,technologies,projects}.ts
              └─ Router: / , /proyectos , /proyectos/:slug , *
(no runtime network calls; no GitHub API; no backend)
```

## Stack (verified from package.json, 2026-10-02)
React 19.2, TypeScript ~6.0 (strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnused*`), Vite 8 + `@vitejs/plugin-react`, Tailwind 4.3 via `@tailwindcss/vite`, shadcn 4 `base-nova` on `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `lucide-react`, `@fontsource-variable/geist`, oxlint (react, typescript, oxc plugins). `server`: Node, TypeScript ^7 (`nodenext`), tsx, oxlint.
Planned additions (justify at install time): `react-router`; Vitest, `@testing-library/react`, `jsdom`; Playwright, `@axe-core/playwright`; `@fontsource-variable/geist-mono`; prerender tool (Phase 6, ADR-006); `sharp` (dev-time image script, Phase 4).

## Layers (client)
```text
data/          typed content (profile, technologies, projects) + schema   ← only place with copy
lib/           pure logic (selectors, filters, seo, email) — fully unit-tested
hooks/         use-reduced-motion, use-in-view, use-filter-params …
components/ui/ primitives (shadcn + Hero-style) — no copy, no data imports
components/<domain>/ composed UI (projects, layout)
sections/      home sections (hero, about, projects, technologies, contact)
pages/         route components (compose sections/components, set title/meta)
app/           router + layout shell
```
Dependency direction: `pages → sections → components → lib/hooks → data(types only)`. `components/ui` never imports `data`. Data imports nothing from UI.

## Routing (ADR-002)
`react-router` (library/declarative mode). Home sections are in-page anchors (`#sobre-mi`, `#proyectos`, `#tecnologias`, `#contacto`); from other routes nav links use `/#anchor`. Route components are lazy in Phase 6. Hash scroll + focus management in `Layout`. Host must serve `index.html` for unknown paths until prerender produces per-route HTML (ADR-006).

## Data (ADR-003)
Local typed TS modules, validated at test time (and in a dev-time assertion). Project fields: `docs/ProjectShowcase.md`. GitHub is linked, not queried. An optional later script (`scripts/sync-github.mjs`) could snapshot repo metadata into a generated JSON — **not planned** unless the user asks.

## Backend decision (ADR-004): DEFERRED
No feature requires server code: contact uses `mailto:`, copy button and social links; project content is static; analytics not required. Adding a form would introduce spam handling, secrets, rate limiting, hosting and privacy obligations for little value. Revisit only if the user explicitly wants a form/CMS/analytics; then write an ADR first, choose the minimal option (third-party form endpoint before custom server), and execute under Phase 5 rules. `server/` keeps compiling (typecheck/lint/build in CI) so it stays ready.

## WebGL policy (ADR-005)
Only the Hero uses WebGL. Reasons: one extra GL context costs GPU memory/battery on mobile; the identity transfers via CSS dot grid + glow + typography. The Hero already pauses offscreen/hidden. In Phase 6 the Hero chunk is lazy-loaded behind an immediate CSS-gradient placeholder with identical palette to avoid LCP/CLS impact.

## Error handling
Route-level `errorElement` (in-theme). Data problems fail tests/CI, not users. WebGL failure → themed fallback in Hero.

## Build & delivery
`vite build` → static `dist/` (not committed). CI: typecheck, lint, test, build, (Phase 6) e2e, Lighthouse, deploy. Host chosen by user (open question).
