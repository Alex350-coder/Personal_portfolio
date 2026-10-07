import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectNarrative } from '@/components/projects/ProjectNarrative'
import type { Project } from '@/data/project.schema'
import { seriousViolations } from '@/test/axe'

const base: Project = {
  slug: 'demo',
  title: 'Demo',
  summary: 'Resumen.',
  category: 'web',
  status: 'completado',
  year: 2026,
  stack: ['typescript'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Resuelve una cosa concreta.',
}

describe('ProjectNarrative', () => {
  it('renders only the problem when no optional field exists (text-only)', () => {
    render(<ProjectNarrative project={base} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Qué problema resuelve' })).toBeInTheDocument()
    expect(screen.getByText('Resuelve una cosa concreta.')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1)
  })

  it('renders highlights as a list under their own h2', () => {
    render(<ProjectNarrative project={{ ...base, highlights: ['Uno', 'Dos'] }} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Aspectos técnicos destacados' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Uno', 'Dos'])
  })

  it('renders decisions with h3 titles nested under the decisions h2', () => {
    render(<ProjectNarrative project={{ ...base, decisions: [{ title: 'Cookies httpOnly', body: 'Evita XSS.' }] }} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Decisiones técnicas' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Cookies httpOnly' })).toBeInTheDocument()
    expect(screen.getByText('Evita XSS.')).toBeInTheDocument()
  })

  it('skips empty optional arrays', () => {
    render(<ProjectNarrative project={{ ...base, highlights: [], decisions: [] }} />)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1)
  })

  it('has no serious accessibility violations with every field', async () => {
    const { container } = render(
      <ProjectNarrative project={{ ...base, highlights: ['Uno'], decisions: [{ title: 'T', body: 'B' }] }} />,
    )
    expect(await seriousViolations(container)).toEqual([])
  })
})
