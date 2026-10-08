import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { contactCopy } from '@/data/contact'
import { emailAddress } from '@/data/profile'
import { ContactSection } from '@/sections/contact/ContactSection'
import { seriousViolations } from '@/test/axe'

vi.mock('@/lib/clipboard', () => ({ copyText: vi.fn().mockResolvedValue(true) }))

describe('ContactSection', () => {
  it('is the #contacto region named Hablemos with the statement', () => {
    render(<ContactSection />)
    const region = screen.getByRole('region', { name: 'Hablemos' })
    expect(region).toHaveAttribute('id', 'contacto')
    expect(region).toHaveTextContent(contactCopy.statement)
  })

  it('has a mailto link that needs no script', () => {
    render(<ContactSection />)
    expect(screen.getByRole('link', { name: emailAddress })).toHaveAttribute('href', `mailto:${emailAddress}`)
  })

  it('announces the copy result politely', async () => {
    render(<ContactSection />)
    await userEvent.click(screen.getByRole('button', { name: contactCopy.copy.idle }))
    expect(await screen.findByRole('status')).toHaveTextContent(contactCopy.copy.copied)
  })

  it('lists GitHub, LinkedIn and the CV (flagged while missing) but not a form', () => {
    render(<ContactSection />)
    const list = screen.getByRole('list', { name: 'Enlaces profesionales' })
    expect(within(list).getByRole('link', { name: /GitHub/ })).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(list).getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
    expect(within(list).getByText(/PLACEHOLDER: CV/)).toBeInTheDocument()
    expect(document.querySelector('form')).toBeNull()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<ContactSection />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
