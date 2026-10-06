import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { techEvidence } from '@/data/projects-ui'
import { sections } from '@/data/sections'
import { techGroups, technologies } from '@/data/technologies'
import { getByTech } from '@/lib/projects'
import { seriousViolations } from '@/test/axe'
import { TechnologiesSection } from '@/sections/technologies/TechnologiesSection'

const renderSection = () =>
  render(
    <MemoryRouter>
      <TechnologiesSection />
    </MemoryRouter>,
  )

describe('TechnologiesSection', () => {
  it('is the #tecnologias region named by its h2, with the lead from data', () => {
    renderSection()
    const region = screen.getByRole('region', { name: sections.tecnologias.heading })
    expect(region).toHaveAttribute('id', 'tecnologias')
    expect(within(region).getByText(sections.tecnologias.lead)).toBeInTheDocument()
  })

  it('renders one labelled list per group, in order', () => {
    renderSection()
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(techGroups.map((group) => group.label))
    expect(screen.getAllByRole('list', { name: /.+/ })).toHaveLength(techGroups.length)
  })

  it('lists every technology exactly once under its group, in order', () => {
    renderSection()
    for (const group of techGroups) {
      const list = screen.getByRole('list', { name: group.label })
      const expected = technologies.filter((tech) => tech.group === group.id).map((tech) => tech.label)
      const items = within(list).getAllByRole('listitem')
      expect(items).toHaveLength(expected.length)
      items.forEach((item, index) => expect(item.textContent?.startsWith(expected[index]!)).toBe(true))
    }
  })

  it('links a technology to the filtered index with its project count', () => {
    renderSection()
    const count = getByTech('typescript').length
    expect(count).toBeGreaterThan(0)
    const link = screen.getByRole('link', { name: `TypeScript${techEvidence.countSr(count)}` })
    expect(link).toHaveAttribute('href', '/proyectos?tec=typescript')
  })

  it('renders technologies without projects as plain text, never as a dead link', () => {
    renderSection()
    const unused = technologies.find((tech) => getByTech(tech.id).length === 0)
    expect(unused).toBeDefined()
    expect(screen.queryByRole('link', { name: new RegExp(`^${unused!.label}`) })).toBeNull()
  })

  it('counts come from the data: every link has at least one project', () => {
    renderSection()
    const region = screen.getByRole('region', { name: sections.tecnologias.heading })
    for (const link of within(region).getAllByRole('link')) {
      const tec = new URL(link.getAttribute('href')!, 'https://x.test').searchParams.get('tec')
      expect(getByTech(tec as never).length, tec ?? '').toBeGreaterThan(0)
    }
  })

  it('shows no skill bars, levels or percentages', () => {
    renderSection()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/\d\s*%|★|nivel (básico|medio|avanzado)/i)
  })

  it('explains what the number means, with no placeholder left', () => {
    renderSection()
    expect(screen.getByText(techEvidence.note)).toBeInTheDocument()
    expect(screen.queryByText(/PLACEHOLDER: projects that use each technology/)).toBeNull()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = renderSection()
    expect(await seriousViolations(container)).toEqual([])
  })
})
