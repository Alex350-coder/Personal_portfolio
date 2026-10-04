import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { SkipLink } from '@/components/layout/SkipLink'
import { seriousViolations } from '@/test/axe'

describe('SkipLink', () => {
  it('points at the main content by default', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveAttribute('href', '#contenido')
  })

  it('accepts a custom target and label', () => {
    render(<SkipLink targetId="main">Ir al contenido principal</SkipLink>)
    expect(screen.getByRole('link', { name: 'Ir al contenido principal' })).toHaveAttribute('href', '#main')
  })

  it('is the first tab stop and receives focus', async () => {
    render(
      <>
        <SkipLink />
        <button type="button">otro</button>
      </>,
    )
    await userEvent.tab()
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveFocus()
  })

  it('is visually hidden until focused', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toHaveClass('sr-only', 'focus:not-sr-only')
  })

  it('has no serious axe violations', async () => {
    const { container } = render(<SkipLink />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
