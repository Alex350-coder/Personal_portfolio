import type { CSSProperties } from 'react'

/** Small seeded generator (mulberry32): the same flock on every render, no `Math.random` in render. */
function seeded(seed: number): () => number {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DRIFTER_COUNT = 8
const between = (random: () => number, min: number, max: number) => min + random() * (max - min)

/** Computed once at module load, so the layout is identical on every render (and in a prerender). */
const FLOCK: readonly CSSProperties[] = (() => {
  const random = seeded(2026)
  return Array.from({ length: DRIFTER_COUNT }, (_, index) => ({
    // Spread the birds over the full height instead of one band.
    top: `${6 + (index * 88) / DRIFTER_COUNT + between(random, -4, 4)}%`,
    '--y-start': `${between(random, -10, 10)}vh`,
    '--y-end': `${between(random, -10, 10)}vh`,
    '--r-start': `${between(random, -12, 12)}deg`,
    '--r-end': `${between(random, -12, 12)}deg`,
    '--s': between(random, 0.9, 1.7),
    '--o': between(random, 0.2, 0.4),
    animationDuration: `${between(random, 38, 70)}s`,
    // Negative delay: the flock is already spread across the screen on load.
    animationDelay: `${between(random, -70, 0)}s`,
  })) as CSSProperties[]
})()

/**
 * Decorative "living origami": a few teal paper cranes drifting slowly across the page, only to
 * keep the dark background from feeling empty. CSS only (transforms), fixed behind the content,
 * ignores the pointer, hidden from assistive tech, off under `prefers-reduced-motion` and paused
 * with the Hero's pause control (`html[data-motion="paused"]`). Styles: `.origami-*` in index.css.
 */
export function LivingOrigamiBackground() {
  return (
    <div aria-hidden="true" className="origami-layer">
      {FLOCK.map((style, index) => (
        <div key={index} className="origami-drifter" style={style}>
          <div className="origami-crane" style={{ animationDelay: `${-index * 0.9}s` }}>
            <span className="origami-part origami-tail" />
            <span className="origami-part origami-body" />
            <span className="origami-part origami-wing origami-wing-back" />
            <span className="origami-part origami-wing origami-wing-front" />
          </div>
        </div>
      ))}
    </div>
  )
}
