# Rules.md — Non-negotiable project rules

Violating any rule requires an explicit, documented exception in `docs/Decisions.md` approved by the user.

## Visual truth
1. The Hero (`client/src/sections/hero/HeroSection.tsx` + `halftone-nebula.tsx` preset `abyssal`) is the visual and conceptual source of truth. Evidence: `docs/HeroAudit.md`.
2. Before writing any visual element, answer the 10 questions of `docs/UI.md §Consistency checklist` in the PR/commit notes. New visuals must use tokens, never raw hex.
3. Do not restyle the Hero. Only the fixes listed in `docs/HeroAudit.md §Approved deviations` are allowed.
4. One animation system: Hero WebGL + CSS derivatives. No new animation library, no second WebGL canvas without an ADR (ADR-005) containing measured cost.
5. Dark-only. No light theme, no theme toggle.

## Content integrity
6. Never invent credentials, employers, clients, certifications, metrics, performance numbers, users, revenue, quotes. Missing facts → `[[PLACEHOLDER: what is needed]]` in data and listed in `docs/ContentStrategy.md`.
7. Production build must fail while placeholders remain (Phase 6 gate).
8. UI copy is Spanish (`lang="es"`); code, comments, docs, commits are English.

## Architecture
9. Static-first. No backend work unless ADR-004 is reopened by the user.
10. Project data is typed local TS. No runtime GitHub API calls.
11. Presentation components never contain project/profile copy; copy lives in `client/src/data/`.
12. No new dependency without a one-line justification in the commit body and an entry in `README.md`/`Progress.md`. Prefer platform/CSS over libraries.
13. `@/` alias for `client/src`. Files ≤400 lines typical, 800 hard max. Functions <50 lines.

## Quality
14. TypeScript strict, no `any`, no `@ts-ignore` (use `@ts-expect-error` with reason only in tests).
15. Immutability: no mutation of props/state/data arrays; return new objects.
16. TDD for logic (schema, filters, selectors, hooks): test first. UI primitives get at least a render + a11y test.
17. ≥80% coverage on non-WebGL code. `halftone-nebula.tsx` is excluded and covered by a smoke e2e.
18. Accessibility is a gate, not a polish item (WCAG 2.2 AA, `docs/Accessibility.md`). Reduced motion must be honored everywhere; no pointer-only interaction.
19. Performance budgets in `docs/Performance.md` are gates.

## Security
20. No secrets in repo or history. No `dangerouslySetInnerHTML` with non-static content. External links use `rel="noopener noreferrer"`. Validate any URL in data (https only).
21. If a security issue is found: stop, use `security-reviewer`, fix CRITICAL/HIGH first.

## Git
22. Never work on `main`. One branch per phase (`phase/NN-name`). `main` receives only `--no-ff` merges of finished phases (plus the baseline commit).
23. ≥15 meaningful Conventional Commits per phase (`feat|fix|refactor|docs|test|chore|perf|ci: …`). Each commit builds and typechecks.
24. Never `--no-verify`, never force-push shared branches, never commit `dist/` or `node_modules/`.

## Process
25. Follow the document hierarchy in `CLAUDE.md`. Load only the current phase's Required Reading and ECC resources (`/ecc-load-phase`).
26. Use installed skills/agents/commands instead of hand-rolling what they do (e.g., `seo`, `a11y-architect`, `e2e-runner`).
27. A phase is done only when `DefinitionOfDone.md` passes, `Progress.md` and `.claude/New_files.md` are updated, and the working tree is clean.
28. Do not implement work from a later phase early. If a dependency is missing, record it in `Progress.md → Blocked`.
