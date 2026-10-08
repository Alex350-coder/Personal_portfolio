import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import type { ComponentProps } from 'react'

import { profile, type LinkId, type ProfileLink } from '@/data/profile'
import { uiLabels } from '@/data/ui'
import { CvLink } from '@/components/ui/cv-link'
import { ExternalLink } from '@/components/ui/external-link'
import { linkClass } from '@/components/ui/link-styles'
import { isPlaceholder } from '@/lib/placeholder'
import { cn } from '@/lib/utils'

interface SocialLinksProps extends Omit<ComponentProps<'ul'>, 'children'> {
  links?: readonly ProfileLink[]
}

const ICONS: Record<LinkId, typeof Mail> = {
  github: ArrowUpRight,
  linkedin: ArrowUpRight,
  email: Mail,
  cv: FileText,
}

/** Rules §20: only https: and mailto: ever become links (the CV is the one same-origin file: lib/cv.ts). */
function isSafeHref(href: string): boolean {
  return href.startsWith('https://') || href.startsWith('mailto:')
}

/**
 * Professional links (GitHub, LinkedIn, email, CV), reused by Contact and the footer.
 * External https links open in a new tab with `rel="noopener noreferrer"` and say so to
 * screen readers. A resource that does not exist yet renders its explicit placeholder.
 */
export function SocialLinks({ links = profile.links, className, ...props }: SocialLinksProps) {
  return (
    <ul role="list" aria-label={uiLabels.professionalLinks} className={cn('flex flex-wrap gap-3', className)} {...props}>
      {links.map((link) => {
        const Icon = ICONS[link.id]

        if (isPlaceholder(link.href)) {
          return (
            <li key={link.id}>
              <span className={cn(linkClass, 'border-dashed text-star-60')}>
                <Icon aria-hidden="true" className="size-4" />
                {link.label} · {link.href}
              </span>
            </li>
          )
        }
        if (link.id === 'cv') {
          return (
            <li key={link.id}>
              <CvLink href={link.href} label={link.label} format={uiLabels.cvFormat} />
            </li>
          )
        }
        if (!isSafeHref(link.href)) return null

        const content = (
          <>
            <Icon aria-hidden="true" className="size-4" />
            {link.label}
          </>
        )
        return (
          <li key={link.id}>
            {link.href.startsWith('https://') ? (
              <ExternalLink href={link.href} className={linkClass}>
                {content}
              </ExternalLink>
            ) : (
              <a href={link.href} className={linkClass}>
                {content}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
