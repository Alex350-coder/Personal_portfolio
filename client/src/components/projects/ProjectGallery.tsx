import { ProjectSection } from '@/components/projects/ProjectSection'
import { ResponsiveImage } from '@/components/ui/responsive-image'
import type { Project } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'

const FRAME = 'border border-star-10 bg-haze/40 p-2'

/** Screenshots: one static figure, or a grid when there are several. Nothing renders without media. */
export function ProjectGallery({ project }: { project: Project }) {
  const media = project.media ?? []
  if (media.length === 0) return null

  const { eyebrow, heading } = detailLabels.media

  return (
    <ProjectSection id="capturas-heading" eyebrow={eyebrow} heading={heading}>
      {media.length === 1 ? (
        <figure className={FRAME}>
          <ResponsiveImage media={media[0]} />
        </figure>
      ) : (
        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {media.map((item) => (
            <li key={item.src}>
              <figure className={FRAME}>
                <ResponsiveImage media={item} sizes="(min-width: 40rem) 50vw, 100vw" />
              </figure>
            </li>
          ))}
        </ul>
      )}
    </ProjectSection>
  )
}
