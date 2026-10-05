import { pendingNotes, sections } from '@/data/sections'
import { AboutSection } from '@/sections/about/AboutSection'
import HeroSection from '@/sections/hero/HeroSection'
import { PendingSection } from '@/sections/pending/PendingSection'
import { TechnologiesSection } from '@/sections/technologies/TechnologiesSection'

/**
 * Home route: single scroll. Order follows Plan.md §1. Projects and Contact stay anchored placeholders until Phase 3 / Phase 5.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PendingSection id="proyectos" {...sections.proyectos} note={pendingNotes.proyectos} />
      <TechnologiesSection />
      <PendingSection id="contacto" {...sections.contacto} note={pendingNotes.contacto} />
    </>
  )
}
