import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/layout/Container'
import { linkClass } from '@/components/ui/link-styles'
import { SocialLinks } from '@/components/ui/social-links'
import { footerCopy } from '@/data/footer'
import { profile } from '@/data/profile'

/** Evaluated once at load: the footer must not call impure functions while rendering. */
const CURRENT_YEAR = new Date().getFullYear()

/** Footer landmark on every route: owner, professional links, stack line, back-to-top. */
export function SiteFooter() {
  return (
    <footer className="border-t border-star-10 py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <p className="type-meta">
            {profile.name} · {CURRENT_YEAR}
          </p>
          <SocialLinks aria-label={footerCopy.linksLabel} />
          <p className="type-meta normal-case tracking-normal">{footerCopy.builtWith}</p>
        </div>
        <Link to="/#inicio" className={linkClass}>
          <ArrowUp aria-hidden="true" className="size-4" />
          {footerCopy.backToTop}
        </Link>
      </Container>
    </footer>
  )
}
