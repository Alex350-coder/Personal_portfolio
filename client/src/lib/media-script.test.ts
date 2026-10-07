import { describe, expect, it } from 'vitest'

import script from '../../scripts/optimize-images.mjs?raw'

import { MEDIA_WIDTHS } from '@/lib/media'

/** The dev-time optimizer and the runtime helper must agree on the exported widths. */
describe('optimize-images script', () => {
  it('exports the same widths as lib/media', () => {
    const match = /export const WIDTHS = \[([^\]]+)\]/.exec(script)
    const widths = match?.[1]?.split(',').map((value) => Number(value.trim()))
    expect(widths).toEqual([...MEDIA_WIDTHS])
  })
})
