# FolderStructure.md

Current (verified 2026-10-02) vs target. `[new]` = created by a phase.

```text
/
├── CLAUDE.md  Plan.md  Tasks.md  Rules.md  DefinitionOfDone.md  Progress.md
├── README.md  master_plan_promt.md  promt_hero_section.md        (kept as history)
├── .gitignore                         [new P1]
├── .github/workflows/ci.yml           [new P1]
├── .claude/                           phase-plan.json · New_files.md · (activated resources, settings.local.json ignored)
├── docs/                              Architecture · FolderStructure · UI · HeroAudit · CodingStandards · Testing
│                                      Security · Performance · Accessibility · SEO · ContentStrategy
│                                      ProjectShowcase · DevelopmentWorkflow · Decisions · assets/
├── client/            (Phase 1 added: vitest.config.ts, playwright.config.ts, tests/e2e, src/test, src/dev, src/hooks, src/components/layout)
│   ├── index.html  vite.config.ts  components.json  tsconfig*.json  .oxlintrc.json
│   ├── vitest.config.ts  playwright.config.ts         [new P1]
│   ├── public/  favicon.svg · og.png [P6] · robots.txt [P6] · sitemap.xml [P6] · cv/ [P5] · projects/<slug>/ [P4]
│   ├── scripts/  prerender.mjs · check-placeholders.mjs · check-links.mjs     [P6]
│   ├── tests/    e2e/*.spec.ts                        [P1+]
│   └── src/
│       ├── main.tsx  App.tsx  index.css
│       ├── app/         router.tsx · Layout.tsx                [P2]
│       ├── pages/       HomePage · ProjectsPage · ProjectDetailPage · NotFoundPage   [P2–P5]
│       ├── sections/    hero/ (exists) · about/ · technologies/ · projects/ · contact/
│       ├── components/
│       │   ├── ui/      button.tsx · halftone-nebula.tsx (exist) · eyebrow · action-link · dot-grid · glow-card · reveal · badge · copy-button · external-link · social-links
│       │   ├── layout/  Section · Container · SkipLink · SiteHeader · MobileMenu · SiteFooter
│       │   └── projects/ ProjectCard · FeaturedProjects · ProjectFilters · ProjectGrid · ProjectHeader · Gallery · Lightbox …
│       ├── data/        profile.ts · technologies.ts · projects.ts · project.schema.ts
│       ├── dev/         KitPage.tsx · dev-only /__kit gallery, behind import.meta.env.DEV      [P1]
│       ├── test/        setup.ts · axe.ts (vitest setup and axe helper)                         [P1]
│       ├── hooks/       use-reduced-motion · use-in-view [P1] · use-filter-params
│       └── lib/         utils.ts (exists) · projects.ts · seo.ts · email.ts · media.ts
└── server/              src/index.ts (empty, deferred) · tsconfig.json · package.json
```
Rules: tests colocated as `*.test.ts(x)` next to source; e2e under `client/tests/e2e/`; kebab-case for `components/ui` (shadcn convention), PascalCase for other components; no barrel files; `dist/`, `coverage/`, `playwright-report/` ignored. Update this file in the commit that moves/creates a top-level directory.
