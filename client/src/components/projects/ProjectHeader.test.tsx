import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { ProjectHeader } from '@/components/projects/ProjectHeader'
import type { Project } from '@/data/project.schema'
import { seriousViolations } from '@/test/axe'

const project: Project = {
  slug: 'demo',
  title: 'Proyecto demo',
  summary: 'Resumen corto.',
  category: 'seguridad',
  status: 'en-desarrollo',
  year: 2026,
  stack: ['typescript'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Problema.',
}

function renderHeader(value: Project) {
  return render(
    <MemoryRouter>
      <ProjectHeader project={value} headingId="h" />
    </MemoryRouter>,
  )
}

describe('ProjectHeader', () => {
  it('renders the title as the single h1 with summary, badges and year', () => {
    renderHeader(project)
    expect(screen.getByRole('heading', { level: 1, name: 'Proyecto demo' })).toHaveAttribute('id', 'h')
    expect(screen.getByText('Resumen corto.')).toBeInTheDocument()
    expect(screen.getByText('Seguridad')).toBeInTheDocument()
    expect(screen.getByText('En desarrollo')).toBeInTheDocument()
    expect(screen.getByText('2026')).toBeInTheDocument()
  })

  it('omits the role and live link when the data has none', () => {
    renderHeader(project)
    expect(screen.queryByText('Rol')).toBeNull()
    expect(screen.queryByRole('link', { name: /Demo en vivo/ })).toBeNull()
  })

  it('shows the role and both links with safe attributes when present', () => {
    renderHeader({ ...project, role: 'Backend', links: { repo: project.links.repo, live: 'https://demo.example.com' } })
    expect(screen.getByText('Backend')).toBeInTheDocument()
    const repo = screen.getByRole('link', { name: /Código en GitHub de Proyecto demo/ })
    expect(repo).toHaveAttribute('target', '_blank')
    expect(repo).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: /Demo en vivo de Proyecto demo/ })).toHaveAttribute(
      'href',
      'https://demo.example.com',
    )
  })

  it('links back to the index', () => {
    renderHeader(project)
    expect(screen.getByRole('link', { name: /Todos los proyectos/ })).toHaveAttribute('href', '/proyectos')
  })

  it('has no serious accessibility violations', async () => {
    const { container } = renderHeader(project)
    expect(await seriousViolations(container)).toEqual([])
  })
})
