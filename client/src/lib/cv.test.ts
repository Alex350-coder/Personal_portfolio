import { describe, expect, it } from 'vitest'

import { isCvPath } from '@/lib/cv'

describe('isCvPath', () => {
  it.each(['/cv/Jane-Doe-CV.pdf', '/cv/cv_2026.pdf', '/cv/a.b-c.pdf'])('accepts %s', (href) => {
    expect(isCvPath(href)).toBe(true)
  })

  it.each([
    'https://evil.example/cv.pdf',
    '//evil.example/cv/x.pdf',
    '/cv/../secret.pdf',
    '/cv/sub/x.pdf',
    '/cv/x.html',
    '/cv/x.pdf?x=1',
    '/other/x.pdf',
    'javascript:alert(1)',
    '',
  ])('rejects %s', (href) => {
    expect(isCvPath(href)).toBe(false)
  })
})
