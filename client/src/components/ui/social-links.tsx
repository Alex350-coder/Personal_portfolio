import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import type { ComponentProps } from 'react'

import { profile, type LinkId, type ProfileLink } from '@/data/profile'
import { uiLabels } from '@/data/ui'
import { ExternalLink } from '@/components/ui/external-link'
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

const LINK_CLASS =
  'type-label inline-flex min-h-11 items-center gap-2 border border-star-25 px-4 transition-colors hover:bg-star-10 hover:text-star'

/** Rules §20: only https: and mailto: ever become links. */
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
              <span className={cn(LINK_CLASS, 'border-dashed text-star-60')}>
                <Icon aria-hidden="true" className="size-4" />
                {link.label} · {link.href}
              </span>
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
              <ExternalLink href={link.href} className={LINK_CLASS}>
                {content}
              </ExternalLink>
            ) : (
              <a href={link.href} className={LINK_CLASS}>
                {content}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
