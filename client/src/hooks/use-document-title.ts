import { useEffect } from 'react'

import { documentTitles } from '@/data/routes'

/** `Page | Portafolio`; without a page name the site title is used as is (Home). */
export function buildDocumentTitle(page?: string): string {
  return page ? `${page} | ${documentTitles.suffix}` : documentTitles.site
}

function getDescriptionMeta(): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (existing) return existing
  const created = document.createElement('meta')
  created.name = 'description'
  document.head.append(created)
  return created
}

/**
 * Sets `document.title` (WCAG 2.4.2) and, optionally, the meta description for the current route,
 * and restores the previous values on unmount. Interim per-route metadata; Phase 6 owns final SEO.
 */
export function useDocumentTitle(page?: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title
    document.title = buildDocumentTitle(page)

    if (description === undefined) return () => void (document.title = previousTitle)

    const meta = getDescriptionMeta()
    const hadContent = meta.hasAttribute('content')
    const previousContent = meta.getAttribute('content')
    meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (hadContent && previousContent !== null) meta.setAttribute('content', previousContent)
      else meta.remove()
    }
  }, [page, description])
}
