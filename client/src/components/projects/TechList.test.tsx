import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { TechList } from '@/components/projects/TechList'
import type { Project } from '@/data/project.schema'
import { seriousViolations } from '@/test/axe'

const project: Project = {
  slug: 'demo',
  title: 'Demo',
  summary: 'Resumen.',
  category: 'web',
  status: 'completado',
  year: 2026,
  stack: ['typescript', 'react'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Problema.',
}

const renderList = () =>
  render(
    <MemoryRouter>
      <TechList project={project} />
    </MemoryRouter>,
  )

describe('TechList', () => {
  it('links every technology to the index filtered by it', () => {
    renderList()
    expect(screen.getByRole('heading', { level: 2, name: 'Tecnologías usadas' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver proyectos con TypeScript' })).toHaveAttribute(
      'href',
      '/proyectos?tec=typescript',
    )
    expect(screen.getByRole('link', { name: 'Ver proyectos con React' })).toHaveAttribute('href', '/proyectos?tec=react')
  })

  it('has no serious accessibility violations', async () => {
    const { container } = renderList()
    expect(await seriousViolations(container)).toEqual([])
  })
})
