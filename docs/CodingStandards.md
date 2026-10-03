# CodingStandards.md

Extends the ECC rules (`common/coding-style`, `typescript/coding-style`, `react/coding-style`, `web/coding-style`); this file records project-specific choices only.

- **TypeScript:** strict; no `any`; prefer `type` aliases and string-literal unions over `enum` (`erasableSyntaxOnly`); `import type` for types (`verbatimModuleSyntax`); exhaustive `switch` with `never` check; `as const` data + `satisfies`.
- **Immutability:** never mutate props/state/data; `toSorted`/`toSpliced`/spread; selectors return new arrays; data modules export `readonly` arrays (`as const` or `ReadonlyArray`).
- **React 19:** function components; no `React.FC`; hooks at top level (`rules-of-hooks` is an error in oxlint); derive state instead of syncing with effects; `useId` for label/ids; cleanup every listener/observer; refs for DOM only. Keep components pure; side effects in hooks.
- **Components:** one component per file; props typed inline or `Props` type; ≤200 lines (split otherwise); `className` merged via `cn()`; variants via `cva`; no copy or data imports in `components/ui`.
- **Styling:** Tailwind utilities + tokens only (no raw hex; no arbitrary colors except in WebGL presets); no inline `style` except dynamic CSS variables (`--mx/--my`); no CSS-in-JS; shared patterns become primitives, not repeated class strings (≥3 repeats).
- **Naming:** `components/ui/*` kebab-case files (shadcn), other components PascalCase files; hooks `use-*.ts`; data ids kebab-case; Spanish only in user-facing strings.
- **Errors:** validate at boundaries (data schema, URL params via whitelist parsing); never swallow errors; no `console.*` in committed code (oxlint `no-console` to be enabled in P1).
- **Comments:** explain *why*; match the Hero file's style (concise, explanatory). No commented-out code. TODOs must reference a task id.
- **Imports:** `@/` alias; order: react → third-party → `@/` → relative; no default exports except pages/sections where the router/consumers need them (Hero already default).
- **Files:** 200–400 lines typical, 800 max; functions <50 lines; nesting ≤4.
- **Dependencies:** justify in the commit body; prefer platform APIs.
- **Lint/format:** oxlint (`npm run lint`) is the gate; formatter decision (Prettier or oxfmt) taken in P1-T03 and recorded in `docs/Decisions.md` only if added.
- **Vendor component:** `halftone-nebula.tsx` is third-party-origin; changes limited to those in `docs/HeroAudit.md §Approved deviations`, each with a `// PORTFOLIO:` comment.
