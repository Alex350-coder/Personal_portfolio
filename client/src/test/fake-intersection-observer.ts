import { act } from '@testing-library/react'
import { vi } from 'vitest'

type EntryInit = { target: Element; isIntersecting: boolean; intersectionRatio: number }
type Callback = (entries: EntryInit[]) => void

/** Controllable IntersectionObserver for jsdom (which has none). */
export class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []

  observed: Element[] = []
  disconnected = false
  private readonly callback: Callback
  readonly options?: IntersectionObserverInit

  constructor(callback: Callback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    FakeIntersectionObserver.instances.push(this)
  }

  observe(element: Element) {
    this.observed.push(element)
  }

  unobserve(element: Element) {
    this.observed = this.observed.filter((item) => item !== element)
  }

  disconnect() {
    this.disconnected = true
  }

  emit(entries: EntryInit[]) {
    this.callback(entries)
  }
}

/** Installs the fake as a global. Returns helpers; pair with `vi.unstubAllGlobals()`. */
export function installFakeIntersectionObserver() {
  FakeIntersectionObserver.instances = []
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
  return {
    /** Live (not disconnected) observers, oldest first. */
    live: () => FakeIntersectionObserver.instances.filter((observer) => !observer.disconnected),
    /** Reports the intersection state (and optional visible ratio) of `target` to every live observer watching it. */
    setIntersecting(target: Element, isIntersecting: boolean, intersectionRatio = isIntersecting ? 1 : 0) {
      act(() => {
        for (const observer of FakeIntersectionObserver.instances) {
          if (!observer.disconnected && observer.observed.includes(target)) {
            observer.emit([{ target, isIntersecting, intersectionRatio }])
          }
        }
      })
    },
  }
}
