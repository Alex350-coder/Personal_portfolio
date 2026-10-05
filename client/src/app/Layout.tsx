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
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

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
