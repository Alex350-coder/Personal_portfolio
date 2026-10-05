import { Section } from '@/components/layout/Section'
import { DotGrid } from '@/components/ui/dot-grid'
import { GlowCard } from '@/components/ui/glow-card'
import { Reveal } from '@/components/ui/reveal'
import { profile, type Profile } from '@/data/profile'
import { isPlaceholder } from '@/lib/placeholder'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  about?: Profile['about']
}

const STAGGER_MS = 80

/**
 * `#sobre-mi`: plain intro, three focus pillars, a fact list and the AI-assistance note.
 * Hero language: DotGrid band, GlowCard surfaces, one-shot Reveal; all copy comes from data.
 */
export function AboutSection({ about = profile.about }: AboutSectionProps) {
  const needsApproval = about.aiNote.approval !== 'approved'

  return (
    <div className="relative">
      <DotGrid />
      <Section id="sobre-mi" eyebrow={about.eyebrow} heading={about.heading} className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="space-y-5 lg:col-span-6">
            {about.intro.map((paragraph) => (
              <p key={paragraph} className="type-body">
                {paragraph}
              </p>
            ))}

            <p className="type-body border-l border-accent-50 pl-4 text-star">{about.aiNote.text}</p>
            {needsApproval ? (
              <p className="type-label border border-dashed border-star-25 px-3 py-2">
                {about.aiNote.approval}
              </p>
            ) : null}
          </Reveal>

          <Reveal className="lg:col-span-6">
            <dl className="divide-y divide-star-10 border-y border-star-10">
              {about.facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
                  <dt className="type-label">{fact.label}</dt>
                  <dd
                    className={cn(
                      'text-sm text-star sm:col-span-2 sm:text-base',
                      isPlaceholder(fact.value) && 'type-label normal-case',
                    )}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul role="list" className="mt-14 grid gap-4 sm:gap-6 md:grid-cols-3">
          {about.pillars.map((pillar, index) => (
            <li key={pillar.id}>
              <Reveal style={{ transitionDelay: `${index * STAGGER_MS}ms` }} className="h-full">
                <GlowCard className="h-full p-6">
                  <h3 className="type-h3">{pillar.title}</h3>
                  <p className="type-body mt-3">{pillar.description}</p>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
