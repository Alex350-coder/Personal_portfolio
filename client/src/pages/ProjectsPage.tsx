import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { projectsIndexStub } from '@/data/routes'

/** `/proyectos` stub: route, landmark and heading exist; the index and filters arrive in Phase 3. */
export default function ProjectsPage() {
  return (
    <section aria-labelledby="proyectos-index-heading" className="section-y pt-32 sm:pt-40">
      <Container>
        <Eyebrow className="mb-4">{projectsIndexStub.eyebrow}</Eyebrow>
        <h1 id="proyectos-index-heading" className="type-h2">
          {projectsIndexStub.heading}
        </h1>
        <p className="type-label mt-10 border border-dashed border-star-25 px-4 py-6">
          {projectsIndexStub.note}
        </p>
      </Container>
    </section>
  )
}
