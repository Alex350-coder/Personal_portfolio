import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { navItems } from '@/data/navigation'
import { seriousViolations } from '@/test/axe'

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

describe('App (browser router, full shell)', () => {
  it('renders skip link, header, Home sections and footer in one landmark structure', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveAttribute('href', '#contenido')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'contenido')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('has a section for every navigation entry', () => {
    render(<App />)
    for (const item of navItems) {
      expect(document.getElementById(item.id), `#${item.id}`).not.toBeNull()
    }
  })

  it('has no serious accessibility violations on Home', async () => {
    render(<App />)
    expect(await seriousViolations(document.body)).toEqual([])
  })
})
