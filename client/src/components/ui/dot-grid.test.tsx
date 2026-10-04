import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DotGrid } from '@/components/ui/dot-grid'
import { seriousViolations } from '@/test/axe'

describe('DotGrid', () => {
  it('is decorative: hidden from assistive tech and ignores the pointer', () => {
    const { container } = render(<DotGrid />)
    const el = container.firstElementChild
    expect(el).toHaveAttribute('aria-hidden', 'true')
    expect(el).toHaveClass('pointer-events-none', 'dot-grid')
  })

  it('fades toward the edges by default and can opt out', () => {
    const { container, rerender } = render(<DotGrid />)
    expect(container.firstElementChild).toHaveClass('dot-grid-fade')
    rerender(<DotGrid fade={false} />)
    expect(container.firstElementChild).not.toHaveClass('dot-grid-fade')
  })

  it('merges a custom className', () => {
    const { container } = render(<DotGrid className="opacity-20" />)
    expect(container.firstElementChild).toHaveClass('opacity-20')
    expect(container.firstElementChild).not.toHaveClass('opacity-40')
  })

  it('has no serious axe violations', async () => {
    const { container } = render(<DotGrid />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
