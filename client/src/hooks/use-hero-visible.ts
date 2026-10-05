import { useEffect, useState } from 'react'

const HERO_ID = 'inicio'
const HIDE_BELOW_RATIO = 0.5

/**
 * True while at least half of the Hero (`#inicio`) is on screen; the header stays out of its way
 * until then (Plan.md §1). Before the first observation the page is assumed to be at the top.
 * False when disabled or when IntersectionObserver is missing, so the header is never hidden
 * without a reason. Home always renders the Hero (HomePage test guards this).
 */
export function useHeroVisible(enabled: boolean): boolean {
  const [ratioVisible, setRatioVisible] = useState(true)
  const supported = typeof IntersectionObserver === 'function'

  useEffect(() => {
    if (!enabled || !supported) return
    const hero = document.getElementById(HERO_ID)
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setRatioVisible(entry.isIntersecting && entry.intersectionRatio >= HIDE_BELOW_RATIO)
      },
      { threshold: [0, HIDE_BELOW_RATIO] },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [enabled, supported])

  return enabled && supported && ratioVisible
}
