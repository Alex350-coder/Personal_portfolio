# Performance.md

Extends ECC `common/performance`, `web/performance`. WebGL Hero ⇒ performance is a first-class gate.

## Baseline (2026-10-02)
JS 274 KB raw / 86 KB gzip (single chunk), CSS 27.5 KB, Geist latin woff2 29 KB (+4 other subsets). No images.

## Budgets (production build, mobile emulation: 4× CPU, Fast 4G)
| Metric | Budget |
|---|---|
| LCP | ≤ 2.5 s (Hero text/heading is the LCP element, not the canvas) |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |
| TBT (lab) | ≤ 200 ms |
| Initial JS (gzip) | ≤ 200 KB; non-Hero route chunks ≤ 60 KB each |
| CSS | ≤ 40 KB gzip |
| Fonts | ≤ 2 families; latin subset preloaded; `font-display: swap`; each file ≤ 40 KB |
| Images | ≤ 200 KB each (hero/cover ≤ 120 KB mobile), AVIF/WebP + fallback, width/height set, `loading=lazy` below fold, `decoding=async` |
| Lighthouse (mobile) | Perf ≥ 85, A11y 100, BP ≥ 95, SEO 100; desktop Perf ≥ 95 |

## Animation/WebGL policy
- Hero: keep `maxDpr ≤ 1.5` (consider 1.25 on low-end/coarse pointer), pause offscreen and when `document.hidden` (already implemented — verify in P6), single GL context for the whole site, release on unmount, themed CSS fallback.
- Phase 6: lazy-load the Hero's GL code after first paint with a palette-identical CSS placeholder; verify no layout shift.
- Other sections: CSS only (transform/opacity; no layout-triggering animation); `will-change` only during an active animation; IntersectionObserver instead of scroll listeners; pointer-glow throttled via `requestAnimationFrame`, fine-pointer only.
- `prefers-reduced-motion`: Hero renders one frame; all CSS motion off.
- Mobile: verify frame time of Hero at 6× CPU throttle; if janky, raise `pixel` size or lower DPR for coarse pointers (documented deviation).

## Loading
Route-level `React.lazy`; no heavy libs (lightbox, gallery, diagram are hand-written); prefetch the `/proyectos` chunk on nav hover/focus; no blocking third-party scripts.

## Measuring
`npm run build` → record sizes in `Progress.md` each phase; `npx lighthouse` on `/`, `/proyectos`, one detail page; Chrome DevTools performance trace (via claude-in-chrome) for Hero on throttled CPU; bundle analysis (`vite build --report` or `rollup-plugin-visualizer`, dev-only) in P6.
