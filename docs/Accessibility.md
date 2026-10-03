# Accessibility.md — WCAG 2.2 AA is a gate

Ruleset: ECC `a11y-architect` agent + `web/design-quality`. Research basis: WCAG 2.2.2 (Pause, Stop, Hide) requires a mechanism for auto-starting motion longer than 5 s; `prefers-reduced-motion` helps 2.3.3 but does **not** replace 2.2.2, and canvas/WebGL animation must be gated in JS (the Hero already does for reduced motion).

## Requirements
- **Structure:** `<header>`, `<nav aria-label="Principal">`, `<main id="contenido">`, `<footer>`; one `h1` per route (Hero `h1` on `/`); logical `h2/h3`; sections use `aria-labelledby`. `<html lang="es">`.
- **Skip link** first focusable element → `#contenido`.
- **Keyboard:** everything operable; logical order; visible focus (2 px accent ring + offset, ≥3:1 against adjacent colors); no traps except modal-like (mobile menu, lightbox) with Escape + focus restore; route change moves focus to `main`.
- **Motion:** honor `prefers-reduced-motion` in CSS (global) and JS (`use-reduced-motion`). Hero canvas gets a keyboard-operable pause/play control (P1-T16). No content hidden behind hover only; pointer effects are decorative.
- **Pointer independence:** nothing requires pointer movement; Hero interaction is optional enhancement.
- **Contrast:** text ≥4.5:1 (≥3:1 large/UI). Verify Hero 60–70 % alpha text over the brightest gas regions; essential text ≥ 11 px; adjust alpha upward if failing (D6).
- **Target size:** ≥24×24 CSS px (WCAG 2.5.8), aim 44 px on touch; spacing between small targets.
- **Links/buttons:** links navigate, buttons act; descriptive names ("Ver repositorio de <Proyecto>" via `aria-label`/visually-hidden text); external links announce "(abre en nueva pestaña)"; icon-only controls have names; decorative icons `aria-hidden`.
- **Images:** meaningful `alt`; decorative `alt=""`; media type requires `alt`. Canvas `aria-hidden` with the text content carrying the meaning.
- **Forms/filters:** labels, `aria-pressed`/`aria-checked`, result count in `aria-live="polite"`.
- **Zoom/reflow:** usable at 200 % and 400 % (320 px reflow), no horizontal scroll; `100svh` Hero must not clip content on short viewports (min-height strategy in P6).
- **Forced colors / high contrast:** borders use `currentColor`/system colors fallback; no information by color alone (badges have text).
- **Language:** Spanish content; tech terms may stay English with `lang="en"` where appropriate.

## Testing
axe (component + Playwright) every phase: 0 serious/critical. Phase 6: manual keyboard pass, NVDA + Firefox/Chrome spot check, 200/400 % zoom, forced-colors emulation, reduced-motion emulation. Record outcomes in `Progress.md`.
