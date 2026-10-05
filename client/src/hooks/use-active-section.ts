import { useEffect, useState } from 'react'

/** Thin horizontal band around the viewport's upper-middle: a section is "current" while it crosses it. */
const READING_LINE_MARGIN = '-40% 0px -55% 0px'

/**
 * Scroll-spy: id of the first section (in `ids` order) crossing the reading line, or null.
 * Observes nothing while disabled or when IntersectionObserver is unavailable.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)
  const supported = typeof IntersectionObserver === 'function'

  useEffect(() => {
    if (!enabled || !supported) return

    const crossing = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id)
          else crossing.delete(entry.target.id)
        }
        setActive(ids.find((id) => crossing.has(id)) ?? null)
      },
      { rootMargin: READING_LINE_MARGIN },
    )

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => {
      observer.disconnect()
      setActive(null)
    }
  }, [ids, enabled, supported])

  return enabled && supported ? active : null
}
