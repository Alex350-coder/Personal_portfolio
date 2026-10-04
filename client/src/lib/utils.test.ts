import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn', () => {
  it('joins class names and drops falsy values', () => {
    const hidden = false as boolean
    expect(cn('a', hidden && 'b', undefined, 'c')).toBe('a c')
  })

  it('lets later Tailwind utilities override earlier conflicting ones', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('cn with project tokens', () => {
  it('treats max-w-page and max-w-copy as conflicting max-width utilities', () => {
    expect(cn('max-w-page', 'max-w-copy')).toBe('max-w-copy')
  })
})
