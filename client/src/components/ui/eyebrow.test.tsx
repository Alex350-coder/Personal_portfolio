import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Eyebrow } from '@/components/ui/eyebrow'

describe('Eyebrow', () => {
  it('prefixes its text with the sparkle glyph', () => {
    render(<Eyebrow>Proyectos</Eyebrow>)
    expect(screen.getByText(/Proyectos/)).toHaveTextContent('✦ Proyectos')
  })

  it('uses the eyebrow type utility and merges a custom className', () => {
    render(<Eyebrow className="mb-4">Hola</Eyebrow>)
    expect(screen.getByText(/Hola/)).toHaveClass('type-eyebrow', 'mb-4')
  })

  it('forwards other paragraph attributes', () => {
    render(<Eyebrow id="e1">Hola</Eyebrow>)
    expect(screen.getByText(/Hola/)).toHaveAttribute('id', 'e1')
  })
})
