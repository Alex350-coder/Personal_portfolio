import { useParams } from 'react-router'

import { Container } from '@/components/layout/Container'
import { projectNotFound } from '@/data/routes'
import { getBySlug } from '@/lib/projects'
import NotFoundPage from '@/pages/NotFoundPage'

/** `/proyectos/:slug`: data-driven detail page; an unknown slug shows the in-theme project 404. */
export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getBySlug(slug)

  if (!project) return <NotFoundPage content={projectNotFound} to="/proyectos" />

  return (
    <article aria-labelledby="proyecto-heading" className="section-y pt-32 sm:pt-40">
      <Container>
        <h1 id="proyecto-heading" className="type-h2">
          {project.title}
        </h1>
      </Container>
    </article>
  )
}
