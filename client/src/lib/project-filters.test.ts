import { describe, expect, it } from 'vitest'

import { hasActiveFilter, parseProjectFilter, withFilterParam } from '@/lib/project-filters'

const params = (query: string) => new URLSearchParams(query)

describe('parseProjectFilter', () => {
  it('reads valid categoria, tec and estado', () => {
    expect(parseProjectFilter(params('categoria=seguridad&tec=typescript&estado=activo'))).toEqual({
      categoria: 'seguridad',
      tec: 'typescript',
      estado: 'activo',
    })
  })

  it('ignores unknown or malformed values instead of failing', () => {
    expect(parseProjectFilter(params('categoria=nope&tec=cobol&estado=%3Cscript%3E'))).toEqual({})
  })

  it('ignores unrelated params and empty values', () => {
    expect(parseProjectFilter(params('utm=1&categoria='))).toEqual({})
  })

  it('reads the archived toggle only for archivados=1', () => {
    expect(parseProjectFilter(params('archivados=1'))).toEqual({ includeArchived: true })
    expect(parseProjectFilter(params('archivados=0'))).toEqual({})
    expect(parseProjectFilter(params('archivados=yes'))).toEqual({})
  })
})

describe('withFilterParam', () => {
  it('sets a value and keeps unrelated params', () => {
    expect(withFilterParam(params('utm=1'), 'categoria', 'web').toString()).toBe('utm=1&categoria=web')
  })

  it('replaces an existing value', () => {
    expect(withFilterParam(params('categoria=web'), 'categoria', 'seguridad').toString()).toBe('categoria=seguridad')
  })

  it('removes the param when the value is undefined', () => {
    expect(withFilterParam(params('categoria=web&tec=react'), 'categoria', undefined).toString()).toBe('tec=react')
  })

  it('does not mutate the original params', () => {
    const original = params('categoria=web')
    withFilterParam(original, 'categoria', undefined)
    expect(original.toString()).toBe('categoria=web')
  })
})

describe('hasActiveFilter', () => {
  it('is false for an empty filter and true when any field is set', () => {
    expect(hasActiveFilter({})).toBe(false)
    expect(hasActiveFilter({ tec: 'react' })).toBe(true)
    expect(hasActiveFilter({ includeArchived: true })).toBe(true)
  })
})
