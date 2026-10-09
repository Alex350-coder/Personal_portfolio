import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'

/**
 * Page shell: skip link first, header, `<main id="contenido">`, footer.
 * ScrollRestoration handles scroll-to-top, back/forward restoration and hash targets;
 * on a route change (not on first paint, not on same-page hash links) focus moves to `main`
 * so keyboard and screen-reader users start at the new content (docs/Accessibility.md).
 */
export default function Layout() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)
  const previousHash = useRef(hash)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  // In-page links (back to top, CTAs) scroll via ScrollRestoration; move focus to the target too,
  // otherwise keyboard and screen-reader users stay where the link was (WCAG 2.4.3).
  useEffect(() => {
    if (previousHash.current === hash) return
    previousHash.current = hash
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (!target) return
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [hash])

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="contenido" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </>
  )
}
