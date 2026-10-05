import { act, render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestRouter } from '@/app/router'
import { notFound, projectsIndexStub } from '@/data/routes'
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

  it('renders the /proyectos stub with one h1 and an explicit placeholder', () => {
    renderAt('/proyectos')
    expect(screen.getByRole('heading', { level: 1, name: projectsIndexStub.heading })).toBeInTheDocument()
    expect(screen.getByText(/\[\[PLACEHOLDER: complete project index/)).toBeInTheDocument()
  })

  it('renders the /proyectos/:slug stub with the slug as plain text', () => {
    renderAt('/proyectos/attack-surface-studio')
    expect(screen.getByRole('heading', { level: 1, name: 'attack-surface-studio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver todos los proyectos' })).toHaveAttribute('href', '/proyectos')
  })

  it('does not interpret markup in the slug', () => {
    renderAt('/proyectos/%3Cimg%20src=x%20onerror=alert(1)%3E')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('<img src=x onerror=alert(1)>')
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

  it.each(['/proyectos', '/proyectos/algo', '/no-existe'])('%s has no serious accessibility violations', async (path) => {
    renderAt(path)
    expect(await seriousViolations(document.body)).toEqual([])
  })
})
