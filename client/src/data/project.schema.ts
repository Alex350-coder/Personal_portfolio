import { technologies, type TechId } from '@/data/technologies'
import { isHttpsUrl } from '@/lib/url'

/**
 * Project model and zero-dependency validator (docs/ProjectShowcase.md §Schema, Rules §10/§20).
 * Phase 3 implements the card/index fields; detail-only fields (`highlights`, `decisions`,
 * `security`, `media` rendering) are rendered in Phase 4.
 */

export const categories = ['web', 'software', 'ia', 'seguridad', 'herramientas'] as const
export const statuses = ['activo', 'completado', 'en-desarrollo', 'archivado'] as const

export type Category = (typeof categories)[number]
export type Status = (typeof statuses)[number]

export interface Media {
  src: string
  /** Required: decorative images are not part of the project model. */
  alt: string
  width: number
  height: number
}

export interface ProjectLinks {
  /** Public GitHub repository (https only). */
  repo: string
  /** Live demo (https only). Absent while none exists: never invented. */
  live?: string
}

export interface Project {
  /** kebab-case, unique; also the URL id. */
  slug: string
  title: string
  /** At most {@link SUMMARY_MAX} characters; used by cards and meta description. */
  summary: string
  category: Category
  status: Status
  year: number
  /** Omit when unknown: never invented. */
  role?: string
  stack: readonly TechId[]
  /** Display order 1..{@link FEATURED_MAX}; absent = not featured. */
  featured?: number
  links: ProjectLinks
  cover?: Media
  media?: readonly Media[]
  problem: string
  highlights?: readonly string[]
  decisions?: readonly { title: string; body: string }[]
  security?: readonly string[]
  /** Marks content awaiting the owner; blocks the production build (Phase 6 gate). */
  placeholder?: true
}

export const SUMMARY_MAX = 160
export const FEATURED_MAX = 5
export const MIN_YEAR = 2020

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const techIds: ReadonlySet<string> = new Set(technologies.map((tech) => tech.id))

function isBlank(value: string): boolean {
  return value.trim().length === 0
}

function validateMedia(media: Media, path: string): string[] {
  return isBlank(media.alt) ? [`${path}.alt must not be empty (alt text is required)`] : []
}

function validateOne(project: Project, maxYear: number): string[] {
  const where = `project "${project.slug}"`
  const errors: string[] = []
  const fail = (message: string) => errors.push(`${where}: ${message}`)

  if (!KEBAB_CASE.test(project.slug)) fail('slug must be kebab-case')
  if (isBlank(project.title)) fail('title must not be empty')
  if (isBlank(project.summary)) fail('summary must not be empty')
  if (project.summary.length > SUMMARY_MAX) fail(`summary must be at most ${SUMMARY_MAX} characters`)
  if (isBlank(project.problem)) fail('problem must not be empty')
  if (!(categories as readonly string[]).includes(project.category)) fail(`unknown category "${project.category}"`)
  if (!(statuses as readonly string[]).includes(project.status)) fail(`unknown status "${project.status}"`)
  if (!Number.isInteger(project.year) || project.year < MIN_YEAR || project.year > maxYear) {
    fail(`year must be between ${MIN_YEAR} and ${maxYear}`)
  }

  if (project.stack.length === 0) fail('stack must not be empty')
  for (const id of project.stack) if (!techIds.has(id)) fail(`unknown technology "${id}"`)

  if (!isHttpsUrl(project.links.repo)) fail('links.repo must be an https URL')
  if (project.links.live !== undefined && !isHttpsUrl(project.links.live)) fail('links.live must be an https URL')

  if (project.featured !== undefined) {
    const { featured } = project
    if (!Number.isInteger(featured) || featured < 1 || featured > FEATURED_MAX) {
      fail(`featured must be an integer between 1 and ${FEATURED_MAX}`)
    }
  }

  if (project.cover) errors.push(...validateMedia(project.cover, `${where}: cover`))
  project.media?.forEach((item, index) => errors.push(...validateMedia(item, `${where}: media[${index}]`)))

  return errors
}

function validateCollection(projects: readonly Project[]): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()
  const featuredOwners = new Map<number, string>()

  for (const { slug, featured } of projects) {
    if (slugs.has(slug)) errors.push(`duplicate slug "${slug}"`)
    slugs.add(slug)

    if (featured === undefined) continue
    const owner = featuredOwners.get(featured)
    if (owner !== undefined && owner !== slug) {
      errors.push(`featured order ${featured} is used by "${owner}" and "${slug}"`)
    }
    if (owner === undefined) featuredOwners.set(featured, slug)
  }
  return errors
}

/**
 * Returns every validation problem as a readable message; an empty array means the dataset is valid.
 * Pure: never mutates its input.
 */
export function validateProjects(projects: readonly Project[], now: Date = new Date()): string[] {
  const maxYear = now.getFullYear() + 1
  return [...projects.flatMap((project) => validateOne(project, maxYear)), ...validateCollection(projects)]
}
