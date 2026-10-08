import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { ContactCta } from '@/components/layout/ContactCta'
import { contactCta } from '@/data/contact'
import { seriousViolations } from '@/test/axe'

function renderCta() {
  return render(
    <MemoryRouter>
      <ContactCta copy={contactCta.detail} />
    </MemoryRouter>,
  )
}

describe('ContactCta', () => {
  it('is a region named by its heading', () => {
    renderCta()
    expect(screen.getByRole('region', { name: contactCta.detail.heading })).toBeInTheDocument()
  })

  it('links to the Home contact anchor', () => {
    renderCta()
    expect(screen.getByRole('link', { name: contactCta.detail.action })).toHaveAttribute('href', '/#contacto')
  })

  it('has no serious accessibility violations', async () => {
    const { container } = renderCta()
    expect(await seriousViolations(container)).toEqual([])
  })
})
