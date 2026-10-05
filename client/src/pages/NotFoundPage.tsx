import { Link } from 'react-router'

import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { buttonVariants } from '@/components/ui/button'
import { notFound } from '@/data/routes'
import { cn } from '@/lib/utils'

/** In-theme 404 (basic; the final DotGrid version lands in Phase 5, P5-T09). */
export default function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-heading" className="section-y pt-32 sm:pt-40">
      <Container>
        <Eyebrow className="mb-4">{notFound.eyebrow}</Eyebrow>
        <h1 id="not-found-heading" className="type-h2">
          {notFound.heading}
        </h1>
        <p className="type-body mt-5">{notFound.description}</p>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: 'hero', size: 'hero' }), 'mt-8')}
        >
          {notFound.action}
        </Link>
      </Container>
    </section>
  )
}
