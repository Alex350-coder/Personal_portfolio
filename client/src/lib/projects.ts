import type { Category, Project, Status } from '@/data/project.schema'
import { projects as allProjects } from '@/data/projects'
import { technologies, type TechId } from '@/data/technologies'

/** Index filters. Keys mirror the Spanish URL params (`?categoria=…&tec=…&estado=…`). */
export interface ProjectFilter {
  categoria?: Category
  tec?: TechId
  estado?: Status
  /** Archived projects are hidden unless this is set or `estado` is `archivado`. */
  includeArchived?: boolean
}

/** Featured projects in their explicit display order. */
export function getFeatured(projects: readonly Project[] = allProjects): Project[] {
  return projects
    .filter((project) => project.featured !== undefined)
    .toSorted((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
}

export function getBySlug(slug: string, projects: readonly Project[] = allProjects): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getByTech(tech: TechId, projects: readonly Project[] = allProjects): Project[] {
  return projects.filter((project) => project.stack.includes(tech))
}

/** Pure filter (AND semantics) that keeps dataset order. */
export function filterProjects(projects: readonly Project[], filter: ProjectFilter): Project[] {
  const showArchived = filter.includeArchived === true || filter.estado === 'archivado'
  return projects.filter(
    (project) =>
      (showArchived || project.status !== 'archivado') &&
      (filter.categoria === undefined || project.category === filter.categoria) &&
      (filter.tec === undefined || project.stack.includes(filter.tec)) &&
      (filter.estado === undefined || project.status === filter.estado),
  )
}

const techLabels: ReadonlyMap<string, string> = new Map(technologies.map((tech) => [tech.id, tech.label]))

/** Display label of a technology; falls back to the id for unknown values. */
export function getTechLabel(tech: TechId): string {
  return techLabels.get(tech) ?? tech
}
