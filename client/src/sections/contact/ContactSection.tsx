import { Section } from '@/components/layout/Section'
import { CopyButton } from '@/components/ui/copy-button'
import { DotGrid } from '@/components/ui/dot-grid'
import { Reveal } from '@/components/ui/reveal'
import { SocialLinks } from '@/components/ui/social-links'
import { contactCopy } from '@/data/contact'
import { emailAddress, profile } from '@/data/profile'
import { sections } from '@/data/sections'

const PROFILE_LINK_IDS = ['github', 'linkedin'] as const

/**
 * Home `#contacto`: no form (ADR-004/009). The `mailto:` anchor works on its own; the copy button
 * is an extra for people without a mail client.
 */
export function ContactSection() {
  const profiles = profile.links.filter((link) => PROFILE_LINK_IDS.some((id) => id === link.id))

  return (
    <Section id="contacto" {...sections.contacto} lead={contactCopy.statement}>
      <Reveal>
        <div className="relative overflow-hidden border border-star-10 bg-haze/40 p-6 sm:p-10">
          <DotGrid />
          <div className="relative">
            <p className="type-label">{contactCopy.emailLabel}</p>
            <a
              href={`mailto:${emailAddress}`}
              className="mt-3 block break-all font-mono text-lg text-star underline decoration-accent-50 underline-offset-8 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-3xl"
            >
              {emailAddress}
            </a>
            <p className="type-body mt-3">{contactCopy.emailHint}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CopyButton value={emailAddress} labels={contactCopy.copy} />
            </div>
            <div className="mt-8 border-t border-star-10 pt-6">
              <p className="type-label mb-3">{contactCopy.profilesLabel}</p>
              <SocialLinks links={profiles} />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
