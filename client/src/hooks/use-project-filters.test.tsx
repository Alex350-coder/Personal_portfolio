import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'

import { useProjectFilters } from '@/hooks/use-project-filters'

function setup(initial: string) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initial]}>{children}</MemoryRouter>
  )
  return renderHook(() => ({ filters: useProjectFilters(), location: useLocation() }), { wrapper })
}

describe('useProjectFilters', () => {
  it('restores the filter from the URL on load', () => {
    const { result } = setup('/proyectos?categoria=seguridad&tec=typescript')
    expect(result.current.filters.filter).toEqual({ categoria: 'seguridad', tec: 'typescript' })
    expect(result.current.filters.isActive).toBe(true)
  })

  it('writes a change to the URL and keeps the other filters', () => {
    const { result } = setup('/proyectos?categoria=seguridad')
    act(() => result.current.filters.setFilter('tec', 'react'))
    expect(result.current.location.search).toBe('?categoria=seguridad&tec=react')
    expect(result.current.filters.filter).toEqual({ categoria: 'seguridad', tec: 'react' })
  })

  it('removes a param when cleared with undefined', () => {
    const { result } = setup('/proyectos?categoria=seguridad&tec=react')
    act(() => result.current.filters.setFilter('categoria', undefined))
    expect(result.current.location.search).toBe('?tec=react')
  })

  it('toggles archived projects through archivados=1', () => {
    const { result } = setup('/proyectos')
    act(() => result.current.filters.setArchived(true))
    expect(result.current.location.search).toBe('?archivados=1')
    act(() => result.current.filters.setArchived(false))
    expect(result.current.location.search).toBe('')
  })

  it('clears every filter but keeps unrelated params', () => {
    const { result } = setup('/proyectos?categoria=web&tec=react&estado=activo&archivados=1&utm=x')
    act(() => result.current.filters.clear())
    expect(result.current.location.search).toBe('?utm=x')
    expect(result.current.filters.isActive).toBe(false)
  })

  it('ignores invalid values coming from the URL', () => {
    const { result } = setup('/proyectos?categoria=hack&tec=cobol')
    expect(result.current.filters.filter).toEqual({})
  })
})
