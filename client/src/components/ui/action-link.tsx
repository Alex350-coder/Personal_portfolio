import type { ComponentProps } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActionLinkProps extends ComponentProps<'a'> {
  /** `hero` = filled-on-hover accent outline, `ghost-hero` = quiet star outline. */
  variant?: 'hero' | 'ghost-hero'
}

/** Anchor styled as a Hero CTA. Icons go in children (decorative ones need aria-hidden). */
export function ActionLink({ variant = 'hero', className, ...props }: ActionLinkProps) {
  return (
    <a
      // pointer-events-auto: Hero copy sits in a pointer-events-none layer above the canvas.
      className={cn(buttonVariants({ variant, size: 'hero' }), 'pointer-events-auto', className)}
      {...props}
    />
  )
}
