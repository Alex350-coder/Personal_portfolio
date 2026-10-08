import { Link } from 'react-router'

import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/badge'
import { DotGrid } from '@/components/ui/dot-grid'
import { Eyebrow } from '@/components/ui/eyebrow'
import { ExternalLink } from '@/components/ui/external-link'
import { linkClass } from '@/components/ui/link-styles'
import type { Project, Status } from '@/data/project.schema'
import { categoryLabels, detailLabels, projectLabels, statusLabels } from '@/data/projects-ui'

interface ProjectHeaderProps {
  project: Project
  /** Id of the `h1`, so the page can name its landmark with `aria-labelledby`. */
  headingId: string
}

function statusVariant(status: Status) {
  if (status === 'en-desarrollo') return 'dashed'
  if (status === 'activo') return 'accent'
  return 'outline'
}

/** Detail header: back link, badges, the page `h1`, summary, year/role and repo/live links. */
export function ProjectHeader({ project, headingId }: ProjectHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-star-10 pb-12 pt-32 sm:pb-16 sm:pt-40">
      <DotGrid fade />
      <Container className="relative">
        <Link
          to="/proyectos"
          className="type-label mb-8 inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent"
        >
          <span aria-hidden="true">← </span>
          {detailLabels.back}
        </Link>

        <Eyebrow className="mb-4">{detailLabels.eyebrow}</Eyebrow>
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge srLabel={projectLabels.categoryPrefix}>{categoryLabels[project.category]}</Badge>
          <Badge variant={statusVariant(project.status)} srLabel={projectLabels.statusPrefix}>
            {statusLabels[project.status]}
          </Badge>
        </div>

        <h1 id={headingId} className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="type-body mt-5 text-star-70">{project.summary}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="type-label">{detailLabels.year}</dt>
            <dd className="mt-1 text-sm">{project.year}</dd>
          </div>
          {project.role ? (
            <div>
              <dt className="type-label">{detailLabels.role}</dt>
              <dd className="mt-1 text-sm">{project.role}</dd>
            </div>
          ) : null}
        </dl>

        <ul role="list" aria-label={detailLabels.links} className="mt-8 flex flex-wrap gap-3">
          <li>
            <ExternalLink href={project.links.repo} className={linkClass}>
              {projectLabels.repo}
              {' '}
              <span className="sr-only">{projectLabels.of(project.title)}</span>
            </ExternalLink>
          </li>
          {project.links.live ? (
            <li>
              <ExternalLink href={project.links.live} className={linkClass}>
                {projectLabels.live}
                {' '}
                <span className="sr-only">{projectLabels.of(project.title)}</span>
              </ExternalLink>
            </li>
          ) : null}
        </ul>
      </Container>
    </header>
  )
}
