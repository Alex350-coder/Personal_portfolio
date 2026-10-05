import { Link, useParams } from 'react-router'

import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { projectDetailStub } from '@/data/routes'

/**
 * `/proyectos/:slug` stub. The slug is shown as plain text (React escapes it); real lookup and the
 * not-found-for-unknown-slug behaviour arrive with the project data in Phase 4.
 */
export default function ProjectDetailPage() {
  const { slug } = useParams()

  return (
    <section aria-labelledby="proyecto-heading" className="section-y pt-32 sm:pt-40">
      <Container>
        <Eyebrow className="mb-4">{projectDetailStub.eyebrow}</Eyebrow>
        <h1 id="proyecto-heading" className="type-h2">
          {slug}
        </h1>
        <p className="type-label mt-10 border border-dashed border-star-25 px-4 py-6">
          {projectDetailStub.note}
        </p>
        <Link to="/proyectos" className="type-label mt-8 inline-block underline underline-offset-4 hover:text-accent">
          {projectDetailStub.back}
        </Link>
      </Container>
    </section>
  )
}
