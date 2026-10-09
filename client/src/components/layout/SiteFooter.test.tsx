import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { footerCopy } from '@/data/footer'
import { profile } from '@/data/profile'
import { seriousViolations } from '@/test/axe'

function renderFooter() {
  return render(
    <MemoryRouter>
      <SiteFooter />
    </MemoryRouter>,
  )
}

describe('SiteFooter', () => {
  it('is the contentinfo landmark with the owner name and the current year', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(profile.name)
    expect(footer).toHaveTextContent(String(new Date().getFullYear()))
  })

  it('lists the professional links under its own label', () => {
    renderFooter()
    const list = screen.getByRole('list', { name: footerCopy.linksLabel })
    expect(within(list).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/Alex350-coder')
    expect(within(list).getByRole('link', { name: /Correo/ })).toHaveAttribute('href', expect.stringMatching(/^mailto:/))
  })

  it('leaves the CV (possibly still missing) to the Contact section', () => {
    renderFooter()
    expect(screen.queryByText(/CV/)).not.toBeInTheDocument()
  })

  it('states the real stack', () => {
    renderFooter()
    expect(screen.getByText(footerCopy.builtWith)).toBeInTheDocument()
  })

  it('back-to-top is a real link to the Hero anchor, not a scroll handler', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: footerCopy.backToTop })).toHaveAttribute('href', '/#inicio')
  })

  it('has no serious accessibility violations', async () => {
    const { container } = renderFooter()
    expect(await seriousViolations(container)).toEqual([])
  })
})
