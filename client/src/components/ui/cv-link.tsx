import { FileText } from 'lucide-react'
import { useEffect } from 'react'

import { linkClass } from '@/components/ui/link-styles'
import { isCvPath } from '@/lib/cv'
import { isPlaceholder } from '@/lib/placeholder'
import { cn } from '@/lib/utils'

interface CvLinkProps {
  /** Same-origin `/cv/<file>.pdf` (lib/cv.ts); anything else renders nothing. */
  href: string
  label: string
  /** Format hint shown next to the label, e.g. "PDF". */
  format: string
  className?: string
}

/**
 * Download link for the CV. The file name is stable so the browser saves it under that name.
 * While the PDF does not exist (href is a placeholder) it renders a dashed, clearly flagged item
 * instead of a dead link and warns in dev; the production gate is Phase 6 (npm run placeholders).
 */
export function CvLink({ href, label, format, className }: CvLinkProps) {
  const missing = isPlaceholder(href)
  useEffect(() => {
    if (missing && import.meta.env.DEV) console.warn(`[CvLink] CV missing: ${href}`)
  }, [missing, href])

  if (missing) {
    return (
      <span className={cn(linkClass, 'border-dashed text-star-60', className)} data-cv-missing="true">
        <FileText aria-hidden="true" className="size-4" />
        {label} · {href}
      </span>
    )
  }
  if (!isCvPath(href)) return null
  const fileName = href.slice(href.lastIndexOf('/') + 1)

  return (
    <a href={href} download={fileName} className={cn(linkClass, className)}>
      <FileText aria-hidden="true" className="size-4" />
      {label}
      <span className="text-star-60">· {format}</span>
    </a>
  )
}
