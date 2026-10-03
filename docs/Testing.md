# Testing.md

Extends ECC `common/testing`, `typescript/testing`, `react/testing`, `web/testing`.

## Strategy (pyramid)
| Layer | Tool | Targets |
|---|---|---|
| Unit | Vitest | `lib/*` selectors/filters/seo/email, schema validators, hooks (`use-reduced-motion`, filter params) |
| Component | Vitest + Testing Library + jsdom (+ `jest-axe`-style assertions via axe-core) | primitives, ProjectCard, filters, nav/mobile menu, contact/copy button |
| Data integrity | Vitest | `projects.ts`/`technologies.ts`/`profile.ts` validate against schema; unique slugs/ids; https URLs; alt text; featured order |
| E2E | Playwright (Chromium; Phase 6 adds Firefox + WebKit) + `@axe-core/playwright` | Hero smoke, nav keyboard, filters + URL state, deep links, gallery, contact, 404 |
| Visual | Playwright screenshots (manual compare, stored in `docs/assets/`) | Hero must not change except approved deviations |
| Perf | Lighthouse CLI (Phase 4 spot, Phase 6 gate) | budgets in `docs/Performance.md` |

## Rules
- TDD for logic: RED test first (`tdd-workflow`/`tdd-guide`), then minimal code, then refactor.
- Query by role/label (Testing Library); no `data-testid` unless no accessible handle exists.
- jsdom has no WebGL: mock `HalftoneNebula` in component tests; the Hero is covered by a Playwright smoke (canvas present, no console error, reduced-motion emulation renders a static frame).
- Coverage ≥80% lines/branches on `src/**` excluding `components/ui/halftone-nebula.tsx`, `main.tsx`, `*.d.ts`, test files. Excluded file must carry a comment with the reason.
- Emulate `prefers-reduced-motion` in tests for every animated component.
- No snapshot tests of large DOM trees; no skipped tests without a linked task.
- Playwright runs against `vite preview` of the production build.

## Scripts (target, created in P1)
`npm test` (vitest run) · `npm run test:watch` · `npm run test:coverage` · `npm run test:e2e` · `npm run check` (= typecheck + lint + test + build).

## Browser validation (manual, per phase)
Use Chrome MCP at 375/768/1024/1440/1920: console clean, keyboard walkthrough, reduced-motion toggle (DevTools rendering emulation), throttled CPU for Hero smoothness; record findings in `Progress.md`.
