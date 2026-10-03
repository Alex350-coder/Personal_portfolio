# DefinitionOfDone.md — Project-wide completion criteria

A phase is **not** done because the UI looks right. Every box below must be true (or explicitly N/A with a reason in `Progress.md`).

## Per-phase gate
- [ ] All tasks of the phase in `Tasks.md` ticked; acceptance criteria in `Plan.md` met and evidence recorded in `Progress.md`.
- [ ] `cd client && npm run typecheck && npm run lint && npm test && npm run build` pass; `cd server && npm run typecheck && npm run lint && npm run build` pass.
- [ ] `/quality-gate` and `/test-coverage` run; coverage ≥80% on non-WebGL code.
- [ ] `code-reviewer` run over the files listed for the phase in `.claude/New_files.md` (+ modified files); CRITICAL/HIGH resolved.
- [ ] `security-reviewer` run when input/links/data/config changed; CRITICAL/HIGH resolved.
- [ ] `Progress.md`, `.claude/New_files.md` and any doc named in the phase's "Documentation Updates" are current.
- [ ] ≥15 meaningful Conventional Commits on `phase/NN-*`; none on `main`; working tree clean; merged `--no-ff`.

## Functionality
- [ ] Every link, anchor, route and control works; no dead `#anchors`; unknown routes show the in-theme 404.
- [ ] No console errors/warnings in production build; no unhandled promise rejections.
- [ ] WebGL failure path renders the themed fallback.

## Visual consistency
- [ ] The 10-question checklist (`docs/UI.md`) answered for each new section.
- [ ] Only tokens used (no raw hex outside token definitions/WebGL presets); radius/borders/type match Hero language.
- [ ] No competing animation system; deviations logged in `docs/Decisions.md`.

## Responsiveness
- [ ] Verified at 375, 768, 1024, 1440, 1920 (Phase 6 adds 320, 2560, landscape); no horizontal scroll; content readable over any background.

## Accessibility (WCAG 2.2 AA)
- [ ] Semantic landmarks/headings (one `h1` per route), skip-link, visible focus, keyboard-complete.
- [ ] axe: 0 serious/critical; contrast ≥4.5:1 (3:1 large text/UI).
- [ ] `prefers-reduced-motion` honored; auto-playing motion >5 s has a pause control; nothing depends on pointer movement alone.

## Performance
- [ ] Budgets in `docs/Performance.md` met; bundle size recorded; offscreen WebGL paused; images sized/lazy.

## Security
- [ ] No secrets; external links `rel="noopener noreferrer"`; URLs in data are https; no `dangerouslySetInnerHTML` on dynamic content; `npm audit --omit=dev` clean of high/critical (Phase 6 hard gate).

## Testing
- [ ] Unit tests for logic, component tests for primitives/sections, Playwright for critical flows; tests were written first for logic; no skipped tests without a linked reason.

## Documentation
- [ ] Docs match reality (no stale paths/names); ADR written for any architectural change.

## Git quality
- [ ] Commit messages Conventional, one logical unit each, each commit builds; no `dist/`, `node_modules/`, `.env`.

## Content integrity
- [ ] No invented facts or metrics; placeholders explicit and registered; (Phase 6) none remain in production build.

## Production readiness (Phase 6 / v1.0.0)
- [ ] Lighthouse thresholds from `Plan.md` Phase 6; SEO artifacts present; security headers live; deployed URL smoke-tested; `v1.0.0` tagged.
