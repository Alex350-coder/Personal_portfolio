import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from '@/components/ui/badge'
import { seriousViolations } from '@/test/axe'

describe('Badge', () => {
  it('renders its text so state never depends on color alone', () => {
    render(<Badge>Completado</Badge>)
    expect(screen.getByText('Completado')).toBeInTheDocument()
  })

  it('adds a visually hidden prefix for screen readers when given', () => {
    render(<Badge srLabel="Estado">Activo</Badge>)
    expect(screen.getByText('Estado:')).toHaveClass('sr-only')
    expect(screen.getByText(/Activo/).parentElement).toHaveTextContent('Estado: Activo')
  })

  it('differs structurally between variants (dashed border for in-progress)', () => {
    const { rerender } = render(<Badge variant="outline">A</Badge>)
    expect(screen.getByText('A')).toHaveClass('border-star-25')
    rerender(<Badge variant="dashed">A</Badge>)
    expect(screen.getByText('A')).toHaveClass('border-dashed')
    rerender(<Badge variant="accent">A</Badge>)
    expect(screen.getByText('A')).toHaveClass('border-accent-50')
  })

  it('merges className and forwards attributes', () => {
    render(<Badge className="mt-2" data-testid="b">A</Badge>)
    expect(screen.getByTestId('b')).toHaveClass('mt-2')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Badge srLabel="Estado">Activo</Badge>)
    expect(await seriousViolations(container)).toEqual([])
  })
})
