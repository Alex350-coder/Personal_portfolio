import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectSecurity } from '@/components/projects/ProjectSecurity'
import type { Project } from '@/data/project.schema'

const base: Project = {
  slug: 'demo',
  title: 'Demo',
  summary: 'Resumen.',
  category: 'seguridad',
  status: 'completado',
  year: 2026,
  stack: ['typescript'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Problema.',
}

describe('ProjectSecurity', () => {
  it('renders nothing without security notes', () => {
    const { container } = render(<ProjectSecurity project={base} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing for an empty list', () => {
    const { container } = render(<ProjectSecurity project={{ ...base, security: [] }} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders each note under its own h2', () => {
    render(<ProjectSecurity project={{ ...base, security: ['Rotación de JWT', 'CSRF con doble token'] }} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Notas de seguridad' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Rotación de JWT',
      'CSRF con doble token',
    ])
  })
})
