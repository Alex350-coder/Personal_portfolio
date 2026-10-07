import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

interface ProjectSectionProps {
  /** Id of the section heading; the section is named by it. */
  id: string
  eyebrow: string
  heading: string
  children: ReactNode
}

/** One block of the detail page: eyebrow + `h2` + content, revealed once on scroll. */
export function ProjectSection({ id, eyebrow, heading, children }: ProjectSectionProps) {
  return (
    <section aria-labelledby={id} className="border-b border-star-10 py-14 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          <h2 id={id} className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {heading}
          </h2>
          <div className="mt-6">{children}</div>
        </Reveal>
      </Container>
    </section>
  )
}
