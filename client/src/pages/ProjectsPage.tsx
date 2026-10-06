import { useMemo } from 'react'

import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { Eyebrow } from '@/components/ui/eyebrow'
import { projects } from '@/data/projects'
import { filterLabels } from '@/data/projects-ui'
import { projectsIndex } from '@/data/routes'
import type { TechId } from '@/data/technologies'
import { useProjectFilters } from '@/hooks/use-project-filters'
import { filterProjects } from '@/lib/projects'

/** Technologies in use, in first-seen order, so every select option leads to at least one project. */
const techOptions: readonly TechId[] = [...new Set(projects.flatMap((project) => project.stack))]
const hasArchived = projects.some((project) => project.status === 'archivado')

/** `/proyectos`: full index with URL-addressable filters, live result count and an empty state. */
export default function ProjectsPage() {
  const { filter, setFilter, setArchived, clear, isActive } = useProjectFilters()
  const results = useMemo(() => filterProjects(projects, filter), [filter])

  return (
    <section aria-labelledby="proyectos-index-heading" className="section-y pt-32 sm:pt-40">
      <Container>
        <Eyebrow className="mb-4">{projectsIndex.eyebrow}</Eyebrow>
        <h1 id="proyectos-index-heading" className="type-h2">
          {projectsIndex.heading}
        </h1>
        <p className="type-body mt-5">{projectsIndex.lead}</p>

        <div className="mt-10">
          <ProjectFilters
            filter={filter}
            isActive={isActive}
            techOptions={techOptions}
            hasArchived={hasArchived}
            onChange={setFilter}
            onArchivedChange={setArchived}
            onClear={clear}
          />
        </div>

        <p role="status" aria-live="polite" className="type-label mt-8">
          {projectsIndex.count(results.length)}
        </p>

        {results.length > 0 ? (
          <ul role="list" aria-label={projectsIndex.resultsLabel} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} headingLevel={2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 border border-dashed border-star-25 p-6">
            <p className="text-lg font-semibold">{projectsIndex.emptyTitle}</p>
            <p className="type-body mt-2">{projectsIndex.emptyBody}</p>
            <button
              type="button"
              onClick={clear}
              className="type-label mt-4 inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent"
            >
              {filterLabels.clear}
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
