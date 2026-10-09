import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { contactCta } from '@/data/contact'
import { projectsIndex } from '@/data/routes'
import { filterLabels } from '@/data/projects-ui'
import { projects } from '@/data/projects'
import ProjectsPage from '@/pages/ProjectsPage'
import { seriousViolations } from '@/test/axe'

const renderAt = (url = '/proyectos') =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ProjectsPage />
    </MemoryRouter>,
  )

/** The closing contact CTA has its own h2; these tests are about the page content. */
const visibleTitles = () =>
  screen
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)
    .filter((text) => text !== contactCta.index.heading)

describe('ProjectsPage', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('has one h1 and lists every non-archived project by default', () => {
    renderAt()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const expected = projects.filter((project) => project.status !== 'archivado')
    expect(visibleTitles()).toEqual(expected.map((project) => project.title))
  })

  it('announces the result count in a polite live region', () => {
    renderAt()
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status).toHaveTextContent(projectsIndex.count(projects.length))
  })

  it('restores filters from the URL and updates the count', () => {
    renderAt('/proyectos?categoria=seguridad')
    const expected = projects.filter((project) => project.category === 'seguridad')
    expect(visibleTitles()).toEqual(expected.map((project) => project.title))
    expect(screen.getByRole('status')).toHaveTextContent(projectsIndex.count(expected.length))
    expect(screen.getByRole('button', { name: 'Seguridad' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('filters by technology from the URL', () => {
    renderAt('/proyectos?tec=rust')
    expect(visibleTitles()).toEqual(projects.filter((project) => project.stack.includes('rust')).map((project) => project.title))
  })

  it('combines filters and updates the list when a toggle is pressed', async () => {
    const user = userEvent.setup()
    renderAt()
    await user.click(screen.getByRole('button', { name: 'Seguridad' }))
    await user.click(screen.getByRole('button', { name: 'En desarrollo' }))
    const expected = projects.filter((project) => project.category === 'seguridad' && project.status === 'en-desarrollo')
    expect(visibleTitles()).toEqual(expected.map((project) => project.title))
  })

  it('shows an empty state with a way out when nothing matches, and clears the filters', async () => {
    const user = userEvent.setup()
    renderAt('/proyectos?categoria=ia')
    expect(screen.getByText(projectsIndex.emptyTitle)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(projectsIndex.count(0))
    await user.click(screen.getAllByRole('button', { name: filterLabels.clear })[0]!)
    expect(screen.queryByText(projectsIndex.emptyTitle)).toBeNull()
    expect(visibleTitles().length).toBeGreaterThan(0)
  })

  it('moves focus to the result count after clearing, so it never falls to the page body', async () => {
    const user = userEvent.setup()
    renderAt('/proyectos?categoria=ia')
    await user.click(screen.getAllByRole('button', { name: filterLabels.clear })[0]!)
    expect(screen.getByRole('status')).toHaveFocus()
  })

  it('ignores invalid URL filter values instead of breaking', () => {
    renderAt('/proyectos?categoria=hack&tec=cobol')
    expect(visibleTitles()).toHaveLength(projects.length)
  })

  it('offers a safe external repo link on each card', () => {
    renderAt()
    const list = screen.getByRole('list', { name: projectsIndex.resultsLabel })
    const repoLinks = within(list).getAllByRole('link', { name: /Código en GitHub/ })
    expect(repoLinks).toHaveLength(projects.length)
    for (const link of repoLinks) expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has no serious axe violations', async () => {
    const { container } = renderAt('/proyectos?categoria=web')
    expect(await seriousViolations(container)).toEqual([])
  })
})
