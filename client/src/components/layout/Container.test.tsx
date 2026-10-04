import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Container } from '@/components/layout/Container'

describe('Container', () => {
  it('renders its children', () => {
    render(<Container>contenido</Container>)
    expect(screen.getByText('contenido')).toBeInTheDocument()
  })

  it('applies the page width and gutter utilities', () => {
    render(<Container>x</Container>)
    expect(screen.getByText('x')).toHaveClass('mx-auto', 'max-w-page', 'section-x')
  })

  it('merges a custom className without losing the base classes', () => {
    render(<Container className="max-w-copy">x</Container>)
    const el = screen.getByText('x')
    expect(el).toHaveClass('max-w-copy', 'section-x')
    expect(el).not.toHaveClass('max-w-page')
  })
})
