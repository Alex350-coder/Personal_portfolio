import { ProjectSection } from '@/components/projects/ProjectSection'
import type { Project } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'

/** Problem, technical highlights and decisions. Optional blocks render only when the data has them. */
export function ProjectNarrative({ project }: { project: Project }) {
  const { problem, highlights, decisions } = project

  return (
    <>
      <ProjectSection id="problema-heading" eyebrow={detailLabels.problem.eyebrow} heading={detailLabels.problem.heading}>
        <p className="type-body">{problem}</p>
      </ProjectSection>

      {highlights?.length ? (
        <ProjectSection
          id="aspectos-heading"
          eyebrow={detailLabels.highlights.eyebrow}
          heading={detailLabels.highlights.heading}
        >
          <ul role="list" className="grid max-w-copy gap-3">
            {highlights.map((item) => (
              <li key={item} className="type-body border-l border-accent-50 pl-4">
                {item}
              </li>
            ))}
          </ul>
        </ProjectSection>
      ) : null}

      {decisions?.length ? (
        <ProjectSection
          id="decisiones-heading"
          eyebrow={detailLabels.decisions.eyebrow}
          heading={detailLabels.decisions.heading}
        >
          <ul role="list" className="grid gap-5 md:grid-cols-2">
            {decisions.map((decision) => (
              <li key={decision.title} className="border border-star-10 bg-haze/40 p-5">
                <h3 className="text-lg font-semibold leading-snug">{decision.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-star-70">{decision.body}</p>
              </li>
            ))}
          </ul>
        </ProjectSection>
      ) : null}
    </>
  )
}
