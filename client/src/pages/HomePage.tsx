import { pendingNotes, sections } from '@/data/sections'
import { AboutSection } from '@/sections/about/AboutSection'
import HeroSection from '@/sections/hero/HeroSection'
import { PendingSection } from '@/sections/pending/PendingSection'
import { FeaturedProjects } from '@/sections/projects/FeaturedProjects'
import { TechnologiesSection } from '@/sections/technologies/TechnologiesSection'

/**
 * Home route: single scroll. Order follows Plan.md §1. Contact stays an anchored placeholder until Phase 5.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <TechnologiesSection />
      <PendingSection id="contacto" {...sections.contacto} note={pendingNotes.contacto} />
    </>
  )
}
