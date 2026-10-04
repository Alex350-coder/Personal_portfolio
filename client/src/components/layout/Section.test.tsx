import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Section } from '@/components/layout/Section'
import { seriousViolations } from '@/test/axe'

function renderSection(extra?: { lead?: string }) {
  return render(
    <Section id="sobre-mi" eyebrow="Sobre mí" heading="Quién soy" {...extra}>
      <p>cuerpo</p>
    </Section>,
  )
}

describe('Section', () => {
  it('is a named region labelled by its heading', () => {
    renderSection()
    const region = screen.getByRole('region', { name: 'Quién soy' })
    expect(region).toHaveAttribute('id', 'sobre-mi')
    expect(screen.getByRole('heading', { level: 2, name: 'Quién soy' })).toHaveAttribute('id', 'sobre-mi-heading')
  })

  it('shows the eyebrow with the sparkle prefix', () => {
    renderSection()
    expect(screen.getByText(/Sobre mí/)).toHaveTextContent('✦ Sobre mí')
  })

  it('renders children and an optional lead', () => {
    renderSection({ lead: 'Una introducción corta' })
    expect(screen.getByText('cuerpo')).toBeInTheDocument()
    expect(screen.getByText('Una introducción corta')).toBeInTheDocument()
  })

  it('omits the lead when not provided', () => {
    renderSection()
    expect(screen.queryByText('Una introducción corta')).not.toBeInTheDocument()
  })

  it('has no serious axe violations', async () => {
    const { container } = renderSection({ lead: 'lead' })
    expect(await seriousViolations(container)).toEqual([])
  })
})
