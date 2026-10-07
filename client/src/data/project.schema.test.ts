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

  it('reports non-positive or fractional media dimensions', () => {
    const image = { src: '/a.webp', alt: 'ok', width: 0, height: 10.5 }
    const errors = validateProjects([make({ cover: image })]).join('\n')
    expect(errors).toMatch(/cover\.width must be a positive integer/)
    expect(errors).toMatch(/cover\.height must be a positive integer/)
  })

  it('reports media paths outside the project folder or without https', () => {
    const outside = { src: '/other/shot.webp', alt: 'ok', width: 10, height: 10 }
    const insecure = { src: 'http://example.com/a.webp', alt: 'ok', width: 10, height: 10 }
    const errors = validateProjects([make({ cover: outside, media: [insecure] })]).join('\n')
    expect(errors).toMatch(/cover\.src must be/)
    expect(errors).toMatch(/media\[0\]\.src must be/)
  })

  it('accepts media under /projects/<slug>/ and https sources', () => {
    const local = { src: '/projects/demo-project/home.webp', alt: 'ok', width: 10, height: 10 }
    const remote = { src: 'https://example.com/a.webp', alt: 'ok', width: 10, height: 10 }
    expect(validateProjects([make({ cover: local, media: [{ ...local, src: '/projects/demo-project/b.webp' }, remote] })])).toEqual([])
  })

  it('reports blank highlights, security notes and role', () => {
    const errors = validateProjects([make({ highlights: ['ok', ' '], security: [''], role: '  ' })]).join('\n')
    expect(errors).toMatch(/highlights\[1\] must not be empty/)
    expect(errors).toMatch(/security\[0\] must not be empty/)
    expect(errors).toMatch(/role must not be empty when present/)
  })

  it('reports decisions with a blank title or body', () => {
    const errors = validateProjects([make({ decisions: [{ title: '', body: 'x' }, { title: 'x', body: ' ' }] })]).join('\n')
    expect(errors).toMatch(/decisions\[0\]\.title must not be empty/)
    expect(errors).toMatch(/decisions\[1\]\.body must not be empty/)
  })

  it.each(['/projects/demo-project/../x.webp', '/projects/demo-project/a.webp?x=1', '/projects/demo-project/a.webp#h', '/projects/demo-project/a\\b.webp'])(
    'rejects the unsafe local media path %s',
    (src) => {
      const image = { src, alt: 'ok', width: 10, height: 10 }
      expect(validateProjects([make({ media: [image] })]).join('\n')).toMatch(/media\[0\]\.src must be/)
    },
  )

  it('rejects alt text that is still a placeholder', () => {
    const image = { src: '/projects/demo-project/a.webp', alt: 'ALT-REQUIRED', width: 10, height: 10 }
    expect(validateProjects([make({ media: [image] })]).join('\n')).toMatch(/media\[0\]\.alt is still a placeholder/)
  })

  it('reports duplicate highlights, security notes, decision titles and media sources', () => {
    const image = { src: '/projects/demo-project/a.webp', alt: 'ok', width: 10, height: 10 }
    const errors = validateProjects([
      make({
        highlights: ['a', 'a'],
        security: ['s', 's'],
        decisions: [{ title: 't', body: 'b' }, { title: 't', body: 'c' }],
        cover: image,
        media: [image],
      }),
    ]).join('\n')
    expect(errors).toMatch(/highlights has a duplicate entry "a"/)
    expect(errors).toMatch(/security has a duplicate entry "s"/)
    expect(errors).toMatch(/decisions has a duplicate entry "t"/)
    expect(errors).toMatch(/media has a duplicate entry/)
  })

  it('accepts a project with every detail field filled', () => {
    const full = make({
      role: 'Backend',
      highlights: ['a'],
      decisions: [{ title: 't', body: 'b' }],
      security: ['s'],
    })
    expect(validateProjects([full])).toEqual([])
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
