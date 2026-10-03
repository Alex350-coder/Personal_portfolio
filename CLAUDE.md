# CLAUDE.md — Portfolio personal (operational context)

## Purpose
Personal developer portfolio (Spanish UI) that proves skills with real projects: who I am, what I build, stack, projects, how to inspect code (GitHub), how to contact. Projects/evidence over decoration. **No invented facts** (see `Rules.md` §Content integrity).

## Architecture (current)
Monorepo, two independent packages — details: `docs/Architecture.md`, `docs/FolderStructure.md`.
- `client/` React 19, TypeScript strict (~6.0), Vite 8, Tailwind v4 (`@theme`), shadcn `base-nova` (`@base-ui/react`), lucide, oxlint. Alias `@/` → `client/src`.
- `server/` Node + TS, **empty and deferred** (ADR-004). Do not add backend code without the user reopening ADR-004.
- Not yet a git repo at planning time → Phase 1 task P1-T01 initialises it.

## Visual source of truth: the Hero
`client/src/sections/hero/HeroSection.tsx` + `client/src/components/ui/halftone-nebula.tsx` (WebGL2, preset `abyssal`: teal on near-black, mono uppercase tracked labels, square 0-radius controls, halftone/pixel grid, pointer lamp, sparkles). Everything else must look made by the same system. Audit: `docs/HeroAudit.md`; tokens/patterns/checklist: `docs/UI.md`. Do not restyle the Hero; do not add another WebGL canvas without an ADR.

## Document hierarchy (read in this order)
```
CLAUDE.md → Rules.md → Plan.md → [Required Reading of current phase] → Tasks.md → DefinitionOfDone.md → implementation
```
`Progress.md` = current state. `.claude/New_files.md` = files introduced per phase (auto-maintained by hook `always__track-new-files`; review only these + modified files). `.claude/phase-plan.json` = ECC resources per phase. `docs/Decisions.md` = ADRs. `docs/ProfileData.md` = verified owner identity, stack and repo inventory (read before writing any profile/project copy).

## Phase workflow (6 phases, branches `phase/NN-name`)
1. `git switch main && git switch -c phase/NN-name` (never commit on `main`).
2. `/clear` → `/ecc-load-phase phase-N` → read that phase's Required Reading in `Plan.md` (only those).
3. Execute `Tasks.md` in order; **one task = one commit**, ≥15 commits/phase, Conventional Commits (`docs/DevelopmentWorkflow.md`).
4. Gate: `DefinitionOfDone.md` (typecheck, lint, test, build, browser/responsive/a11y/perf/security checks).
5. Update `Progress.md` + `.claude/New_files.md`; clean tree; merge `--no-ff`; next phase.

## Commands
```bash
cd client && npm run dev | typecheck | lint | test | build   # dev at :5173
cd server && npm run typecheck | lint | build                # no endpoints yet
```

## ECC resource usage
Use installed resources instead of hand-rolling: planning → `planner`/`architect`; logic → `tdd-guide` + `tdd-workflow`; UI → `frontend-design-direction`, `motion-ui`; review → `code-reviewer` (always), `react-reviewer`, `typescript-reviewer`; a11y → `a11y-architect`; perf → `performance-optimizer`; SEO → `seo`/`seo-specialist`; e2e → `e2e-runner`/`e2e-testing`; security → `security-reviewer`, `/security-scan`. Per-phase lists are explicit in `Plan.md`; never "load everything". Browser validation: Chrome MCP (claude-in-chrome) and Playwright. External design skills (`ui-ux-pro-max`, etc.) are inspiration only; Hero tokens override.

## Content decisions (owner, 2026-10-03 — `docs/ProfileData.md §7`, ADR-008)
Name: Ander Alexander Aguirre Tejada · headline "Desarrollador full-stack · Seguridad" · **never mention certifications** · be transparent that many systems are built with AI assistance, never claim solo authorship · excluded repos: Italian_restaurant, Land_Rover · Dota_2_gambling index-only · Hero copy is already real (no placeholders).

## Critical reminders
- UI copy Spanish; code/docs/commits English. Dark-only theme.
- Copy lives in `client/src/data/*`, not in components. Placeholders are `[[PLACEHOLDER: …]]`.
- No new dependency without justification. Prefer CSS over JS/WebGL. Respect `prefers-reduced-motion`; provide pause for autoplay >5 s.
- Update the relevant doc in the same commit as the change that makes it stale.
