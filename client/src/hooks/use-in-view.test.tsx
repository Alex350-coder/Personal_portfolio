import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useInView, type UseInViewOptions } from '@/hooks/use-in-view'

type Callback = (entries: Array<Pick<IntersectionObserverEntry, 'isIntersecting'>>) => void

let instances: FakeObserver[] = []

class FakeObserver {
  disconnected = false
  observed: Element[] = []
  callback: Callback
  options?: IntersectionObserverInit
  constructor(callback: Callback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    instances.push(this)
  }
  observe(el: Element) {
    this.observed.push(el)
  }
  disconnect() {
    this.disconnected = true
  }
  emit(isIntersecting: boolean) {
    this.callback([{ isIntersecting }])
  }
}

function Probe(options: UseInViewOptions) {
  const { ref, inView } = useInView<HTMLDivElement>(options)
  return (
    <div ref={ref} data-testid="target">
      {inView ? 'visible' : 'hidden'}
    </div>
  )
}

describe('useInView', () => {
  beforeEach(() => {
    instances = []
    vi.stubGlobal('IntersectionObserver', FakeObserver)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts out of view and observes the element', () => {
    render(<Probe />)
    expect(screen.getByTestId('target')).toHaveTextContent('hidden')
    expect(instances).toHaveLength(1)
    expect(instances[0].observed).toContain(screen.getByTestId('target'))
  })

  it('passes rootMargin and threshold to the observer', () => {
    render(<Probe rootMargin="0px 0px -10% 0px" threshold={0.25} />)
    expect(instances[0].options).toMatchObject({ rootMargin: '0px 0px -10% 0px', threshold: 0.25 })
  })

  it('reports in view when the element intersects', () => {
    render(<Probe />)
    act(() => instances[0].emit(true))
    expect(screen.getByTestId('target')).toHaveTextContent('visible')
  })

  it('stays in view and disconnects after the first hit when once is true (default)', () => {
    render(<Probe />)
    act(() => instances[0].emit(true))
    expect(instances[0].disconnected).toBe(true)
    act(() => instances[0].emit(false))
    expect(screen.getByTestId('target')).toHaveTextContent('visible')
  })

  it('tracks leaving the viewport when once is false', () => {
    render(<Probe once={false} />)
    act(() => instances[0].emit(true))
    expect(screen.getByTestId('target')).toHaveTextContent('visible')
    act(() => instances[0].emit(false))
    expect(screen.getByTestId('target')).toHaveTextContent('hidden')
  })

  it('disconnects on unmount', () => {
    const { unmount } = render(<Probe />)
    unmount()
    expect(instances[0].disconnected).toBe(true)
  })

  it('treats the element as in view when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    render(<Probe />)
    expect(screen.getByTestId('target')).toHaveTextContent('visible')
  })
})
