import { render, screen, within } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestRouter } from '@/app/router'
import { validateProjects, type Project } from '@/data/project.schema'
import { projects } from '@/data/projects'
import { getBySlug, filterProjects } from '@/lib/projects'

/**
 * AC1 (Plan.md Phase 3): adding a project means editing `projects.ts` only. The dataset module is
 * replaced by itself plus one fixture entry; no component, selector or route is touched.
 */
const { FIXTURE } = vi.hoisted(() => ({
  FIXTURE: {
    slug: 'fixture-project',
    title: 'Proyecto de prueba',
    summary: 'Entrada añadida solo en los datos para probar el flujo completo.',
    category: 'herramientas',
    status: 'archivado',
    year: 2026,
    stack: ['claude'],
    links: { repo: 'https://github.com/Alex350-coder/fixture-project' },
    problem: 'Demuestra que añadir un proyecto no requiere tocar componentes.',
  } satisfies Project,
}))

vi.mock('@/data/projects', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/data/projects')>()
  return { projects: [...original.projects, FIXTURE] }
})

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

function renderAt(path: string) {
  const router = createTestRouter([path])
  render(<RouterProvider router={router} />)
  return router
}

describe('adding a project is a data-only change', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('keeps the extended dataset valid', () => {
    expect(validateProjects(projects)).toEqual([])
    expect(projects.at(-1)?.slug).toBe(FIXTURE.slug)
  })

  it('can be looked up by slug (detail-route lookup)', () => {
    expect(getBySlug(FIXTURE.slug)?.title).toBe(FIXTURE.title)
  })

  it('appears in the filtered results, hidden while archived unless asked', () => {
    expect(filterProjects(projects, { tec: 'claude' })).toEqual([])
    expect(filterProjects(projects, { tec: 'claude', includeArchived: true }).map((p) => p.slug)).toEqual([FIXTURE.slug])
  })

  it('renders as a card on the index when its filters are applied', () => {
    renderAt('/proyectos?tec=claude&archivados=1')
    const list = screen.getByRole('list', { name: 'Resultados' })
    const card = within(list).getByRole('heading', { level: 2, name: FIXTURE.title })
    expect(card).toBeInTheDocument()
    expect(within(list).getByRole('link', { name: FIXTURE.title })).toHaveAttribute('href', `/proyectos/${FIXTURE.slug}`)
    expect(within(list).getByRole('link', { name: /Código en GitHub/ })).toHaveAttribute('href', FIXTURE.links.repo)
    expect(screen.getByRole('status')).toHaveTextContent('1 proyecto')
  })

  it('offers its technology in the select and the archived toggle, derived from the data', () => {
    renderAt('/proyectos')
    expect(screen.getByRole('option', { name: 'Claude' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mostrar archivados' })).toBeInTheDocument()
  })

  it('resolves its detail route', () => {
    renderAt(`/proyectos/${FIXTURE.slug}`)
    expect(screen.getByRole('heading', { level: 1, name: FIXTURE.title })).toBeInTheDocument()
  })
})
