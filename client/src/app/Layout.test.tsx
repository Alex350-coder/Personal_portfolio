import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Layout from '@/app/Layout'

function renderLayout(initialEntries: string[] = ['/']) {
  const router = createMemoryRouter(
    [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: (
              <>
                <h1>Inicio</h1>
                <Link to="/otra">Ir a otra</Link>
                <Link to="/#destino">Ir al destino</Link>
                <section id="destino" aria-label="Destino" />
              </>
            ),
          },
          { path: '/otra', element: <h1>Otra</h1> },
        ],
      },
    ],
    { initialEntries },
  )
  render(<RouterProvider router={router} />)
  return router
}

describe('Layout', () => {
  beforeEach(() => {
    // jsdom does not implement scrolling.
    vi.stubGlobal('scrollTo', vi.fn())
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('exposes main#contenido, a banner and a footer', () => {
    renderLayout()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'contenido')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('puts the skip link first in the tab order and targets main', async () => {
    renderLayout()
    const user = userEvent.setup()
    await user.tab()
    const skip = screen.getByRole('link', { name: 'Saltar al contenido' })
    expect(skip).toHaveFocus()
    expect(skip).toHaveAttribute('href', '#contenido')
  })

  it('does not steal focus on the first render', () => {
    renderLayout()
    expect(screen.getByRole('main')).not.toHaveFocus()
  })

  it('moves focus to main when the route changes', async () => {
    renderLayout()
    await userEvent.setup().click(screen.getByRole('link', { name: 'Ir a otra' }))
    expect(await screen.findByRole('heading', { name: 'Otra' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('moves focus to the hash target (not main) on same-page hash navigation', async () => {
    renderLayout()
    const link = screen.getByRole('link', { name: 'Ir al destino' })
    await userEvent.setup().click(link)
    expect(screen.getByRole('main')).not.toHaveFocus()
    expect(screen.getByRole('region', { name: 'Destino' })).toHaveFocus()
  })

  it('ignores a hash without a matching element', async () => {
    const router = renderLayout()
    await act(() => router.navigate('/#no-existe'))
    expect(screen.getByRole('main')).not.toHaveFocus()
    expect(document.body).toHaveFocus()
  })

  it('scrolls to the hash target on arrival', () => {
    renderLayout(['/#destino'])
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
