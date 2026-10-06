import { Link } from 'react-router'

import { Section } from '@/components/layout/Section'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { DotGrid } from '@/components/ui/dot-grid'
import { ExternalLink } from '@/components/ui/external-link'
import { GlowCard } from '@/components/ui/glow-card'
import { Reveal } from '@/components/ui/reveal'
import { featuredSection } from '@/data/projects-ui'
import { profile } from '@/data/profile'
import { sections } from '@/data/sections'
import { getFeatured } from '@/lib/projects'
import { cn } from '@/lib/utils'

/** Cards fade in one after another; the delay is capped so the last card never waits long. */
const STAGGER_MS = 80
const MAX_STAGGER_STEPS = 3
const staggerDelay = (index: number) => ({ transitionDelay: `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms` })

const LINK_CLASS =
  'type-label inline-flex min-h-11 items-center gap-2 border border-star-25 px-4 transition-colors hover:bg-star-10 hover:text-star'

function GithubCard() {
  const github = profile.links.find((link) => link.id === 'github')
  const { title, body, cta } = featuredSection.github

  return (
    <GlowCard className="relative flex h-full flex-col justify-between gap-5 overflow-hidden border-dashed p-5 sm:p-6">
      <DotGrid />
      <div className="relative">
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-star-70">{body}</p>
      </div>
      {github ? (
        <ExternalLink href={github.href} className={cn(LINK_CLASS, 'relative self-start')}>
          {cta}
        </ExternalLink>
      ) : null}
    </GlowCard>
  )
}

/** Home `#proyectos`: ordered featured projects, link to the full index, and the GitHub profile card. */
export function FeaturedProjects() {
  const featured = getFeatured()

  return (
    <Section id="proyectos" {...sections.proyectos}>
      <ul role="list" aria-label={featuredSection.listLabel} className="grid gap-5 lg:grid-cols-2">
        {featured.map((project, index) => (
          <li key={project.slug} className={cn(index === 0 && 'lg:col-span-2')}>
            <Reveal className="h-full" style={staggerDelay(index)}>
              <ProjectCard project={project} variant={index === 0 ? 'featured' : 'compact'} />
            </Reveal>
          </li>
        ))}
        <li>
          <Reveal className="h-full" style={staggerDelay(featured.length)}>
            <GithubCard />
          </Reveal>
        </li>
      </ul>
      <Link to="/proyectos" className={cn(LINK_CLASS, 'mt-8')}>
        {featuredSection.seeAll}
      </Link>
    </Section>
  )
}
