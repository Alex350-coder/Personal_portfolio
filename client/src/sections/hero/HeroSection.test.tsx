import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import HeroSection from '@/sections/hero/HeroSection'
import { seriousViolations } from '@/test/axe'

// jsdom has no WebGL: the nebula is replaced by a passthrough; the canvas is covered by Playwright.
vi.mock('@/components/ui/halftone-nebula', () => ({
  default: ({ children }: { children?: ReactNode }) => <section>{children}</section>,
}))

describe('HeroSection', () => {
  it('has one h1 with the owner name', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ander Alexander Aguirre Tejada')
  })

  it('shows the role as a sparkle-prefixed eyebrow', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Desarrollador full-stack/)).toHaveTextContent('✦ Desarrollador full-stack · Seguridad')
  })

  it('lists the four focus areas', () => {
    render(<HeroSection />)
    const items = screen.getAllByRole('listitem').map((li) => li.textContent)
    expect(items).toEqual(['Software', 'Web', 'Ciberseguridad', 'Desarrollo asistido por IA'])
  })

  it('exposes both calls to action as links', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: 'Explorar proyectos' })).toHaveAttribute('href', '#proyectos')
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '#contacto')
  })

  it('has no serious axe violations', async () => {
    const { container } = render(<HeroSection />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
