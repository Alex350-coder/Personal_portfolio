import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { profile } from '@/data/profile'
import { seriousViolations } from '@/test/axe'
import { AboutSection } from '@/sections/about/AboutSection'

const { about } = profile

describe('AboutSection', () => {
  it('is the #sobre-mi region named by its h2', () => {
    render(<AboutSection />)
    const region = screen.getByRole('region', { name: about.heading })
    expect(region).toHaveAttribute('id', 'sobre-mi')
    expect(screen.getByRole('heading', { level: 2, name: about.heading })).toBeInTheDocument()
  })

  it('renders the intro paragraphs from data', () => {
    render(<AboutSection />)
    for (const paragraph of about.intro) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
  })

  it('renders the three focus pillars as h3 with their descriptions', () => {
    render(<AboutSection />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(about.pillars.map((pillar) => pillar.title))
    for (const pillar of about.pillars) {
      expect(screen.getByText(pillar.description)).toBeInTheDocument()
    }
  })

  it('renders the fact list as a description list', () => {
    render(<AboutSection />)
    const terms = screen.getAllByRole('term').map((term) => term.textContent)
    expect(terms).toEqual(about.facts.map((fact) => fact.label))
    expect(screen.getAllByRole('definition')).toHaveLength(about.facts.length)
  })

  it('states availability and location from the owner CV, with no placeholder left in the facts', () => {
    render(<AboutSection />)
    expect(screen.getByText(/Abierto a trabajo remoto/)).toBeInTheDocument()
    expect(screen.getByText('Cajamarca, Perú')).toBeInTheDocument()
    expect(screen.queryByText(/PLACEHOLDER: availability/)).not.toBeInTheDocument()
  })

  it('is transparent about AI assistance and shows the owner-approved wording', () => {
    render(<AboutSection />)
    expect(screen.getByText(about.aiNote.text)).toBeInTheDocument()
    expect(screen.queryByText(/PLACEHOLDER: owner approval/)).not.toBeInTheDocument()
  })

  it('hides the approval placeholder once the owner approves the wording', () => {
    render(<AboutSection about={{ ...about, aiNote: { ...about.aiNote, approval: 'approved' } }} />)
    expect(screen.queryByText(/owner approval/)).not.toBeInTheDocument()
  })

  it('has no hard-coded copy: everything comes from the data it receives', () => {
    const custom = { ...about, heading: 'Título de prueba', intro: ['Párrafo de prueba'] }
    render(<AboutSection about={custom} />)
    const region = screen.getByRole('region', { name: 'Título de prueba' })
    expect(within(region).getByText('Párrafo de prueba')).toBeInTheDocument()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<AboutSection />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
