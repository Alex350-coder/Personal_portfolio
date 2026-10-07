import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { ProjectNav } from '@/components/projects/ProjectNav'
import { projects } from '@/data/projects'
import { seriousViolations } from '@/test/axe'

const first = projects[0]
const second = projects[1]
const last = projects[projects.length - 1]
if (!first || !second || !last) throw new Error('dataset too small')

const renderNav = (project: typeof first) =>
  render(
    <MemoryRouter>
      <ProjectNav project={project} />
    </MemoryRouter>,
  )

describe('ProjectNav', () => {
  it('links the first project only to its next neighbour', () => {
    renderNav(first)
    expect(screen.queryByRole('link', { name: /Anterior/ })).toBeNull()
    expect(screen.getByRole('link', { name: new RegExp(second.title) })).toHaveAttribute('href', `/proyectos/${second.slug}`)
  })

  it('links the last project only to its previous neighbour', () => {
    renderNav(last)
    expect(screen.queryByRole('link', { name: /Siguiente/ })).toBeNull()
    expect(screen.getByRole('link', { name: /Anterior/ })).toHaveAttribute('rel', 'prev')
  })

  it('links both neighbours for a middle project', () => {
    renderNav(second)
    expect(screen.getByRole('link', { name: /Anterior/ })).toHaveAttribute('href', `/proyectos/${first.slug}`)
    expect(screen.getByRole('link', { name: /Siguiente/ })).toHaveAttribute('rel', 'next')
  })

  it('is a labelled navigation landmark without serious accessibility violations', async () => {
    const { container } = renderNav(second)
    expect(screen.getByRole('navigation', { name: 'Más proyectos' })).toBeInTheDocument()
    expect(await seriousViolations(container)).toEqual([])
  })
})
