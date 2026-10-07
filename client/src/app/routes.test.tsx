import { act, render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestRouter } from '@/app/router'
import { notFound, projectNotFound, projectsIndex } from '@/data/routes'
import { seriousViolations } from '@/test/axe'

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

function renderAt(path: string) {
  const router = createTestRouter([path])
  render(<RouterProvider router={router} />)
  return router
}

describe('route table', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('renders the /proyectos index with one h1 and the project list', () => {
    renderAt('/proyectos')
    expect(screen.getByRole('heading', { level: 1, name: projectsIndex.heading })).toBeInTheDocument()
    expect(screen.queryByText(/PLACEHOLDER: complete project index/)).toBeNull()
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0)
  })

  it('renders the project detail for a known slug', () => {
    renderAt('/proyectos/attack-surface-studio')
    expect(screen.getByRole('heading', { level: 1, name: 'Attack Surface Studio' })).toBeInTheDocument()
  })

  it('shows the project 404 with a link to the index for an unknown slug', () => {
    renderAt('/proyectos/no-existe')
    expect(screen.getByRole('heading', { level: 1, name: projectNotFound.heading })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: projectNotFound.action })).toHaveAttribute('href', '/proyectos')
  })

  it('does not interpret markup in the slug', () => {
    renderAt('/proyectos/%3Cimg%20src=x%20onerror=alert(1)%3E')
    expect(screen.getByRole('heading', { level: 1, name: projectNotFound.heading })).toBeInTheDocument()
    expect(document.querySelector('main img')).toBeNull()
  })

  it('shows the in-theme 404 for unknown paths, inside the layout shell', () => {
    renderAt('/no-existe')
    expect(screen.getByRole('heading', { level: 1, name: notFound.heading })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'contenido')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: notFound.action })).toHaveAttribute('href', '/')
  })

  it('shows the 404 for unknown nested paths under /proyectos', () => {
    renderAt('/proyectos/uno/dos')
    expect(screen.getByRole('heading', { level: 1, name: notFound.heading })).toBeInTheDocument()
  })

  it('moves from the 404 back home with the link', async () => {
    const router = renderAt('/no-existe')
    await act(() => router.navigate('/'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ander Alexander Aguirre Tejada')
  })

  it.each(['/proyectos', '/proyectos/algo', '/proyectos/saas-pensiones', '/no-existe'])('%s has no serious accessibility violations', async (path) => {
    renderAt(path)
    expect(await seriousViolations(document.body)).toEqual([])
  })
})
