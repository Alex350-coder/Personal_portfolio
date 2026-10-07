import { Link } from 'react-router'

import { Container } from '@/components/layout/Container'
import type { Project } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'
import { getAdjacent } from '@/lib/projects'

const LINK_CLASS =
  'group flex min-h-11 flex-col gap-1 border border-star-10 bg-haze/40 p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

/** Previous/next project in dataset order. A missing neighbour leaves its cell empty (no wrap). */
export function ProjectNav({ project }: { project: Project }) {
  const { previous, next } = getAdjacent(project.slug)
  if (!previous && !next) return null

  const { nav } = detailLabels

  return (
    <nav aria-label={nav.label} className="py-14 sm:py-20">
      <Container>
        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {previous ? (
            <li>
              <Link to={`/proyectos/${previous.slug}`} rel="prev" className={LINK_CLASS}>
                <span className="type-label">
                  <span aria-hidden="true">← </span>
                  {nav.previous}
                </span>
                <span className="text-lg font-semibold leading-snug">{previous.title}</span>
              </Link>
            </li>
          ) : null}
          {next ? (
            <li className="sm:col-start-2 sm:text-right">
              <Link to={`/proyectos/${next.slug}`} rel="next" className={LINK_CLASS}>
                <span className="type-label">
                  {nav.next}
                  <span aria-hidden="true"> →</span>
                </span>
                <span className="text-lg font-semibold leading-snug">{next.title}</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </Container>
    </nav>
  )
}
