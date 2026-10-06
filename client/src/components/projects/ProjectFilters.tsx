import { useId } from 'react'

import { categories, statuses } from '@/data/project.schema'
import { categoryLabels, filterLabels, statusLabels } from '@/data/projects-ui'
import type { TechId } from '@/data/technologies'
import { getTechLabel, type ProjectFilter } from '@/lib/projects'
import { cn } from '@/lib/utils'

type ChangeKey = 'categoria' | 'tec' | 'estado'

interface ProjectFiltersProps {
  filter: ProjectFilter
  isActive: boolean
  /** Technologies used by at least one project (a filter can never lead to an empty option). */
  techOptions: readonly TechId[]
  /** Archived projects exist, so the toggle is worth showing. */
  hasArchived: boolean
  onChange: (key: ChangeKey, value: string | undefined) => void
  onArchivedChange: (show: boolean) => void
  onClear: () => void
}

/** Archived projects are controlled by their own toggle, not by the status buttons. */
const selectableStatuses = statuses.filter((status) => status !== 'archivado')

const CONTROL_CLASS =
  'type-label inline-flex min-h-11 items-center border px-4 transition-colors hover:bg-star-10 hover:text-star'

interface ToggleProps {
  pressed: boolean
  onClick: () => void
  children: string
}

function Toggle({ pressed, onClick, children }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(CONTROL_CLASS, pressed ? 'border-accent-50 bg-accent-10 text-accent' : 'border-star-25')}
    >
      {children}
    </button>
  )
}

function ToggleGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const labelId = useId()
  return (
    <div role="group" aria-labelledby={labelId} className="flex flex-wrap items-center gap-2">
      <span id={labelId} className="type-label mr-1">
        {label}
      </span>
      {children}
    </div>
  )
}

/** Category/status toggle buttons, technology select, archived toggle and clear (state lives in the URL). */
export function ProjectFilters({
  filter,
  isActive,
  techOptions,
  hasArchived,
  onChange,
  onArchivedChange,
  onClear,
}: ProjectFiltersProps) {
  const techId = useId()

  return (
    <div role="group" aria-label={filterLabels.groupLabel} className="flex flex-col gap-5">
      <ToggleGroup label={filterLabels.category}>
        {categories.map((category) => (
          <Toggle
            key={category}
            pressed={filter.categoria === category}
            onClick={() => onChange('categoria', filter.categoria === category ? undefined : category)}
          >
            {categoryLabels[category]}
          </Toggle>
        ))}
      </ToggleGroup>

      <ToggleGroup label={filterLabels.status}>
        {selectableStatuses.map((status) => (
          <Toggle
            key={status}
            pressed={filter.estado === status}
            onClick={() => onChange('estado', filter.estado === status ? undefined : status)}
          >
            {statusLabels[status]}
          </Toggle>
        ))}
      </ToggleGroup>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <label htmlFor={techId} className="type-label">
          {filterLabels.technology}
        </label>
        <select
          id={techId}
          value={filter.tec ?? ''}
          onChange={(event) => onChange('tec', event.target.value === '' ? undefined : event.target.value)}
          className={cn(CONTROL_CLASS, 'border-star-25 bg-void text-star-70')}
        >
          <option value="">{filterLabels.allTechnologies}</option>
          {techOptions.map((tech) => (
            <option key={tech} value={tech}>
              {getTechLabel(tech)}
            </option>
          ))}
        </select>
      </div>

      {hasArchived || isActive ? (
        <div className="flex flex-wrap items-center gap-3">
          {hasArchived ? (
            <Toggle pressed={filter.includeArchived === true} onClick={() => onArchivedChange(filter.includeArchived !== true)}>
              {filterLabels.showArchived}
            </Toggle>
          ) : null}
          {isActive ? (
            <button
              type="button"
              onClick={onClear}
              className={cn(CONTROL_CLASS, 'border-transparent underline underline-offset-4')}
            >
              {filterLabels.clear}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
