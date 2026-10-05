import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it, vi } from 'vitest'

import { createTestRouter } from '@/app/router'
import { navItems } from '@/data/navigation'

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

function renderHome() {
  render(<RouterProvider router={createTestRouter(['/'])} />)
}

describe('HomePage', () => {
  it('has exactly one h1 and the Hero landmark the header observes', () => {
    renderHome()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.getElementById('inicio')).not.toBeNull()
  })

  it('has every anchor the navigation and the Hero CTAs point to', () => {
    renderHome()
    for (const id of [...navItems.map((item) => item.id), 'inicio']) {
      expect(document.getElementById(id), `#${id}`).not.toBeNull()
    }
  })

  it('orders the sections as in the information architecture', () => {
    renderHome()
    const order = ['inicio', 'sobre-mi', 'proyectos', 'tecnologias', 'contacto']
    const positions = order.map((id) => {
      const topLevel = document.getElementById(id)!.closest('main > *')
      return Array.from(document.querySelectorAll('main > *')).indexOf(topLevel!)
    })
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(positions.every((position) => position >= 0)).toBe(true)
  })

  it('names every section region by its heading', () => {
    renderHome()
    for (const name of ['Desarrollo web con la seguridad en mente', 'Proyectos seleccionados', 'Hablemos']) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument()
    }
  })

  it('shows explicit placeholders for sections that belong to later phases', () => {
    renderHome()
    expect(screen.getByText(/\[\[PLACEHOLDER: featured projects section/)).toBeInTheDocument()
    expect(screen.getByText(/\[\[PLACEHOLDER: contact section/)).toBeInTheDocument()
  })
})
