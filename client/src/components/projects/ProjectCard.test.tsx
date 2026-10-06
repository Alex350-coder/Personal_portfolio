import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { ProjectCard } from '@/components/projects/ProjectCard'
import type { Project } from '@/data/project.schema'
import { seriousViolations } from '@/test/axe'

const project: Project = {
  slug: 'demo',
  title: 'Proyecto demo',
  summary: 'Resumen corto del proyecto.',
  category: 'seguridad',
  status: 'en-desarrollo',
  year: 2026,
  stack: ['typescript', 'react', 'nestjs', 'postgresql', 'docker', 'redis'],
  featured: 2,
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Resuelve un problema concreto.',
}

const renderCard = (props: Partial<Parameters<typeof ProjectCard>[0]> = {}) =>
  render(
    <MemoryRouter>
      <ProjectCard project={project} {...props} />
    </MemoryRouter>,
  )

describe('ProjectCard (compact)', () => {
  it('links the title to the detail route', () => {
    renderCard()
    expect(screen.getByRole('link', { name: 'Proyecto demo' })).toHaveAttribute('href', '/proyectos/demo')
  })

  it('renders title as an h3 by default and honours headingLevel', () => {
    const { unmount } = renderCard()
    expect(screen.getByRole('heading', { level: 3, name: 'Proyecto demo' })).toBeInTheDocument()
    unmount()
    renderCard({ headingLevel: 2 })
    expect(screen.getByRole('heading', { level: 2, name: 'Proyecto demo' })).toBeInTheDocument()
  })

  it('shows category and status as text with screen-reader prefixes', () => {
    renderCard()
    expect(screen.getByText('Seguridad')).toBeInTheDocument()
    expect(screen.getByText('En desarrollo')).toBeInTheDocument()
    expect(screen.getByText('Estado:')).toHaveClass('sr-only')
  })

  it('shows the summary but not the problem line', () => {
    renderCard()
    expect(screen.getByText('Resumen corto del proyecto.')).toBeInTheDocument()
    expect(screen.queryByText('Resuelve un problema concreto.')).toBeNull()
  })

  it('caps the stack at 4 chips plus a "+n" counter', () => {
    renderCard()
    const list = screen.getByRole('list', { name: 'Tecnologías' })
    const items = within(list).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual(['TypeScript', 'React', 'NestJS', 'PostgreSQL', '+2y 2 más'])
  })

  it('offers a safe external repo link and no live link when none exists', () => {
    renderCard()
    const repo = screen.getByRole('link', { name: /Código en GitHub/ })
    expect(repo).toHaveAttribute('href', 'https://github.com/Alex350-coder/demo')
    expect(repo).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.queryByRole('link', { name: /Demo en vivo/ })).toBeNull()
  })

  it('names each repo link after its project so repeated links are distinguishable', () => {
    renderCard()
    expect(screen.getByRole('link', { name: /Código en GitHub de Proyecto demo/ })).toBeInTheDocument()
  })

  it('renders the live link when the project has one', () => {
    renderCard({ project: { ...project, links: { ...project.links, live: 'https://demo.example.com' } } })
    expect(screen.getByRole('link', { name: /Demo en vivo/ })).toHaveAttribute('href', 'https://demo.example.com')
  })

  it('has no serious axe violations', async () => {
    const { container } = renderCard()
    expect(await seriousViolations(container)).toEqual([])
  })
})

describe('ProjectCard (featured)', () => {
  it('adds the problem line and a decorative cover with the featured order', () => {
    renderCard({ variant: 'featured' })
    expect(screen.getByText('Resuelve un problema concreto.')).toBeInTheDocument()
    expect(screen.getByText('02')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the real cover image with its required alt text when present', () => {
    const cover = { src: '/c.webp', alt: 'Captura del panel', width: 800, height: 450 }
    renderCard({ variant: 'featured', project: { ...project, cover } })
    expect(screen.getByRole('img', { name: 'Captura del panel' })).toHaveAttribute('loading', 'lazy')
  })

  it('has no serious axe violations', async () => {
    const { container } = renderCard({ variant: 'featured' })
    expect(await seriousViolations(container)).toEqual([])
  })
})
