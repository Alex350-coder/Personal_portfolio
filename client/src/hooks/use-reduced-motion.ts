import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  if (typeof window.matchMedia !== 'function') return () => {}
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSnapshot(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches
}

/** True while the user asks the OS/browser for reduced motion. Live-updates on change. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
