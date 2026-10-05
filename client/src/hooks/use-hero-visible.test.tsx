import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useHeroVisible } from '@/hooks/use-hero-visible'
import { installFakeIntersectionObserver } from '@/test/fake-intersection-observer'

function Probe({ enabled = true }: { enabled?: boolean }) {
  const visible = useHeroVisible(enabled)
  return <p data-testid="state">{visible ? 'visible' : 'gone'}</p>
}

function renderWithHero(enabled = true) {
  render(
    <>
      <section id="inicio" data-testid="hero" />
      <Probe enabled={enabled} />
    </>,
  )
  return screen.getByTestId('hero')
}

describe('useHeroVisible', () => {
  let fake: ReturnType<typeof installFakeIntersectionObserver>

  beforeEach(() => {
    fake = installFakeIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('assumes the Hero is visible before the first observation (page top)', () => {
    renderWithHero()
    expect(screen.getByTestId('state')).toHaveTextContent('visible')
  })

  it('observes #inicio at a 50 % threshold', () => {
    const hero = renderWithHero()
    const [observer] = fake.live()
    expect(observer.observed).toEqual([hero])
    expect(observer.options?.threshold).toEqual([0, 0.5])
  })

  it('stays visible while at least half of the Hero is on screen', () => {
    const hero = renderWithHero()
    fake.setIntersecting(hero, true, 0.5)
    expect(screen.getByTestId('state')).toHaveTextContent('visible')
  })

  it('reports gone once less than half of the Hero is on screen', () => {
    const hero = renderWithHero()
    fake.setIntersecting(hero, true, 0.49)
    expect(screen.getByTestId('state')).toHaveTextContent('gone')
  })

  it('comes back when the Hero re-enters', () => {
    const hero = renderWithHero()
    fake.setIntersecting(hero, false)
    fake.setIntersecting(hero, true, 0.8)
    expect(screen.getByTestId('state')).toHaveTextContent('visible')
  })

  it('never claims the Hero is visible while disabled', () => {
    renderWithHero(false)
    expect(fake.live()).toHaveLength(0)
    expect(screen.getByTestId('state')).toHaveTextContent('gone')
  })

  it('reports gone when IntersectionObserver is unsupported', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    renderWithHero()
    expect(screen.getByTestId('state')).toHaveTextContent('gone')
  })
})
