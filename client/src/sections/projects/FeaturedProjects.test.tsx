import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { featuredSection } from '@/data/projects-ui'
import { getFeatured } from '@/lib/projects'
import { FeaturedProjects } from '@/sections/projects/FeaturedProjects'
import { seriousViolations } from '@/test/axe'

const renderSection = () =>
  render(
    <MemoryRouter>
      <FeaturedProjects />
    </MemoryRouter>,
  )

describe('FeaturedProjects', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('is the #proyectos region named by its h2', () => {
    renderSection()
    const region = screen.getByRole('region', { name: 'Proyectos seleccionados' })
    expect(region).toHaveAttribute('id', 'proyectos')
  })

  it('shows at most five featured projects in their explicit order', () => {
    renderSection()
    const featured = getFeatured()
    expect(featured.length).toBeLessThanOrEqual(5)
    const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)
    expect(titles.slice(0, featured.length)).toEqual(featured.map((project) => project.title))
  })

  it('renders the first project as featured and the rest as compact cards', () => {
    const { container } = renderSection()
    const variants = Array.from(container.querySelectorAll('[data-variant]')).map((el) => el.getAttribute('data-variant'))
    expect(variants[0]).toBe('featured')
    expect(variants.slice(1).every((variant) => variant === 'compact')).toBe(true)
  })

  it('links to the full index', () => {
    renderSection()
    expect(screen.getByRole('link', { name: featuredSection.seeAll })).toHaveAttribute('href', '/proyectos')
  })

  it('offers the GitHub profile card with a safe external link', () => {
    renderSection()
    const link = screen.getByRole('link', { name: new RegExp(featuredSection.github.cta) })
    expect(link).toHaveAttribute('href', 'https://github.com/Alex350-coder')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('lists every card inside a labelled list', () => {
    renderSection()
    const list = screen.getByRole('list', { name: featuredSection.listLabel })
    expect(within(list).getAllByRole('listitem').length).toBeGreaterThanOrEqual(getFeatured().length + 1)
  })

  it('staggers the card reveals with a capped delay', () => {
    const { container } = renderSection()
    const delays = Array.from(container.querySelectorAll<HTMLElement>('[data-revealed]')).map((el) => el.style.transitionDelay)
    expect(delays[0]).toBe('0ms')
    expect(delays[1]).toBe('80ms')
    expect(Math.max(...delays.map((delay) => parseInt(delay, 10)))).toBe(240)
  })

  it('shows every card immediately and turns the pointer glow off under reduced motion', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} })))
    const { container } = renderSection()
    for (const el of container.querySelectorAll('[data-revealed]')) expect(el).toHaveAttribute('data-revealed', 'true')
    for (const card of container.querySelectorAll('[data-glow]')) expect(card).toHaveAttribute('data-glow', 'off')
  })

  it('has no serious axe violations', async () => {
    const { container } = renderSection()
    expect(await seriousViolations(container)).toEqual([])
  })
})
