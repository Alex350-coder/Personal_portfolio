import { useId } from 'react'
import { Link } from 'react-router'

import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/reveal'
import { techEvidence } from '@/data/projects-ui'
import { sections } from '@/data/sections'
import { techGroups, technologies, type TechGroup } from '@/data/technologies'
import { getByTech } from '@/lib/projects'

const CHIP_CLASS = 'border border-star-10 bg-haze/40 px-3 py-2 text-sm text-star-70'

function TechGroupList({ group }: { group: TechGroup }) {
  const headingId = useId()
  const items = technologies.filter((tech) => tech.group === group.id)

  return (
    <div>
      <h3 id={headingId} className="type-eyebrow mb-4">
        {group.label}
      </h3>
      <ul role="list" aria-labelledby={headingId} className="flex flex-wrap gap-2">
        {items.map((tech) => {
          const count = getByTech(tech.id).length
          return (
            <li key={tech.id}>
              {count > 0 ? (
                <Link
                  to={`/proyectos?tec=${tech.id}`}
                  className={`${CHIP_CLASS} inline-flex min-h-11 items-center gap-2 transition-colors hover:border-accent-50 hover:text-star`}
                >
                  {tech.label}
                  <span aria-hidden="true" className="type-meta tracking-widest text-accent">
                    {count}
                  </span>
                  <span className="sr-only">{techEvidence.countSr(count)}</span>
                </Link>
              ) : (
                <span className={`${CHIP_CLASS} inline-flex min-h-11 items-center`}>{tech.label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * `#tecnologias`: technologies grouped by area. No bars or levels: the evidence is the number of
 * projects that use each one, linking to the index filtered by that technology.
 */
export function TechnologiesSection() {
  return (
    <Section id="tecnologias" {...sections.tecnologias}>
      <Reveal className="grid gap-10 sm:grid-cols-2 lg:gap-12">
        {techGroups.map((group) => (
          <TechGroupList key={group.id} group={group} />
        ))}
      </Reveal>
      <p className="type-label mt-10">{techEvidence.note}</p>
    </Section>
  )
}
