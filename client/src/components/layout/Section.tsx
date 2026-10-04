import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

interface SectionProps {
  /** Anchor id; the heading gets `${id}-heading` and labels the region. */
  id: string
  eyebrow: string
  heading: string
  lead?: string
  className?: string
  children?: ReactNode
}

/** Page section: eyebrow + H2 + optional lead, then content (docs/UI.md §Layout). */
export function Section({ id, eyebrow, heading, lead, className, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('section-y', className)}>
      <Container>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-h2">
          {heading}
        </h2>
        {lead ? <p className="type-body mt-5">{lead}</p> : null}
        {children ? <div className="mt-10 sm:mt-14">{children}</div> : null}
      </Container>
    </section>
  )
}
