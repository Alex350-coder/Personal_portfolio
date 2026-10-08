import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CvLink } from '@/components/ui/cv-link'
import { seriousViolations } from '@/test/axe'

describe('CvLink', () => {
  it('renders a download link with its format hint', () => {
    render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" />)

    const link = screen.getByRole('link', { name: /CV/ })
    expect(link).toHaveAttribute('href', '/cv/Jane-Doe-CV.pdf')
    expect(link).toHaveAttribute('download', 'Jane-Doe-CV.pdf')
    expect(link).toHaveTextContent('PDF')
  })

  it('does not open in a new tab (same-origin file)', () => {
    render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" />)
    expect(screen.getByRole('link')).not.toHaveAttribute('target')
  })

  it('renders nothing for an unsafe href', () => {
    const { container } = render(<CvLink href="https://evil.example/cv.pdf" label="CV" format="PDF" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<CvLink href="/cv/Jane-Doe-CV.pdf" label="CV" format="PDF" />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
