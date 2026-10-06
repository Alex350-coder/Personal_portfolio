import { describe, expect, it } from 'vitest'

import { pendingNotes } from '@/data/sections'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { projectDetailStub } from '@/data/routes'
import { technologies } from '@/data/technologies'
import { isPlaceholder } from '@/lib/placeholder'

/** `string | Placeholder` collapses to `string`, so malformed markers are caught here instead. */
const MARKER = /\[\[[^\]]*\]\]/g

function markersIn(value: unknown): string[] {
  return JSON.stringify(value).match(MARKER) ?? []
}

describe('placeholders in data', () => {
  it.each([
    ['profile', profile],
    ['technologies', technologies],
    ['pendingNotes', pendingNotes],
    ['projects', projects],
    ['projectDetailStub', projectDetailStub],
  ])('every [[…]] marker in %s follows the [[PLACEHOLDER: …]] convention', (_name, data) => {
    for (const marker of markersIn(data)) {
      expect(isPlaceholder(marker.replace(/\\"/g, '"')), marker).toBe(true)
    }
  })
})
