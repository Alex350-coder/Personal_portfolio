import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CvLink } from '@/components/ui/cv-link'
import { seriousViolations } from '@/test/axe'

describe('CvLink', () => {
  it('renders a download link with its format hint', () => {
    render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" missingText="próximamente" />)

    const link = screen.getByRole('link', { name: /CV/ })
    expect(link).toHaveAttribute('href', '/cv/Jane-Doe-CV.pdf')
    expect(link).toHaveAttribute('download', 'Jane-Doe-CV.pdf')
    expect(link).toHaveTextContent('PDF')
  })

  it('does not open in a new tab (same-origin file)', () => {
    render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" missingText="próximamente" />)
    expect(screen.getByRole('link')).not.toHaveAttribute('target')
  })

  it('renders nothing for an unsafe href', () => {
    const { container } = render(<CvLink href="https://evil.example/cv.pdf" label="CV" format="PDF" missingText="próximamente" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" missingText="próximamente" />)
    expect(await seriousViolations(container)).toEqual([])
  })
})

describe('CvLink with a missing file', () => {
  const MISSING = '[[PLACEHOLDER: CV PDF (public/cv/); none exists yet]]'

  it('renders readable text, not a dead link or the raw marker', () => {
    render(<CvLink href={MISSING} label="CV" format="PDF" missingText="próximamente" />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText(/CV · próximamente/)).toBeInTheDocument()
    expect(screen.queryByText(/PLACEHOLDER/)).not.toBeInTheDocument()
  })

  it('warns once per change in dev so the gap is not forgotten', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    render(<CvLink href={MISSING} label="CV" format="PDF" missingText="próximamente" />)

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('CV missing'))
  })

  it('does not warn when the file exists', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" missingText="próximamente" />)

    expect(warn).not.toHaveBeenCalled()
  })
})
