import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LivingOrigamiBackground } from '@/components/ui/living-origami-bg'
import { seriousViolations } from '@/test/axe'

describe('LivingOrigamiBackground', () => {
  it('is decorative: hidden from assistive technology and without focusable content', () => {
    const { container } = render(<LivingOrigamiBackground />)
    const layer = container.firstElementChild
    expect(layer).toHaveAttribute('aria-hidden', 'true')
    expect(layer?.querySelectorAll('a, button, [tabindex]')).toHaveLength(0)
  })

  it('draws a small flock of cranes, each with a body, tail and two wings', () => {
    const { container } = render(<LivingOrigamiBackground />)
    const cranes = container.querySelectorAll('.origami-crane')
    expect(cranes.length).toBeGreaterThan(0)
    expect(cranes.length).toBeLessThanOrEqual(10)
    for (const crane of cranes) expect(crane.querySelectorAll('.origami-part')).toHaveLength(4)
  })

  it('renders the same flock every time (no randomness at render)', () => {
    const first = render(<LivingOrigamiBackground />).container.innerHTML
    const second = render(<LivingOrigamiBackground />).container.innerHTML
    expect(second).toBe(first)
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<LivingOrigamiBackground />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
