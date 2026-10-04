import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Reveal } from '@/components/ui/reveal'
import { seriousViolations } from '@/test/axe'

type Callback = (entries: Array<Pick<IntersectionObserverEntry, 'isIntersecting'>>) => void

let observers: FakeObserver[] = []

class FakeObserver {
  callback: Callback
  constructor(callback: Callback) {
    this.callback = callback
    observers.push(this)
  }
  observe() {}
  disconnect() {}
  emit(isIntersecting: boolean) {
    this.callback([{ isIntersecting }])
  }
}

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduce, addEventListener: () => {}, removeEventListener: () => {} })),
  )
}

describe('Reveal', () => {
  beforeEach(() => {
    observers = []
    vi.stubGlobal('IntersectionObserver', FakeObserver)
    stubReducedMotion(false)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts hidden but keeps its content in the DOM', () => {
    render(<Reveal>hola</Reveal>)
    const el = screen.getByText('hola')
    expect(el).toHaveClass('opacity-0', 'translate-y-2.5', 'transition-[opacity,transform]')
    expect(el).toHaveAttribute('data-revealed', 'false')
  })

  it('reveals once it enters the viewport', () => {
    render(<Reveal>hola</Reveal>)
    act(() => observers[0].emit(true))
    const el = screen.getByText('hola')
    expect(el).toHaveClass('opacity-100', 'translate-y-0')
    expect(el).toHaveAttribute('data-revealed', 'true')
  })

  it('stays revealed after scrolling away (plays once)', () => {
    render(<Reveal>hola</Reveal>)
    act(() => observers[0].emit(true))
    act(() => observers[0].emit(false))
    expect(screen.getByText('hola')).toHaveClass('opacity-100')
  })

  it('under prefers-reduced-motion shows immediately with no transition', () => {
    stubReducedMotion(true)
    render(<Reveal>hola</Reveal>)
    const el = screen.getByText('hola')
    expect(el).toHaveClass('opacity-100')
    expect(el.className).not.toContain('transition-')
  })

  it('shows content when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    render(<Reveal>hola</Reveal>)
    expect(screen.getByText('hola')).toHaveClass('opacity-100')
  })

  it('merges className and forwards attributes', () => {
    render(
      <Reveal className="mt-4" id="r1">
        hola
      </Reveal>,
    )
    expect(screen.getByText('hola')).toHaveClass('mt-4')
    expect(screen.getByText('hola')).toHaveAttribute('id', 'r1')
  })

  it('has no serious axe violations while hidden or shown', async () => {
    const { container } = render(<Reveal>hola</Reveal>)
    expect(await seriousViolations(container)).toEqual([])
    act(() => observers[0].emit(true))
    expect(await seriousViolations(container)).toEqual([])
  })
})
