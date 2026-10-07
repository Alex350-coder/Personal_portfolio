import { Link } from 'react-router'

import { ProjectSection } from '@/components/projects/ProjectSection'
import type { Project } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'
import { getTechLabel } from '@/lib/projects'

/** Stack of the project; each technology links back to the index filtered by it. */
export function TechList({ project }: { project: Project }) {
  const { eyebrow, heading, linkHint } = detailLabels.stack

  return (
    <ProjectSection id="stack-heading" eyebrow={eyebrow} heading={heading}>
      <ul role="list" className="flex flex-wrap gap-3">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Link
              to={`/proyectos?tec=${tech}`}
              aria-label={`${linkHint} ${getTechLabel(tech)}`}
              className="type-label inline-flex min-h-11 items-center border border-star-25 px-4 transition-colors hover:border-accent hover:text-accent"
            >
              {getTechLabel(tech)}
            </Link>
          </li>
        ))}
      </ul>
    </ProjectSection>
  )
}
