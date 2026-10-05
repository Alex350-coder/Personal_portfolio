import { Section } from '@/components/layout/Section'
import type { SectionCopy } from '@/data/sections'
import type { Placeholder } from '@/lib/placeholder'

interface PendingSectionProps extends SectionCopy {
  id: string
  note: Placeholder
}

/**
 * Anchored landmark for a section built in a later phase. Keeps `#id` navigation honest and shows
 * an explicit placeholder that the Phase 6 build gate will refuse to ship.
 */
export function PendingSection({ id, note, ...copy }: PendingSectionProps) {
  return (
    <Section id={id} {...copy}>
      <p className="type-label border border-dashed border-star-25 px-4 py-6">{note}</p>
    </Section>
  )
}
