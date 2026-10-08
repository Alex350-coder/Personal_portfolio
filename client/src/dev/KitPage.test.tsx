import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import KitPage from '@/dev/KitPage'
import { seriousViolations } from '@/test/axe'

function stubBrowserApis() {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} })),
  )
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
    },
  )
}

describe('KitPage (dev gallery)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows every Phase 1 primitive', () => {
    stubBrowserApis()
    render(<KitPage />)
    expect(screen.getByRole('heading', { level: 2, name: 'Kit de primitivas' })).toBeInTheDocument()
    for (const title of ['Eyebrow', 'ActionLink: hero / ghost-hero', 'Tipografía', 'DotGrid', 'Reveal', 'GlowCard', 'ProjectGallery + Lightbox', 'Container']) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveAttribute('href', '#kit-contenido')
    expect(screen.getByRole('link', { name: 'Explorar proyectos' })).toBeInTheDocument()
  })

  it('has a single main landmark and no serious axe violations', async () => {
    stubBrowserApis()
    const { container } = render(<KitPage />)
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(await seriousViolations(container)).toEqual([])
  })
})
