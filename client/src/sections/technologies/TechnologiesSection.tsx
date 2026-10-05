import { useId } from 'react'

import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/reveal'
import { sections } from '@/data/sections'
import { techGroups, technologies, type TechGroup } from '@/data/technologies'
import type { Placeholder } from '@/lib/placeholder'

/** Evidence (projects per technology) arrives with the project data in Phase 3 (P3-T13). */
const EVIDENCE_NOTE: Placeholder = '[[PLACEHOLDER: projects that use each technology (Phase 3)]]'

function TechGroupList({ group }: { group: TechGroup }) {
  const headingId = useId()
  const items = technologies.filter((tech) => tech.group === group.id)

  return (
    <div>
      <h3 id={headingId} className="type-eyebrow mb-4">
        {group.label}
      </h3>
      <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <li key={tech.id} className="border border-star-10 bg-haze/40 px-3 py-2 text-sm text-star-70">
            {tech.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * `#tecnologias`: technologies grouped by area. Plain text chips, no bars or levels. Each chip is
 * a statement of use, so evidence links to projects are added in Phase 3 rather than implied here.
 */
export function TechnologiesSection() {
  return (
    <Section id="tecnologias" {...sections.tecnologias}>
      <Reveal className="grid gap-10 sm:grid-cols-2 lg:gap-12">
        {techGroups.map((group) => (
          <TechGroupList key={group.id} group={group} />
        ))}
      </Reveal>
      <p className="type-label mt-10 border border-dashed border-star-25 px-4 py-4">{EVIDENCE_NOTE}</p>
    </Section>
  )
}
