import { useParams } from 'react-router'

import { ProjectHeader } from '@/components/projects/ProjectHeader'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { ProjectNarrative } from '@/components/projects/ProjectNarrative'
import { ProjectSecurity } from '@/components/projects/ProjectSecurity'
import { TechList } from '@/components/projects/TechList'
import { projectNotFound } from '@/data/routes'
import { getBySlug } from '@/lib/projects'
import NotFoundPage from '@/pages/NotFoundPage'

const HEADING_ID = 'proyecto-heading'

/** `/proyectos/:slug`: data-driven detail page; an unknown slug shows the in-theme project 404. */
export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getBySlug(slug)

  if (!project) return <NotFoundPage content={projectNotFound} to="/proyectos" />

  return (
    <article aria-labelledby={HEADING_ID}>
      <ProjectHeader project={project} headingId={HEADING_ID} />
      <ProjectNarrative project={project} />
      <ProjectSecurity project={project} />
      <ProjectGallery project={project} />
      <TechList project={project} />
    </article>
  )
}
