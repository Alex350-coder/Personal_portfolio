import { useParams } from 'react-router'

import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { ProjectHeader } from '@/components/projects/ProjectHeader'
import { ProjectNarrative } from '@/components/projects/ProjectNarrative'
import { ProjectNav } from '@/components/projects/ProjectNav'
import { ProjectSecurity } from '@/components/projects/ProjectSecurity'
import { TechList } from '@/components/projects/TechList'
import type { Project } from '@/data/project.schema'
import { projectNotFound } from '@/data/routes'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { getBySlug } from '@/lib/projects'
import NotFoundPage from '@/pages/NotFoundPage'

const HEADING_ID = 'proyecto-heading'

function ProjectDetail({ project }: { project: Project }) {
  useDocumentTitle(project.title, project.summary)

  return (
    <article aria-labelledby={HEADING_ID}>
      <ProjectHeader project={project} headingId={HEADING_ID} />
      <ProjectNarrative project={project} />
      <ProjectSecurity project={project} />
      <ProjectGallery project={project} />
      <TechList project={project} />
      <ProjectNav project={project} />
    </article>
  )
}

/** `/proyectos/:slug`: data-driven detail page; an unknown slug shows the in-theme project 404. */
export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getBySlug(slug)

  if (!project) return <NotFoundPage content={projectNotFound} to="/proyectos" />
  return <ProjectDetail project={project} />
}
