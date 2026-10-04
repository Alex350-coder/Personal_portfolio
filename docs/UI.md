# UI.md — Design system derived from the Hero

Evidence: `docs/HeroAudit.md`. Token names below are the **final** names implemented in Phase 1 (`client/src/index.css`).

## Tokens (Tailwind v4 `@theme` in `client/src/index.css`)
| Token | Value | Tailwind use |
|---|---|---|
| `--color-void` | `#02060a` | `bg-void` page background |
| `--color-haze` | `#0a1f2e` | `bg-haze` raised surfaces |
| `--color-dusk` | `#0d2f3f` | `bg-dusk` |
| `--color-deep` | `#0a4453` | borders/dividers strong |
| `--color-teal` | `#0f8f9f` | secondary accents |
| `--color-accent` | `#3ff2e0` | `text-accent`, `border-accent` |
| `--color-star` | `#e4fffb` | `text-star` (+ `/70`, `/60`, `/25`, `/10`) |
| `--color-star-70/-60/-25/-10`, `--color-accent-50/-10` | `color-mix` alpha ramp | `text-star-70`, `border-star-25`, `bg-accent-10` … (or the `/70` modifier) |
| `--container-page` / `--container-copy` | `72rem` / `42rem` | `max-w-page`, `max-w-copy` |
| shadcn map | `background=void`, `foreground=star`, `primary=accent`, `primary-foreground=void`, `border=star/10`, `ring=accent`, `muted-foreground=star/60`… | semantic classes |
Fonts: `--font-sans` Geist Variable; `--font-mono` Geist Mono Variable. Radius: controls `0`. Dark-only.

## Type scale
Utilities (index.css `@utility`): `type-eyebrow` (mono 11 px, accent), `type-label` (mono 11 px, star/60), `type-meta` (mono 10 px, `0.32em`), `type-h2`, `type-h3`, `type-body` (≤65ch). Spacing: `section-x` (`px-6 sm:px-10 lg:px-16`), `section-y` (`py-20 sm:py-28`). `--radius` is `0`. Dot surfaces: `dot-grid` / `dot-grid-fade`; pointer light: `glow-card`.
- Eyebrow: mono 11 px / uppercase / `tracking-[0.3em]` / accent, prefix `✦`.
- Label: mono 10–11 px / uppercase / `tracking-[0.24em]`; minimum 11 px for anything essential (Phase 6 audit).
- H1 (hero only): 5xl→7xl. Section H2: `text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.02]`. H3: `text-xl font-semibold`.
- Body: `text-sm sm:text-base leading-relaxed text-star/70`; reading width ≤ 65ch.

## Layout
- Container: `mx-auto max-w-6xl px-6 sm:px-10 lg:px-16`.
- Section rhythm: `py-20 sm:py-28`; each section = eyebrow + H2 + optional lead, then content. Sections separated by a 1 px `border-star/10` rule or a `DotGrid` band, not by color blocks.
- Grid: 12-col on lg, 1-col mobile; cards `gap-4 sm:gap-6`.

## Components (from Phase 1)
`Container`, `Section`, `SkipLink`, `Eyebrow`, `ActionLink` (`hero` filled, `ghost-hero`), `DotGrid`, `Reveal`, `GlowCard`, `Badge`. States: hover = fill or `star/10`; focus-visible = 2 px `accent` ring with offset (never removed); active = 1 px translate (from `buttonVariants`); disabled = 50 % opacity.
`ActionLink` variants are `hero` and `ghost-hero` (buttonVariants size `hero`: 44 px, square, mono tracked). `GlowCard` = `border border-star-10 bg-haze/40` + pointer light. The Hero pause button (`Pausar`/`Reanudar`) uses `ghost-hero`. Dev gallery of every primitive: `npm run dev` → `/__kit`.
Cards: `border border-star/10 bg-haze/40`, square corners, hover → border `accent/50` + `GlowCard` light. No drop shadows.

## Motion rules
- Allowed: Hero WebGL; CSS `Reveal` (≤12 px, 400–500 ms, once); `GlowCard` pointer light; hover color transitions ≤200 ms; slow gradient drift on at most one element per viewport.
- Forbidden: parallax on content, layout-shifting motion, scroll-jacking, auto-playing carousels, additional animation libraries, anything >5 s autoplay without pause.
- Reduced motion (`prefers-reduced-motion: reduce`): no reveals, no glow tracking, static dot grid, instant transitions. Implemented once in `use-reduced-motion` and a global CSS media query.
- Touch / coarse pointer: no pointer-glow; tap targets ≥44 px.

## Backgrounds
Page = `void`. Section accent backgrounds = `DotGrid` (6 px lattice, `star/6–10`, masked by radial fade) and/or a single radial teal glow at ≤12 % opacity. Never a flat light color. Text always over `void/haze` surfaces for contrast.

## Consistency checklist (answer before each new visual element)
1. Which tokens/colors? 2. Which typography (Geist vs mono, tracking)? 3. Which spacing step? 4. Which border (1 px, square, star/10–25 or accent)? 5. Which animation (reveal/glow/none) and its duration? 6. Is the density as low as the Hero? 7. How does it react to the pointer (soft light only)? 8. What does it do under reduced motion? 9. Which Hero effect is reused (dot grid/glow/glyph)? 10. What from the Hero is deliberately NOT copied (parallax, ripples, WebGL, crosshair) and why?

## Navigation pattern
Mono uppercase links `tracking-[0.24em]`, active link = accent + 1 px underline; bar `bg-void/80 backdrop-blur` with 1 px bottom border; mobile = full-width disclosure panel. Appears after the Hero on `/`.

## Intentional deviations
Record any deviation from the Hero here AND in `docs/Decisions.md`: D1–D5 and D7 in `docs/HeroAudit.md §4` (Geist Mono, tokens, landmark/id, pause control, preset fallback, working CTA colours).
