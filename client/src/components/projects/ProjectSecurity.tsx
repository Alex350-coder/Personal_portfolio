import { ProjectSection } from '@/components/projects/ProjectSection'
import type { Project } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'

/** Security/dev notes: rendered only when the project data carries them (never filler). */
export function ProjectSecurity({ project }: { project: Project }) {
  const { security } = project
  if (!security?.length) return null

  return (
    <ProjectSection id="seguridad-heading" eyebrow={detailLabels.security.eyebrow} heading={detailLabels.security.heading}>
      <ul role="list" className="grid max-w-copy gap-3">
        {security.map((note) => (
          <li key={note} className="type-body border-l border-dashed border-star-25 pl-4">
            {note}
          </li>
        ))}
      </ul>
    </ProjectSection>
  )
}
