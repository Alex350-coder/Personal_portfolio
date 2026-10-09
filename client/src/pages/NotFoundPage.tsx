import { Link } from 'react-router'

import { Container } from '@/components/layout/Container'
import { DotGrid } from '@/components/ui/dot-grid'
import { Eyebrow } from '@/components/ui/eyebrow'
import { buttonVariants } from '@/components/ui/button'
import { linkClass } from '@/components/ui/link-styles'
import { documentTitles, notFound, type NotFoundCopy } from '@/data/routes'
import { useDocumentTitle } from '@/hooks/use-document-title'

interface NotFoundPageProps {
  /** Copy to show; defaults to the generic 404. */
  content?: NotFoundCopy
  /** Where the action leads; defaults to Home. */
  to?: string
  /** Page name for `document.title`; defaults to the generic 404 title. */
  title?: string
}

/** In-theme 404: Hero halftone surface, a primary way out and a secondary one. */
export default function NotFoundPage({ content = notFound, to = '/', title = documentTitles.notFound }: NotFoundPageProps) {
  useDocumentTitle(title)

  return (
    <section aria-labelledby="not-found-heading" className="section-y relative overflow-hidden pt-32 sm:pt-40">
      <DotGrid />
      <Container className="relative">
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
        <h1 id="not-found-heading" className="type-h2">
          {content.heading}
        </h1>
        <p className="type-body mt-5">{content.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={to} className={buttonVariants({ variant: 'hero', size: 'hero' })}>
            {content.action}
          </Link>
          {content.secondary ? (
            <Link to={content.secondary.to} className={linkClass}>
              {content.secondary.label}
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
