import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestRouter } from '@/app/router'
import { projects } from '@/data/projects'
import { featuredSection } from '@/data/projects-ui'
import { projectsIndex } from '@/data/routes'
import { getByTech } from '@/lib/projects'

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

function renderAt(path: string) {
  const router = createTestRouter([path])
  render(<RouterProvider router={router} />)
  return router
}

describe('projects navigation flows', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('goes from the Home featured section to the full index', async () => {
    const user = userEvent.setup()
    const router = renderAt('/')
    await user.click(screen.getByRole('link', { name: featuredSection.seeAll }))
    expect(router.state.location.pathname).toBe('/proyectos')
    expect(screen.getByRole('heading', { level: 1, name: projectsIndex.heading })).toBeInTheDocument()
  })

  it('goes from a technology chip to the index filtered by it', async () => {
    const user = userEvent.setup()
    const router = renderAt('/')
    const count = getByTech('rust').length
    await user.click(screen.getByRole('link', { name: /^Rust/ }))
    expect(router.state.location.pathname).toBe('/proyectos')
    expect(router.state.location.search).toBe('?tec=rust')
    expect(screen.getByRole('status')).toHaveTextContent(projectsIndex.count(count))
    const list = screen.getByRole('list', { name: projectsIndex.resultsLabel })
    expect(within(list).getAllByRole('heading', { level: 2 })).toHaveLength(count)
  })

  it('opens a project card on its detail route', async () => {
    const user = userEvent.setup()
    const router = renderAt('/proyectos')
    const first = projects[0]!
    await user.click(screen.getByRole('link', { name: first.title }))
    expect(router.state.location.pathname).toBe(`/proyectos/${first.slug}`)
  })

  it('restores a filtered URL after a back navigation', async () => {
    const user = userEvent.setup()
    const router = renderAt('/proyectos?categoria=seguridad')
    await user.click(screen.getByRole('button', { name: 'Web' }))
    expect(router.state.location.search).toBe('?categoria=web')
    await act(async () => {
      await router.navigate(-1)
    })
    expect(router.state.location.search).toBe('?categoria=seguridad')
    expect(screen.getByRole('button', { name: 'Seguridad' })).toHaveAttribute('aria-pressed', 'true')
  })
})
