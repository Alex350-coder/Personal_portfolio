import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { MobileMenu } from '@/components/layout/MobileMenu'
import { navItems } from '@/data/navigation'
import { seriousViolations } from '@/test/axe'

type MediaListener = () => void
let mediaListeners: MediaListener[] = []

function renderMenu(getCurrent: (id: string) => 'page' | 'location' | undefined = () => undefined) {
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <>
            <a href="#skip">Saltar</a>
            <header>
              <MobileMenu items={navItems} getCurrent={(item) => getCurrent(item.id)} />
            </header>
            <main>
              <button type="button">Contenido</button>
            </main>
            <footer>pie</footer>
          </>
        ),
      },
    ],
    { initialEntries: ['/'] },
  )
  render(<RouterProvider router={router} />)
  return router
}

const toggle = () => screen.getByRole('button', { name: /menú|cerrar/i })

describe('MobileMenu', () => {
  beforeEach(() => {
    mediaListeners = []
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        addEventListener: (_: string, listener: MediaListener) => mediaListeners.push(listener),
        removeEventListener: (_: string, listener: MediaListener) => {
          mediaListeners = mediaListeners.filter((item) => item !== listener)
        },
      })),
    )
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts collapsed, with the toggle wired to the panel', () => {
    renderMenu()
    const button = toggle()
    expect(button).toHaveAttribute('aria-expanded', 'false')
    const panelId = button.getAttribute('aria-controls')
    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toHaveAttribute('hidden')
    expect(screen.queryByRole('link', { name: 'Sobre mí' })).not.toBeInTheDocument()
  })

  it('opens on click and focuses the first link', async () => {
    renderMenu()
    await userEvent.setup().click(toggle())
    expect(toggle()).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Menú principal' })).toBeInTheDocument()
    const links = screen.getAllByRole('link', { name: /sobre mí|proyectos|tecnologías|contacto/i })
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/#sobre-mi',
      '/#proyectos',
      '/#tecnologias',
      '/#contacto',
    ])
    expect(links[0]).toHaveFocus()
  })

  it('closes on Escape and returns focus to the toggle', async () => {
    renderMenu()
    const user = userEvent.setup()
    await user.click(toggle())
    await user.keyboard('{Escape}')
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(toggle()).toHaveFocus()
  })

  it('closes when a link is chosen', async () => {
    renderMenu()
    const user = userEvent.setup()
    await user.click(toggle())
    await user.click(screen.getByRole('link', { name: 'Contacto' }))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes when the route changes by any other means (back/forward, links elsewhere)', async () => {
    const router = renderMenu()
    await userEvent.setup().click(toggle())
    await act(() => router.navigate('/proyectos'))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('stays closed after Back then Forward', async () => {
    const router = renderMenu()
    await act(() => router.navigate('/proyectos'))
    await userEvent.setup().click(toggle())
    await act(() => router.navigate(-1))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    await act(() => router.navigate(1))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('hands focus back to the toggle when a link is chosen', async () => {
    renderMenu()
    const user = userEvent.setup()
    await user.click(toggle())
    await user.click(screen.getByRole('link', { name: 'Contacto' }))
    expect(toggle()).toHaveFocus()
  })

  it('toggles closed from the button itself', async () => {
    renderMenu()
    const user = userEvent.setup()
    await user.click(toggle())
    await user.click(toggle())
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('makes the rest of the page inert while open and restores it after', async () => {
    renderMenu()
    const user = userEvent.setup()
    const main = screen.getByRole('main')
    const footer = screen.getByRole('contentinfo')
    const header = screen.getByRole('banner')
    await user.click(toggle())
    expect(main).toHaveAttribute('inert')
    expect(footer).toHaveAttribute('inert')
    expect(header).not.toHaveAttribute('inert')
    await user.keyboard('{Escape}')
    expect(main).not.toHaveAttribute('inert')
    expect(footer).not.toHaveAttribute('inert')
  })

  it('locks page scroll while open and releases it after', async () => {
    renderMenu()
    const user = userEvent.setup()
    await user.click(toggle())
    expect(document.documentElement.style.overflow).toBe('hidden')
    await user.keyboard('{Escape}')
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('keeps pre-existing inert siblings inert after closing', async () => {
    renderMenu()
    const user = userEvent.setup()
    const footer = screen.getByRole('contentinfo')
    footer.setAttribute('inert', '')
    await user.click(toggle())
    await user.keyboard('{Escape}')
    expect(footer).toHaveAttribute('inert')
  })

  it('closes when the viewport grows to the desktop layout', async () => {
    renderMenu()
    await userEvent.setup().click(toggle())
    act(() => mediaListeners.forEach((listener) => listener()))
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('reports the current entry to assistive tech', async () => {
    renderMenu((id) => (id === 'proyectos' ? 'page' : undefined))
    await userEvent.setup().click(toggle())
    expect(screen.getByRole('link', { name: 'Proyectos' })).toHaveAttribute('aria-current', 'page')
  })

  it('has no serious accessibility violations, open or closed', async () => {
    const { container } = render(<div />)
    expect(await seriousViolations(container)).toEqual([])
    renderMenu()
    expect(await seriousViolations(document.body)).toEqual([])
    await userEvent.setup().click(toggle())
    expect(await seriousViolations(document.body)).toEqual([])
  })
})
