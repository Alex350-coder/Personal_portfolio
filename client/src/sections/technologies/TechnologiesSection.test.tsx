import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { sections } from '@/data/sections'
import { techGroups, technologies } from '@/data/technologies'
import { seriousViolations } from '@/test/axe'
import { TechnologiesSection } from '@/sections/technologies/TechnologiesSection'

describe('TechnologiesSection', () => {
  it('is the #tecnologias region named by its h2, with the lead from data', () => {
    render(<TechnologiesSection />)
    const region = screen.getByRole('region', { name: sections.tecnologias.heading })
    expect(region).toHaveAttribute('id', 'tecnologias')
    expect(within(region).getByText(sections.tecnologias.lead)).toBeInTheDocument()
  })

  it('renders one labelled list per group, in order', () => {
    render(<TechnologiesSection />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(techGroups.map((group) => group.label))
    expect(screen.getAllByRole('list', { name: /.+/ })).toHaveLength(techGroups.length)
  })

  it('lists every technology exactly once under its group', () => {
    render(<TechnologiesSection />)
    for (const group of techGroups) {
      const list = screen.getByRole('list', { name: group.label })
      const expected = technologies.filter((tech) => tech.group === group.id).map((tech) => tech.label)
      expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(expected)
    }
  })

  it('shows no skill bars, levels or percentages', () => {
    render(<TechnologiesSection />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/\d\s*%|★|nivel (básico|medio|avanzado)/i)
  })

  it('flags the missing project evidence as an explicit placeholder until Phase 3', () => {
    render(<TechnologiesSection />)
    expect(screen.getByText(/\[\[PLACEHOLDER: projects that use each technology/)).toBeInTheDocument()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<TechnologiesSection />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
