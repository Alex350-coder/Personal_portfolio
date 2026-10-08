import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SocialLinks } from '@/components/ui/social-links'
import type { ProfileLink } from '@/data/profile'
import { seriousViolations } from '@/test/axe'

const LINKS: readonly ProfileLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/example' },
  { id: 'email', label: 'Correo', href: 'mailto:hola@example.com' },
  { id: 'cv', label: 'CV', href: '[[PLACEHOLDER: CV PDF]]' },
]

describe('SocialLinks', () => {
  it('renders a labelled list of the real links', () => {
    render(<SocialLinks links={LINKS} />)
    const list = screen.getByRole('list', { name: 'Enlaces profesionales' })
    expect(within(list).getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/example',
    )
    expect(within(list).getByRole('link', { name: /Correo/ })).toHaveAttribute(
      'href',
      'mailto:hola@example.com',
    )
  })

  it('opens https links in a new tab safely and announces it', () => {
    render(<SocialLinks links={LINKS} />)
    const link = screen.getByRole('link', { name: /GitHub/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAccessibleName('GitHub (abre en nueva pestaña)')
  })

  it('does not open mailto links in a new tab', () => {
    render(<SocialLinks links={LINKS} />)
    const link = screen.getByRole('link', { name: /Correo/ })
    expect(link).not.toHaveAttribute('target')
    expect(link).toHaveAccessibleName('Correo')
  })

  it('shows a missing resource as an explicit placeholder, not a dead link', () => {
    render(<SocialLinks links={LINKS} />)
    expect(screen.queryByRole('link', { name: /CV/ })).not.toBeInTheDocument()
    expect(screen.getByText(/\[\[PLACEHOLDER: CV PDF\]\]/)).toBeInTheDocument()
  })

  it('refuses unsafe URL schemes instead of rendering them as links', () => {
    const unsafe: readonly ProfileLink[] = [
      { id: 'github', label: 'Malo', href: 'javascript:alert(1)' },
      { id: 'linkedin', label: 'Plano', href: 'http://example.com' },
    ]
    render(<SocialLinks links={unsafe} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByText('Malo')).not.toBeInTheDocument()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<SocialLinks links={LINKS} />)
    expect(await seriousViolations(container)).toEqual([])
  })

  it('renders a published CV as a same-tab download link', () => {
    render(<SocialLinks links={[{ id: 'cv', label: 'CV', href: '/cv/Jane-Doe-CV.pdf' }]} />)
    const link = screen.getByRole('link', { name: /CV/ })
    expect(link).toHaveAttribute('href', '/cv/Jane-Doe-CV.pdf')
    expect(link).toHaveAttribute('download')
    expect(link).not.toHaveAttribute('target')
  })

  it('refuses a CV href outside /cv/', () => {
    render(<SocialLinks links={[{ id: 'cv', label: 'CV', href: 'https://evil.example/cv.pdf' }]} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
