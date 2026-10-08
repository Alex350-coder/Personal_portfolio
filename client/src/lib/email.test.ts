import { describe, expect, it } from 'vitest'

import { buildEmailAddress, buildMailtoHref, type EmailParts } from '@/lib/email'

const PARTS: EmailParts = { user: ['jane', '.doe'], domain: ['example', 'org'] }

describe('buildEmailAddress', () => {
  it('joins the user chunks and the domain chunks around a single @', () => {
    expect(buildEmailAddress(PARTS)).toBe('jane.doe@example.org')
  })

  it('joins domain chunks with dots', () => {
    expect(buildEmailAddress({ user: ['a'], domain: ['mail', 'example', 'org'] })).toBe('a@mail.example.org')
  })

  it('throws when a part is empty so a broken contact never renders silently', () => {
    expect(() => buildEmailAddress({ user: [], domain: ['example', 'org'] })).toThrow(/user/)
    expect(() => buildEmailAddress({ user: ['jane'], domain: ['example'] })).toThrow(/domain/)
  })

  it('rejects characters that could break out of a mailto URL', () => {
    expect(() => buildEmailAddress({ user: ['a?cc=x'], domain: ['example', 'org'] })).toThrow(/invalid/i)
    expect(() => buildEmailAddress({ user: ['a b'], domain: ['example', 'org'] })).toThrow(/invalid/i)
    expect(() => buildEmailAddress({ user: ['a@b'], domain: ['example', 'org'] })).toThrow(/invalid/i)
  })
})

describe('buildMailtoHref', () => {
  it('prefixes the assembled address with mailto:', () => {
    expect(buildMailtoHref(PARTS)).toBe('mailto:jane.doe@example.org')
  })
})
