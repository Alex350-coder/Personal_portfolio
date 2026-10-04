import { useCallback, useEffect, useState } from 'react'

export interface UseInViewOptions {
  /** Stop observing after the first intersection (default true). */
  once?: boolean
  rootMargin?: string
  threshold?: number
}

export interface UseInViewResult<T extends Element> {
  ref: (node: T | null) => void
  inView: boolean
}

/**
 * Reports whether an element is intersecting the viewport.
 * Without IntersectionObserver the element is treated as visible so content is never hidden.
 */
export function useInView<T extends Element = HTMLElement>({
  once = true,
  rootMargin = '0px',
  threshold = 0,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const [node, setNode] = useState<T | null>(null)
  const [observed, setObserved] = useState(false)
  const supported = typeof IntersectionObserver === 'function'

  const ref = useCallback((el: T | null) => setNode(el), [])

  useEffect(() => {
    if (!node || !supported) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObserved(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setObserved(false)
        }
      },
      { rootMargin, threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, supported, once, rootMargin, threshold])

  return { ref, inView: supported ? observed : true }
}
