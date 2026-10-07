import { describe, expect, it } from 'vitest'

import type { Project } from '@/data/project.schema'
import { filterProjects, getAdjacent, getBySlug, getByTech, getFeatured, getTechLabel } from '@/lib/projects'

const make = (slug: string, overrides: Partial<Project> = {}): Project => ({
  slug,
  title: slug,
  summary: 's',
  category: 'web',
  status: 'completado',
  year: 2026,
  stack: ['typescript'],
  links: { repo: `https://github.com/Alex350-coder/${slug}` },
  problem: 'p',
  ...overrides,
})

const fixtures: readonly Project[] = [
  make('c', { featured: 2, stack: ['react', 'typescript'], category: 'seguridad' }),
  make('a', { featured: 1, stack: ['rust'], status: 'en-desarrollo' }),
  make('b', { stack: ['react'], status: 'archivado' }),
  make('d', { featured: 3, category: 'seguridad', status: 'activo' }),
]

describe('getFeatured', () => {
  it('returns featured projects ordered by their explicit order', () => {
    expect(getFeatured(fixtures).map((p) => p.slug)).toEqual(['a', 'c', 'd'])
  })

  it('does not mutate the input', () => {
    const copy = [...fixtures]
    getFeatured(fixtures)
    expect(fixtures).toEqual(copy)
  })

  it('returns an empty list when nothing is featured', () => {
    expect(getFeatured([make('x')])).toEqual([])
  })
})

describe('getBySlug', () => {
  it('finds a project by slug', () => {
    expect(getBySlug('b', fixtures)?.slug).toBe('b')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getBySlug('nope', fixtures)).toBeUndefined()
  })
})

describe('getByTech', () => {
  it('returns every project that uses the technology', () => {
    expect(getByTech('react', fixtures).map((p) => p.slug)).toEqual(['c', 'b'])
  })

  it('returns an empty list for an unused technology', () => {
    expect(getByTech('django', fixtures)).toEqual([])
  })
})

describe('filterProjects', () => {
  it('hides archived projects by default and keeps dataset order', () => {
    expect(filterProjects(fixtures, {}).map((p) => p.slug)).toEqual(['c', 'a', 'd'])
  })

  it('shows archived projects when asked', () => {
    expect(filterProjects(fixtures, { includeArchived: true }).map((p) => p.slug)).toEqual(['c', 'a', 'b', 'd'])
  })

  it('filters by category', () => {
    expect(filterProjects(fixtures, { categoria: 'seguridad' }).map((p) => p.slug)).toEqual(['c', 'd'])
  })

  it('filters by technology', () => {
    expect(filterProjects(fixtures, { tec: 'react' }).map((p) => p.slug)).toEqual(['c'])
  })

  it('filters by status', () => {
    expect(filterProjects(fixtures, { estado: 'activo' }).map((p) => p.slug)).toEqual(['d'])
  })

  it('an explicit archived status filter reveals archived projects without the toggle', () => {
    expect(filterProjects(fixtures, { estado: 'archivado' }).map((p) => p.slug)).toEqual(['b'])
  })

  it('combines filters with AND semantics', () => {
    expect(filterProjects(fixtures, { categoria: 'seguridad', tec: 'react' }).map((p) => p.slug)).toEqual(['c'])
    expect(filterProjects(fixtures, { categoria: 'seguridad', tec: 'rust' })).toEqual([])
  })

  it('returns a new array and never mutates the input', () => {
    const result = filterProjects(fixtures, {})
    expect(result).not.toBe(fixtures)
    expect(fixtures).toHaveLength(4)
  })
})

describe('getTechLabel', () => {
  it('returns the display label of a known technology', () => {
    expect(getTechLabel('nextjs')).toBe('Next.js')
  })

  it('falls back to the id for an unknown value instead of rendering nothing', () => {
    expect(getTechLabel('cobol' as never)).toBe('cobol')
  })
})

describe('getAdjacent', () => {
  it('returns the neighbours in dataset order, skipping archived projects', () => {
    expect(getAdjacent('a', fixtures)).toEqual({ previous: fixtures[0], next: fixtures[3] })
  })

  it('has no previous for the first and no next for the last project', () => {
    expect(getAdjacent('c', fixtures)).toEqual({ previous: undefined, next: fixtures[1] })
    expect(getAdjacent('d', fixtures)).toEqual({ previous: fixtures[1], next: undefined })
  })

  it('still navigates from an archived project, using its own position', () => {
    expect(getAdjacent('b', fixtures)).toEqual({ previous: fixtures[1], next: fixtures[3] })
  })

  it('returns no neighbours for an unknown slug', () => {
    expect(getAdjacent('zzz', fixtures)).toEqual({ previous: undefined, next: undefined })
  })

  it('is deterministic and does not mutate its input', () => {
    const snapshot = JSON.stringify(fixtures)
    expect(getAdjacent('a', fixtures)).toEqual(getAdjacent('a', fixtures))
    expect(JSON.stringify(fixtures)).toBe(snapshot)
  })
})
