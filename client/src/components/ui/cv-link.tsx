import { FileText } from 'lucide-react'

import { linkClass } from '@/components/ui/link-styles'
import { isCvPath } from '@/lib/cv'
import { cn } from '@/lib/utils'

interface CvLinkProps {
  /** Same-origin `/cv/<file>.pdf` (lib/cv.ts); anything else renders nothing. */
  href: string
  label: string
  /** Format hint shown next to the label, e.g. "PDF". */
  format: string
  className?: string
}

/** Download link for the CV. The file name is stable so the browser saves it under that name. */
export function CvLink({ href, label, format, className }: CvLinkProps) {
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
