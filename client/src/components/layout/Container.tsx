import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Centered content column with the Hero's horizontal gutters (docs/UI.md §Layout). */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-page section-x', className)} {...props} />
}
