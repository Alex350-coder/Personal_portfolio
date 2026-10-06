import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { filterLabels } from '@/data/projects-ui'
import type { ProjectFilter } from '@/lib/projects'
import { seriousViolations } from '@/test/axe'

const handlers = () => ({ onChange: vi.fn(), onArchivedChange: vi.fn(), onClear: vi.fn() })

const renderFilters = (filter: ProjectFilter = {}, extra: { hasArchived?: boolean } = {}) => {
  const fns = handlers()
  const view = render(
    <ProjectFilters
      filter={filter}
      isActive={Object.keys(filter).length > 0}
      techOptions={['react', 'typescript']}
      hasArchived={extra.hasArchived ?? false}
      {...fns}
    />,
  )
  return { ...view, ...fns }
}

describe('ProjectFilters', () => {
  it('exposes the filters as a labelled group', () => {
    renderFilters()
    expect(screen.getByRole('group', { name: filterLabels.groupLabel })).toBeInTheDocument()
  })

  it('renders category and status as toggle buttons with aria-pressed', () => {
    renderFilters({ categoria: 'seguridad' })
    expect(screen.getByRole('button', { name: 'Seguridad' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Web' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Completado' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('does not offer the archived status as a button (it has its own toggle)', () => {
    renderFilters()
    expect(screen.queryByRole('button', { name: 'Archivado' })).toBeNull()
  })

  it('selects a category on click and deselects it when pressed again', async () => {
    const user = userEvent.setup()
    const first = renderFilters()
    await user.click(screen.getByRole('button', { name: 'Web' }))
    expect(first.onChange).toHaveBeenCalledWith('categoria', 'web')
    first.unmount()

    const second = renderFilters({ categoria: 'web' })
    await user.click(screen.getByRole('button', { name: 'Web' }))
    expect(second.onChange).toHaveBeenCalledWith('categoria', undefined)
  })

  it('works from the keyboard', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFilters()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('selects a technology through a labelled select, with an empty "all" option', async () => {
    const user = userEvent.setup()
    const { onChange } = renderFilters()
    const select = screen.getByRole('combobox', { name: filterLabels.technology })
    expect(screen.getByRole('option', { name: filterLabels.allTechnologies })).toBeInTheDocument()
    await user.selectOptions(select, 'typescript')
    expect(onChange).toHaveBeenCalledWith('tec', 'typescript')
    await user.selectOptions(select, filterLabels.allTechnologies)
    expect(onChange).toHaveBeenLastCalledWith('tec', undefined)
  })

  it('shows the clear button only when a filter is active', async () => {
    const user = userEvent.setup()
    const idle = renderFilters()
    expect(screen.queryByRole('button', { name: filterLabels.clear })).toBeNull()
    idle.unmount()

    const active = renderFilters({ tec: 'react' })
    await user.click(screen.getByRole('button', { name: filterLabels.clear }))
    expect(active.onClear).toHaveBeenCalledTimes(1)
  })

  it('offers the archived toggle only when archived projects exist', async () => {
    const user = userEvent.setup()
    const none = renderFilters()
    expect(screen.queryByRole('button', { name: filterLabels.showArchived })).toBeNull()
    none.unmount()

    const some = renderFilters({}, { hasArchived: true })
    const toggle = screen.getByRole('button', { name: filterLabels.showArchived })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggle)
    expect(some.onArchivedChange).toHaveBeenCalledWith(true)
  })

  it('has no serious axe violations', async () => {
    const { container } = renderFilters({ categoria: 'web' }, { hasArchived: true })
    expect(await seriousViolations(container)).toEqual([])
  })
})
