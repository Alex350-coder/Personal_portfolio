import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ArrowRight } from 'lucide-react'
import { describe, expect, it } from 'vitest'

import { ActionLink } from '@/components/ui/action-link'
import { seriousViolations } from '@/test/axe'

describe('ActionLink', () => {
  it('renders an accessible link with the given href', () => {
    render(<ActionLink href="#proyectos">Explorar proyectos</ActionLink>)
    expect(screen.getByRole('link', { name: 'Explorar proyectos' })).toHaveAttribute('href', '#proyectos')
  })

  it('defaults to the hero variant: accent outline, square, 44px tall', () => {
    render(<ActionLink href="#a">A</ActionLink>)
    expect(screen.getByRole('link')).toHaveClass('border-accent', 'hover:bg-accent', 'rounded-none', 'h-11')
  })

  it('supports the ghost-hero variant', () => {
    render(
      <ActionLink href="#a" variant="ghost-hero">
        A
      </ActionLink>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveClass('border-star-25', 'hover:bg-star-10')
    expect(link).not.toHaveClass('border-accent')
  })

  it('stays clickable above a pointer-events-none layer', () => {
    render(<ActionLink href="#a">A</ActionLink>)
    expect(screen.getByRole('link')).toHaveClass('pointer-events-auto')
  })

  it('merges a custom className', () => {
    render(
      <ActionLink href="#a" className="w-full">
        A
      </ActionLink>,
    )
    expect(screen.getByRole('link')).toHaveClass('w-full', 'h-11')
  })

  it('is reachable by keyboard', async () => {
    render(<ActionLink href="#a">A</ActionLink>)
    await userEvent.tab()
    expect(screen.getByRole('link')).toHaveFocus()
  })

  it('keeps the accessible name when it has a decorative icon', () => {
    render(
      <ActionLink href="#a">
        Ir
        <ArrowRight aria-hidden="true" />
      </ActionLink>,
    )
    expect(screen.getByRole('link', { name: 'Ir' })).toBeInTheDocument()
  })

  it('has no serious axe violations', async () => {
    const { container } = render(<ActionLink href="#a">A</ActionLink>)
    expect(await seriousViolations(container)).toEqual([])
  })
})
