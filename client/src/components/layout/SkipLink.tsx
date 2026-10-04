import type { ReactNode } from 'react'

interface SkipLinkProps {
  targetId?: string
  children?: ReactNode
}

/** First focusable element on the page: lets keyboard users jump past the navigation (WCAG 2.4.1). */
export function SkipLink({ targetId = 'contenido', children = 'Saltar al contenido' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="type-label sr-only z-50 bg-void px-4 py-3 text-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:border focus:border-accent"
    >
      {children}
    </a>
  )
}
