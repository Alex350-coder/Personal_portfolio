import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

type Listener = () => void

function mockMatchMedia(initial: boolean) {
  let matches = initial
  const listeners = new Set<Listener>()
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      get matches() {
        return matches
      },
      media: query,
      addEventListener: (_: string, l: Listener) => listeners.add(l),
      removeEventListener: (_: string, l: Listener) => listeners.delete(l),
    })),
  )
  return {
    set(next: boolean) {
      matches = next
      listeners.forEach((l) => l())
    },
    listenerCount: () => listeners.size,
  }
}

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('is false when the user has no motion preference', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('is true when prefers-reduced-motion: reduce matches', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('queries the reduced-motion media feature', () => {
    mockMatchMedia(false)
    renderHook(() => useReducedMotion())
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('updates when the preference changes at runtime', () => {
    const media = mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    act(() => media.set(true))
    expect(result.current).toBe(true)
    act(() => media.set(false))
    expect(result.current).toBe(false)
  })

  it('removes its listener on unmount', () => {
    const media = mockMatchMedia(false)
    const { unmount } = renderHook(() => useReducedMotion())
    expect(media.listenerCount()).toBe(1)
    unmount()
    expect(media.listenerCount()).toBe(0)
  })

  it('falls back to false when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })
})
