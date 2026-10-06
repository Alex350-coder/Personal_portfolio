import { categories, statuses } from '@/data/project.schema'
import { technologies, type TechId } from '@/data/technologies'
import type { ProjectFilter } from '@/lib/projects'

/** URL params of the index (`/proyectos?categoria=seguridad&tec=typescript&estado=activo&archivados=1`). */
export type FilterParam = 'categoria' | 'tec' | 'estado' | 'archivados'

const techIds: readonly TechId[] = technologies.map((tech) => tech.id)

/** Returns `value` only when it is one of the allowed literals; the cast is confined here. */
function pick<const T extends readonly string[]>(allowed: T, value: string | null): T[number] | undefined {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T[number]) : undefined
}

/** Reads a filter from the URL. Unknown values are ignored (the URL is untrusted input). */
export function parseProjectFilter(params: URLSearchParams): ProjectFilter {
  const categoria = pick(categories, params.get('categoria'))
  const tec = pick(techIds, params.get('tec'))
  const estado = pick(statuses, params.get('estado'))
  const includeArchived = params.get('archivados') === '1'

  return {
    ...(categoria ? { categoria } : {}),
    ...(tec ? { tec } : {}),
    ...(estado ? { estado } : {}),
    ...(includeArchived ? { includeArchived } : {}),
  }
}

/** Returns new params with one filter param set (or removed when `value` is undefined). */
export function withFilterParam(params: URLSearchParams, key: FilterParam, value: string | undefined): URLSearchParams {
  const next = new URLSearchParams(params)
  if (value === undefined) next.delete(key)
  else next.set(key, value)
  return next
}

export function hasActiveFilter(filter: ProjectFilter): boolean {
  return (
    filter.categoria !== undefined ||
    filter.tec !== undefined ||
    filter.estado !== undefined ||
    filter.includeArchived === true
  )
}
