import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HeroSection from '@/sections/hero/HeroSection'
import { seriousViolations } from '@/test/axe'

// jsdom has no WebGL: the nebula is replaced by a passthrough that mirrors the landmark props
// and the paused state; the canvas itself is covered by the Playwright smoke test.
vi.mock('@/components/ui/halftone-nebula', () => ({
  default: ({
    children,
    id,
    labelledBy,
    paused,
  }: {
    children?: ReactNode
    id?: string
    labelledBy?: string
    paused?: boolean
  }) => (
    <section id={id} aria-labelledby={labelledBy} data-paused={String(paused)}>
      {children}
    </section>
  ),
}))

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduce, addEventListener: () => {}, removeEventListener: () => {} })),
  )
}

describe('HeroSection', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('has one h1 with the owner name', () => {
    stubReducedMotion(false)
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ander Alexander Aguirre Tejada')
  })

  it('is the #inicio landmark, named by the h1', () => {
    stubReducedMotion(false)
    render(<HeroSection />)
    const region = screen.getByRole('region', { name: 'Ander Alexander Aguirre Tejada' })
    expect(region).toHaveAttribute('id', 'inicio')
  })

  it('shows the role as a sparkle-prefixed eyebrow', () => {
    stubReducedMotion(false)
    render(<HeroSection />)
    expect(screen.getByText(/Desarrollador full-stack/)).toHaveTextContent('✦ Desarrollador full-stack · Seguridad')
  })

  it('lists the four focus areas', () => {
    stubReducedMotion(false)
    render(<HeroSection />)
    const items = screen.getAllByRole('listitem').map((li) => li.textContent)
    expect(items).toEqual(['Software', 'Web', 'Ciberseguridad', 'Desarrollo asistido por IA'])
  })

  it('exposes both calls to action as links', () => {
    stubReducedMotion(false)
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: 'Explorar proyectos' })).toHaveAttribute('href', '#proyectos')
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '#contacto')
  })

  describe('animation pause control (WCAG 2.2.2)', () => {
    it('starts playing and offers a pause button', () => {
      stubReducedMotion(false)
      render(<HeroSection />)
      expect(screen.getByRole('button', { name: 'Pausar animación de fondo' })).toBeInTheDocument()
      expect(screen.getByRole('region')).toHaveAttribute('data-paused', 'false')
    })

    it('pauses and resumes with the mouse, updating its label', async () => {
      stubReducedMotion(false)
      render(<HeroSection />)
      await userEvent.click(screen.getByRole('button', { name: 'Pausar animación de fondo' }))
      expect(screen.getByRole('region')).toHaveAttribute('data-paused', 'true')
      await userEvent.click(screen.getByRole('button', { name: 'Reanudar animación de fondo' }))
      expect(screen.getByRole('region')).toHaveAttribute('data-paused', 'false')
    })

    it('is operable with the keyboard (Enter and Space)', async () => {
      stubReducedMotion(false)
      render(<HeroSection />)
      screen.getByRole('button', { name: 'Pausar animación de fondo' }).focus()
      await userEvent.keyboard('{Enter}')
      expect(screen.getByRole('region')).toHaveAttribute('data-paused', 'true')
      await userEvent.keyboard(' ')
      expect(screen.getByRole('region')).toHaveAttribute('data-paused', 'false')
    })

    it('keeps its visible text inside its accessible name (WCAG 2.5.3)', () => {
      stubReducedMotion(false)
      render(<HeroSection />)
      const button = screen.getByRole('button', { name: /animación de fondo/ })
      expect(button).toHaveTextContent('Pausar')
    })

    it('is not shown when the user already prefers reduced motion (nothing animates)', () => {
      stubReducedMotion(true)
      render(<HeroSection />)
      expect(screen.queryByRole('button', { name: /animación/i })).not.toBeInTheDocument()
    })
  })

  it('has no serious axe violations', async () => {
    stubReducedMotion(false)
    const { container } = render(<HeroSection />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
