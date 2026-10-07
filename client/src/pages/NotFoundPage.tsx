import { Link } from 'react-router'

import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { buttonVariants } from '@/components/ui/button'
import { notFound } from '@/data/routes'
import { cn } from '@/lib/utils'

interface NotFoundPageProps {
  /** Copy to show; defaults to the generic 404. */
  content?: { eyebrow: string; heading: string; description: string; action: string }
  /** Where the action leads; defaults to Home. */
  to?: string
}

/** In-theme 404 (basic; the final DotGrid version lands in Phase 5, P5-T09). */
export default function NotFoundPage({ content = notFound, to = '/' }: NotFoundPageProps) {
  return (
    <section aria-labelledby="not-found-heading" className="section-y pt-32 sm:pt-40">
      <Container>
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
        <h1 id="not-found-heading" className="type-h2">
          {content.heading}
        </h1>
        <p className="type-body mt-5">{content.description}</p>
        <Link to={to} className={cn(buttonVariants({ variant: 'hero', size: 'hero' }), 'mt-8')}>
          {content.action}
        </Link>
      </Container>
    </section>
  )
}
