import { useEffect, useState } from 'react'

/** Thin horizontal band around the viewport's upper-middle: a section is "current" while it crosses it. */
const READING_LINE_MARGIN = '-40% 0px -55% 0px'
const BOTTOM_TOLERANCE_PX = 2

const isScrolledToBottom = (): boolean =>
  window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX

/**
 * Scroll-spy: id of the first section (in `ids` order) crossing the reading line, or null. At the
 * very bottom of the page the last section wins, since a short final section may never reach the
 * reading line. Observes nothing while disabled or when IntersectionObserver is unavailable.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [crossingId, setCrossingId] = useState<string | null>(null)
  const [atBottom, setAtBottom] = useState(false)
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
        setCrossingId(ids.find((id) => crossing.has(id)) ?? null)
      },
      { rootMargin: READING_LINE_MARGIN },
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    const onScroll = () => setAtBottom(isScrolledToBottom())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids, enabled, supported])

  if (!enabled || !supported) return null
  return atBottom ? (ids.at(-1) ?? null) : crossingId
}
