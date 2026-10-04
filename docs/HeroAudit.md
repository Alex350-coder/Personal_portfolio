# HeroAudit.md — Formal audit of the existing Hero

Sources audited: `client/src/sections/hero/HeroSection.tsx`, `client/src/components/ui/halftone-nebula.tsx` (836 lines), `client/src/index.css`, `client/src/components/ui/button.tsx`, `client/index.html`. Audited 2026-10-02.

## 1. Visual language

**Palette (preset `abyssal`, dark → bright)**
| Role | Hex | Usage |
|---|---|---|
| void | `#02060a` | page/canvas base, text on filled CTA |
| haze | `#0a1f2e` | far gas |
| dusk | `#0d2f3f` | mid gas |
| deep (`wineColor`) | `#0a4453` | dense gas |
| teal (`crimsonColor`) | `#0f8f9f` | bright gas |
| accent (`hotColor`) | `#3ff2e0` | eyebrow text, CTA border/fill, hottest dots |
| star | `#e4fffb` | all body/heading text (at 100 / 70 / 60 / 25 / 10 % alpha) |

Single-hue (teal/cyan) with one high-chroma accent; no secondary hue. Contrast relationships: star-on-void ≈ 18:1 at 100 %; at 60–70 % alpha over the moving gas it is lower and varies (verify in Phase 6).

**Typography:** Geist Variable (sans) for heading/body; `font-mono` (currently system mono — see deviations) for all labels. Eyebrow: mono 11 px, uppercase, tracking `0.3em`, accent color, prefixed `✦`. Meta label: mono 10 px, tracking `0.32em` / `0.24em`, star/60. H1: `text-5xl → sm:6xl → lg:7xl`, semibold, `leading-[0.95]`, `tracking-tight`. Body: `text-sm → sm:text-base`, `leading-relaxed`, star/70, `max-w-md`.

**Borders/shape:** controls are **square** (`rounded-none`), 1 px borders: accent for primary, star/25 for secondary. No shadows. No card containers in the Hero.

**Glow/gradients/texture:** no CSS glow; the "glow" is the gas itself (domain-warped fbm, luminous band), vignette 0.5, film grain 0.035, halftone dots on a **6 CSS-px pixel grid** with Bayer dither (levels 7), needle-thin 1 px sparkle spikes.

**Density:** low — a corner label, one text block bottom-left, large negative space. Layout: `px-6 sm:px-10 lg:px-16`, `py-8 sm:py-10`, content `max-w-2xl`, `justify-between` column (label top, copy bottom).

**Controls:** `h-11 px-5`, mono 11 px uppercase tracking `0.24em`; primary = `border accent / bg accent/10 / hover:bg accent + text void`; ghost = `border star/25 / hover:bg star/10`; icon 16 px (`lucide`) `aria-hidden`.

## 2. Motion language
- **Idle:** gas drifts (`drift 0.035`), stars twinkle (1.4) and drift; a "lamp" wanders on incommensurate sines after 6 s without pointer input.
- **Pointer:** lamp lights the gas and swells dots (radius 170 px, push 0.3), three parallax star layers (`parallax 1`), sparkles "flare" near the lamp. Smoothing `1-exp(-dt·k)` (k=7 active, 1.5 idle).
- **Click:** drops a sparkle (cap 16) and emits a ripple ring (420 px/s, max 4).
- **Touch:** `touch="scroll"` keeps vertical scroll (`touch-pan-y`).
- **Reduced motion:** `matchMedia('(prefers-reduced-motion: reduce)')` → clock frozen, lamp/flare disabled, single static paint, ripples drawn instantly. ✔ implemented.
- **Performance behavior:** DPR capped (`maxDpr 1.5` in Hero), rAF paused when offscreen (IntersectionObserver) or `document.hidden`; GL objects released on unmount; no-WebGL2 → themed fallback (but wrong palette, see deviations).
- **Transitions on UI:** only `transition-all` from `buttonVariants` (colors on hover) — default ~150 ms; no reveal animations exist yet.

## 3. Interaction language & reuse decisions
| Pattern | Reuse? | Where / how |
|---|---|---|
| Pointer-reactive lighting | **Derive** (CSS only) | `GlowCard`: `--mx/--my` radial glow on card border; fine pointer + motion-ok only |
| Halftone / pixel-grid texture | **Derive** (CSS) | `DotGrid`: radial-gradient dot lattice at 6 px period, token colors, low opacity, section backgrounds/dividers |
| Animated gradients | Limited | slow gradient only on a single section accent per page; static under reduced motion |
| Sparkles `✦` / needle lines | **Reuse** (static glyph/1 px rules) | eyebrows, dividers, hover markers |
| Reveal on scroll | **New, in-language** | `Reveal`: 8–12 px translate + fade, 400–500 ms, ease-out, IO-triggered once; off under reduced motion |
| Parallax | **Do not copy** | would compete with content; reading comfort + perf |
| Ripples / click sparkle | **Do not copy** | Hero signature; repeating dilutes it |
| Full WebGL background elsewhere | **No** (ADR-005) | 2nd GL context cost, mobile battery; CSS derivatives achieve the identity |
| Crosshair cursor | **Do not copy** | hurts affordance on text/links outside the Hero |

## 4. Approved deviations (fixes to the Hero allowed in Phase 1; log result here)
| # | Change | Reason | Status |
|---|---|---|---|
| D1 | Declare Geist Mono as `--font-mono` | Hero intends a mono label face; system fallback is inconsistent across OSes | done P1-T06 (2026-10-03): Geist Mono Variable via `@fontsource-variable/geist-mono`; labels render slightly wider than the system mono, layout unchanged at 375/768/1440 |
| D2 | Hero uses tokens instead of raw hex (no visual change) | single source of truth | done P1-T13 (2026-10-04): no raw hex left in `HeroSection.tsx`; uses `Eyebrow`, `ActionLink`, `type-meta` and token utilities |
| D3 | `id="inicio"`; accessible name for the hero landmark (not the nebula description, in Spanish); `h1` labels the region | a11y, anchors | planned P1-T16 |
| D4 | Pause/play control for the canvas animation | WCAG 2.2.2 (auto-play >5 s) | planned P1-T16 |
| D5 | Fallback gradient + root bg derived from active preset | wrong crimson flash/fallback on teal sky | planned P1-T16 |
| D7 | CTA colors actually apply: the old `outline`/`ghost` buttons kept `dark:border-input`/`dark:bg-input/30`/`dark:hover:bg-*` classes that beat the Hero overrides, so the primary CTA rendered a grey border and a grey hover instead of the documented accent border / accent fill | `hero` and `ghost-hero` variants (P1-T12) have no `dark:` leftovers, so the Hero matches §1 Controls | done P1-T13 (2026-10-04): pixel diff vs the P1-T06 capture is confined to the primary CTA box (~540 px, ≤0.18 % of the frame at 375/768/1440, reduced motion); every other pixel is identical |
| D6 | Contrast/size tweak of 10 px labels if audit fails | WCAG 1.4.3 / readability | Phase 6 only, with before/after |

Anything else changing the Hero's look requires an ADR.

## 4b. Content status
Since 2026-10-03 the Hero carries real copy (name, role "Desarrollador full-stack · Seguridad", short bio, tags Software / Web / Ciberseguridad / Desarrollo asistido por IA). Layout and style untouched. The longer name wraps within `max-w-2xl` at `text-5xl`→`lg:text-7xl`: **verify at 375 px in the P1-T02 baseline** (add `text-balance` only if it breaks; log it as a deviation).

**Baseline result (P1-T02, 2026-10-03):** screenshots in `docs/assets/hero-baseline/` (375/768/1440 × motion/reduced). At 375 px the name wraps cleanly into three lines ("Ander / Alexander / Aguirre Tejada") with no overflow, so no `text-balance` deviation is needed. Captured with headless Chromium + SwiftShader WebGL; re-capture the same way for the P1-T13 diff.

## 5. Consistency checklist answers (reference for new sections)
Colors: tokens above. Typography: Geist + mono tracked uppercase labels. Spacing: `px-6/10/16`, generous vertical rhythm (`py-20 sm:py-28`). Borders: 1 px, square, accent or star/10–25. Animation: slow, atmospheric, CSS-only derivatives. Density: low. Pointer: soft light, never layout-moving. Reduced motion: static. Reusable: dot grid, glow, sparkle glyph, token palette. Not to copy: parallax, ripples, crosshair, extra WebGL.
