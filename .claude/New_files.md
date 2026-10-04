# Phase 1
Created on `phase/01-foundation` (review these first; modified files via `git diff main...HEAD --stat`).

## Root / CI
- .gitignore
- .github/workflows/ci.yml
- docs/assets/hero-baseline/hero-{375,768,1440}-{motion,reduced}.png

## client — tooling
- client/vitest.config.ts
- client/playwright.config.ts
- client/src/test/setup.ts
- client/src/test/axe.ts
- client/tests/e2e/hero.spec.ts
- client/tests/e2e/kit-excluded.spec.ts
- client/tests/e2e/kit.dev.spec.ts

## client — source
- client/src/hooks/use-reduced-motion.ts (+ .test.ts)
- client/src/hooks/use-in-view.ts (+ .test.tsx)
- client/src/components/layout/Container.tsx (+ test)
- client/src/components/layout/Section.tsx (+ test)
- client/src/components/layout/SkipLink.tsx (+ test)
- client/src/components/ui/eyebrow.tsx (+ test)
- client/src/components/ui/action-link.tsx (+ test)
- client/src/components/ui/dot-grid.tsx (+ test)
- client/src/components/ui/reveal.tsx (+ test)
- client/src/components/ui/glow-card.tsx (+ test)
- client/src/dev/KitPage.tsx (+ test) — dev-only, not in the production build
- client/src/lib/utils.test.ts
- client/src/sections/hero/HeroSection.test.tsx

## Modified (not new)
client/src/index.css, client/src/App.tsx, client/src/lib/utils.ts, client/src/components/ui/button.tsx, client/src/components/ui/halftone-nebula.tsx (id/labelledBy/label/paused props, preset-derived fallback, resume-without-jump clock), client/src/sections/hero/HeroSection.tsx, client/package.json, client/tsconfig.app.json, client/tsconfig.node.json, docs/HeroAudit.md, docs/UI.md, docs/FolderStructure.md, README.md, Progress.md, Tasks.md
