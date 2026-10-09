import { describe, expect, it } from 'vitest'

import { isPlaceholder } from '@/lib/placeholder'

describe('isPlaceholder', () => {
  it('accepts the [[PLACEHOLDER: …]] convention', () => {
    expect(isPlaceholder('[[PLACEHOLDER: CV PDF]]')).toBe(true)
  })

  it('rejects real content and malformed markers', () => {
    expect(isPlaceholder('Cajamarca, Perú')).toBe(false)
    expect(isPlaceholder('[[PLACEHOLDER:]]')).toBe(false)
    expect(isPlaceholder('[[PLACEHOLDER: x]] trailing')).toBe(false)
  })
})
