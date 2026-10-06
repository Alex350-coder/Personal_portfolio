import { describe, expect, it } from 'vitest'

import { validateProjects, type Project } from '@/data/project.schema'

const base: Project = {
  slug: 'demo-project',
  title: 'Demo project',
  summary: 'A short summary.',
  category: 'web',
  status: 'completado',
  year: 2026,
  stack: ['typescript', 'react'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'What it solves.',
}

const make = (overrides: Partial<Project> = {}): Project => ({ ...base, ...overrides })

describe('validateProjects', () => {
  it('accepts a valid dataset', () => {
    expect(validateProjects([base, make({ slug: 'other', featured: 1 })])).toEqual([])
  })

  it('reports a duplicate slug', () => {
    const errors = validateProjects([base, make()])
    expect(errors.join('\n')).toMatch(/duplicate slug "demo-project"/i)
  })

  it('reports a slug that is not kebab-case', () => {
    expect(validateProjects([make({ slug: 'Demo_Project' })]).join('\n')).toMatch(/kebab-case/)
  })

  it('reports an unknown TechId', () => {
    const bad = make({ stack: ['typescript', 'cobol' as never] })
    expect(validateProjects([bad]).join('\n')).toMatch(/unknown technology "cobol"/)
  })

  it('reports an empty stack', () => {
    expect(validateProjects([make({ stack: [] })]).join('\n')).toMatch(/stack must not be empty/)
  })

  it('reports a repo URL that is not https', () => {
    const bad = make({ links: { repo: 'http://github.com/Alex350-coder/demo' } })
    expect(validateProjects([bad]).join('\n')).toMatch(/links\.repo must be an https URL/)
  })

  it('reports a live URL that is not https', () => {
    const bad = make({ links: { repo: base.links.repo, live: 'javascript:alert(1)' } })
    expect(validateProjects([bad]).join('\n')).toMatch(/links\.live must be an https URL/)
  })

  it('reports a featured order collision', () => {
    const errors = validateProjects([make({ featured: 2 }), make({ slug: 'other', featured: 2 })])
    expect(errors.join('\n')).toMatch(/featured order 2 is used by "demo-project" and "other"/)
  })

  it.each([0, 6, 1.5, -1])('reports featured order %s outside 1..5', (featured) => {
    expect(validateProjects([make({ featured })]).join('\n')).toMatch(/featured must be an integer between 1 and 5/)
  })

  it('reports a summary longer than 160 characters', () => {
    expect(validateProjects([make({ summary: 'x'.repeat(161) })]).join('\n')).toMatch(/summary must be at most 160/)
  })

  it('reports an empty title, summary or problem', () => {
    const errors = validateProjects([make({ title: ' ', summary: '', problem: '' })]).join('\n')
    expect(errors).toMatch(/title must not be empty/)
    expect(errors).toMatch(/summary must not be empty/)
    expect(errors).toMatch(/problem must not be empty/)
  })

  it('reports missing alt text on cover and media', () => {
    const image = { src: '/a.webp', alt: '  ', width: 10, height: 10 }
    const errors = validateProjects([make({ cover: image, media: [image] })]).join('\n')
    expect(errors).toMatch(/cover\.alt must not be empty/)
    expect(errors).toMatch(/media\[0\]\.alt must not be empty/)
  })

  it('reports an implausible year', () => {
    expect(validateProjects([make({ year: 1999 })]).join('\n')).toMatch(/year must be between/)
    expect(validateProjects([make({ year: 2999 })]).join('\n')).toMatch(/year must be between/)
  })

  it('reports an unknown category or status', () => {
    const errors = validateProjects([make({ category: 'x' as never, status: 'y' as never })]).join('\n')
    expect(errors).toMatch(/unknown category "x"/)
    expect(errors).toMatch(/unknown status "y"/)
  })

  it('does not mutate its input', () => {
    const input = [base]
    const snapshot = JSON.stringify(input)
    validateProjects(input)
    expect(JSON.stringify(input)).toBe(snapshot)
  })
})
