import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { DotGrid } from '@/components/ui/dot-grid'
import { ExternalLink } from '@/components/ui/external-link'
import { GlowCard } from '@/components/ui/glow-card'
import type { Project, Status } from '@/data/project.schema'
import { categoryLabels, projectLabels, statusLabels } from '@/data/projects-ui'
import { getTechLabel } from '@/lib/projects'
import { cn } from '@/lib/utils'

/** Stack chips shown on a card; the rest collapse into a "+n" counter. */
const MAX_CHIPS = 4

interface ProjectCardProps {
  project: Project
  /** `compact` for the index grid, `featured` for Home (cover slot + problem line). */
  variant?: 'compact' | 'featured'
  /** Heading level of the title, so the card fits the page outline. */
  headingLevel?: 2 | 3
  className?: string
}

const LINK_CLASS =
  'type-label relative z-10 inline-flex min-h-11 items-center underline underline-offset-4 transition-colors hover:text-accent'

function statusVariant(status: Status) {
  if (status === 'en-desarrollo') return 'dashed'
  if (status === 'activo') return 'accent'
  return 'outline'
}

function StackChips({ stack }: { stack: Project['stack'] }) {
  const shown = stack.slice(0, MAX_CHIPS)
  const hidden = stack.length - shown.length

  return (
    <ul role="list" aria-label={projectLabels.stackLabel} className="flex flex-wrap gap-2">
      {shown.map((tech) => (
        <li key={tech} className="border border-star-10 px-2 py-1 text-xs text-star-70">
          {getTechLabel(tech)}
        </li>
      ))}
      {hidden > 0 ? (
        <li className="border border-star-10 px-2 py-1 text-xs text-star-70">
          <span aria-hidden="true">{projectLabels.moreTech(hidden)}</span>
          <span className="sr-only">{projectLabels.moreTechSr(hidden)}</span>
        </li>
      ) : null}
    </ul>
  )
}

/** Decorative cover: the real image when the project has one, otherwise the halftone surface + order. */
function FeaturedCover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <img
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        loading="lazy"
        className="aspect-video w-full border border-star-10 object-cover"
      />
    )
  }
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-star-10 bg-void/60">
      <DotGrid />
      {project.featured !== undefined ? (
        <span aria-hidden="true" className="type-eyebrow absolute bottom-3 left-4 text-2xl tracking-[0.2em]">
          {projectLabels.featuredCoverNumber(project.featured)}
        </span>
      ) : null}
    </div>
  )
}

/**
 * Project card. The title link is stretched over the whole card (`after:` overlay) so the card is one
 * focusable target; repo/live links sit above it (`z-10`) as separate, non-nested targets.
 */
export function ProjectCard({ project, variant = 'compact', headingLevel = 3, className }: ProjectCardProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const isFeatured = variant === 'featured'

  return (
    <GlowCard
      data-variant={variant}
      className={cn(
        'relative flex h-full flex-col gap-4 p-5 focus-within:border-accent sm:p-6',
        isFeatured && 'gap-5 sm:p-7',
        className,
      )}
    >
      {isFeatured ? <FeaturedCover project={project} /> : null}

      <div className="flex flex-wrap gap-2">
        <Badge srLabel={projectLabels.categoryPrefix}>{categoryLabels[project.category]}</Badge>
        <Badge variant={statusVariant(project.status)} srLabel={projectLabels.statusPrefix}>
          {statusLabels[project.status]}
        </Badge>
      </div>

      <Heading className={cn('font-semibold leading-snug', isFeatured ? 'text-2xl' : 'text-lg')}>
        <Link
          to={`/proyectos/${project.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
        >
          {project.title}
        </Link>
      </Heading>

      <p className="text-sm leading-relaxed text-star-70">{project.summary}</p>

      {isFeatured ? (
        <p className="text-sm leading-relaxed text-star-70">
          <span className="type-label mr-2">{projectLabels.problemLabel}</span>
          {project.problem}
        </p>
      ) : null}

      <div className="mt-auto flex flex-col gap-3">
        <StackChips stack={project.stack} />
        <div className="flex flex-wrap gap-x-5">
          <ExternalLink href={project.links.repo} className={LINK_CLASS}>
            {projectLabels.repo}
            {' '}
<span className="sr-only">{projectLabels.of(project.title)}</span>
          </ExternalLink>
          {project.links.live ? (
            <ExternalLink href={project.links.live} className={LINK_CLASS}>
              {projectLabels.live}
              {' '}
<span className="sr-only">{projectLabels.of(project.title)}</span>
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </GlowCard>
  )
}
