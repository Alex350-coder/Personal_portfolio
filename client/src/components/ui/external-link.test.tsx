import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ExternalLink } from '@/components/ui/external-link'
import { seriousViolations } from '@/test/axe'

describe('ExternalLink', () => {
  it('opens https links in a new tab with a safe rel and a screen-reader hint', () => {
    render(<ExternalLink href="https://github.com/Alex350-coder">GitHub</ExternalLink>)
    const link = screen.getByRole('link', { name: 'GitHub (abre en nueva pestaña)' })
    expect(link).toHaveAttribute('href', 'https://github.com/Alex350-coder')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it.each(['http://example.com', 'javascript:alert(1)', 'data:text/html,hi', '//evil.example', '/relative', 'not a url'])(
    'never renders a link for the unsafe href %s',
    (href) => {
      render(<ExternalLink href={href}>Texto</ExternalLink>)
      expect(screen.queryByRole('link')).toBeNull()
      expect(screen.getByText('Texto')).toBeInTheDocument()
    },
  )

  it('merges className and forwards other anchor attributes', () => {
    render(
      <ExternalLink href="https://example.com" className="mt-2" data-testid="l">
        Ejemplo
      </ExternalLink>,
    )
    expect(screen.getByTestId('l')).toHaveClass('mt-2')
  })

  it('has no serious axe violations', async () => {
    const { container } = render(<ExternalLink href="https://example.com">Ejemplo</ExternalLink>)
    expect(await seriousViolations(container)).toEqual([])
  })
})
