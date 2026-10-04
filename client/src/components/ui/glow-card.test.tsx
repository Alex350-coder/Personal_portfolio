import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GlowCard } from '@/components/ui/glow-card'
import { seriousViolations } from '@/test/axe'

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduce, addEventListener: () => {}, removeEventListener: () => {} })),
  )
}

function renderCard(props: { onPointerMove?: () => void } = {}) {
  render(
    <GlowCard data-testid="card" {...props}>
      contenido
    </GlowCard>,
  )
  const card = screen.getByTestId('card')
  card.getBoundingClientRect = () => ({ left: 100, top: 50, width: 300, height: 200 }) as DOMRect
  return card
}

describe('GlowCard', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders children inside a bordered square surface', () => {
    stubReducedMotion(false)
    const card = renderCard()
    expect(card).toHaveTextContent('contenido')
    expect(card).toHaveClass('glow-card', 'border', 'border-star-10', 'hover:border-accent-50')
    expect(card).toHaveAttribute('data-glow', 'on')
  })

  it('tracks the mouse relative to the card through --mx/--my', () => {
    stubReducedMotion(false)
    const card = renderCard()
    fireEvent.pointerMove(card, { clientX: 160, clientY: 90, pointerType: 'mouse' })
    expect(card.style.getPropertyValue('--mx')).toBe('60px')
    expect(card.style.getPropertyValue('--my')).toBe('40px')
  })

  it('ignores touch pointers (fine pointer only)', () => {
    stubReducedMotion(false)
    const card = renderCard()
    fireEvent.pointerMove(card, { clientX: 160, clientY: 90, pointerType: 'touch' })
    expect(card.style.getPropertyValue('--mx')).toBe('')
  })

  it('is off under prefers-reduced-motion: no tracking, glow disabled', () => {
    stubReducedMotion(true)
    const card = renderCard()
    expect(card).toHaveAttribute('data-glow', 'off')
    fireEvent.pointerMove(card, { clientX: 160, clientY: 90, pointerType: 'mouse' })
    expect(card.style.getPropertyValue('--mx')).toBe('')
  })

  it('still calls a consumer onPointerMove handler', () => {
    stubReducedMotion(false)
    const handler = vi.fn()
    const card = renderCard({ onPointerMove: handler })
    fireEvent.pointerMove(card, { clientX: 1, clientY: 1, pointerType: 'mouse' })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('has no serious axe violations', async () => {
    stubReducedMotion(false)
    const { container } = render(<GlowCard>contenido</GlowCard>)
    expect(await seriousViolations(container)).toEqual([])
  })
})
