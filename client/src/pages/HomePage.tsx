import { AboutSection } from '@/sections/about/AboutSection'
import { ContactSection } from '@/sections/contact/ContactSection'
import HeroSection from '@/sections/hero/HeroSection'
import { FeaturedProjects } from '@/sections/projects/FeaturedProjects'
import { TechnologiesSection } from '@/sections/technologies/TechnologiesSection'

/**
 * Home route: single scroll. Order follows Plan.md §1.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <TechnologiesSection />
      <ContactSection />
    </>
  )
}
