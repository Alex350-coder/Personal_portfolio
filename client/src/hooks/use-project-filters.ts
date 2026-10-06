import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { hasActiveFilter, parseProjectFilter, withFilterParam, type FilterParam } from '@/lib/project-filters'
import type { ProjectFilter } from '@/lib/projects'

const FILTER_KEYS: readonly FilterParam[] = ['categoria', 'tec', 'estado', 'archivados']

/** Project filter state lives in the URL (shareable, restored on reload, back/forward friendly). */
export function useProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter: ProjectFilter = useMemo(() => parseProjectFilter(searchParams), [searchParams])

  const setFilter = useCallback(
    (key: Exclude<FilterParam, 'archivados'>, value: string | undefined) =>
      setSearchParams((current) => withFilterParam(current, key, value)),
    [setSearchParams],
  )

  const setArchived = useCallback(
    (show: boolean) => setSearchParams((current) => withFilterParam(current, 'archivados', show ? '1' : undefined)),
    [setSearchParams],
  )

  const clear = useCallback(
    () =>
      setSearchParams((current) => FILTER_KEYS.reduce((params, key) => withFilterParam(params, key, undefined), current)),
    [setSearchParams],
  )

  return { filter, setFilter, setArchived, clear, isActive: hasActiveFilter(filter) }
}
