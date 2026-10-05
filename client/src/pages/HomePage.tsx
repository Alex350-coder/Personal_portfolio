import { pendingNotes, sections } from '@/data/sections'
import HeroSection from '@/sections/hero/HeroSection'
import { PendingSection } from '@/sections/pending/PendingSection'

/**
 * Home route: single scroll. Order follows Plan.md §1. About and Technologies are added by
 * P2-T10/T12; Projects and Contact stay anchored placeholders until Phase 3 / Phase 5.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PendingSection id="sobre-mi" eyebrow="Sobre mí" heading="Sobre mí" note="[[PLACEHOLDER: About section (P2-T10)]]" />
      <PendingSection id="proyectos" {...sections.proyectos} note={pendingNotes.proyectos} />
      <PendingSection id="tecnologias" {...sections.tecnologias} note="[[PLACEHOLDER: Technologies section (P2-T12)]]" />
      <PendingSection id="contacto" {...sections.contacto} note={pendingNotes.contacto} />
    </>
  )
}
