import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Mono tracked accent label prefixed with the sparkle glyph (Hero eyebrow, docs/UI.md §Type scale). */
export function Eyebrow({ className, children, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('type-eyebrow', className)} {...props}>
      ✦ {children}
    </p>
  )
}
