import { categories, statuses, type Category, type Status } from '@/data/project.schema'
import { technologies, type TechId } from '@/data/technologies'
import type { ProjectFilter } from '@/lib/projects'

/** URL params of the index (`/proyectos?categoria=seguridad&tec=typescript&estado=activo&archivados=1`). */
export type FilterParam = 'categoria' | 'tec' | 'estado' | 'archivados'

const techIds: readonly string[] = technologies.map((tech) => tech.id)

function pick<T extends string>(allowed: readonly string[], value: string | null): T | undefined {
  return value !== null && allowed.includes(value) ? (value as T) : undefined
}

/** Reads a filter from the URL. Unknown values are ignored (the URL is untrusted input). */
export function parseProjectFilter(params: URLSearchParams): ProjectFilter {
  const categoria = pick<Category>(categories, params.get('categoria'))
  const tec = pick<TechId>(techIds, params.get('tec'))
  const estado = pick<Status>(statuses, params.get('estado'))
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
  return Object.keys(filter).length > 0
}
