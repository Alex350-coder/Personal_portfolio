import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SiteHeader } from '@/components/layout/SiteHeader'
import { profile } from '@/data/profile'
import { installFakeIntersectionObserver } from '@/test/fake-intersection-observer'
import { seriousViolations } from '@/test/axe'

function renderHeader(path = '/', withHero = false) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      {withHero ? <section id="inicio" data-testid="hero" /> : null}
      <SiteHeader />
      <section id="sobre-mi" data-testid="sobre-mi" />
      <section id="proyectos" data-testid="proyectos" />
      <section id="tecnologias" />
      <section id="contacto" />
    </MemoryRouter>,
  )
}

describe('SiteHeader', () => {
  let fake: ReturnType<typeof installFakeIntersectionObserver>

  beforeEach(() => {
    fake = installFakeIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders a banner with a named primary navigation', () => {
    renderHeader()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
  })

  it('links every section through /#anchor so it works from any route', () => {
    renderHeader('/proyectos')
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const hrefs = within(nav)
      .getAllByRole('link')
      .map((link) => [link.textContent, link.getAttribute('href')])
    expect(hrefs).toEqual([
      ['Sobre mí', '/#sobre-mi'],
      ['Proyectos', '/#proyectos'],
      ['Tecnologías', '/#tecnologias'],
      ['Contacto', '/#contacto'],
    ])
  })

  it('has a brand link back to the Hero', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: profile.name })).toHaveAttribute('href', '/#inicio')
  })

  it('marks the section being read as the current location on Home', () => {
    renderHeader('/')
    fake.setIntersecting(screen.getByTestId('proyectos'), true)
    expect(screen.getByRole('link', { name: 'Proyectos' })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('link', { name: 'Sobre mí' })).not.toHaveAttribute('aria-current')
  })

  it('marks Proyectos as the current page on /proyectos routes', () => {
    renderHeader('/proyectos/algo')
    expect(screen.getByRole('link', { name: 'Proyectos' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not scroll-spy away from Home', () => {
    renderHeader('/proyectos')
    expect(fake.live()).toHaveLength(0)
  })

  describe('visibility', () => {
    it('is hidden and inert while the Hero is at least half visible on Home', () => {
      renderHeader('/', true)
      const banner = screen.getByTestId('hero').nextElementSibling as HTMLElement
      expect(banner).toHaveAttribute('inert')
      expect(banner).toHaveAttribute('data-hidden', 'true')
    })

    it('appears once the Hero is mostly gone', () => {
      renderHeader('/', true)
      fake.setIntersecting(screen.getByTestId('hero'), true, 0.2)
      const banner = screen.getByRole('banner')
      expect(banner).not.toHaveAttribute('inert')
      expect(banner).toHaveAttribute('data-hidden', 'false')
    })

    it('is always visible on other routes, whatever the Hero does', () => {
      renderHeader('/proyectos', true)
      expect(screen.getByRole('banner')).not.toHaveAttribute('inert')
    })
  })

  it('has no serious accessibility violations', async () => {
    const { container } = renderHeader()
    expect(await seriousViolations(container)).toEqual([])
  })
})
