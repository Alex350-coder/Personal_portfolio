import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type BadgeVariant = 'outline' | 'accent' | 'dashed'

interface BadgeProps extends ComponentProps<'span'> {
  /** Border treatment, so meaning is carried by text + shape and never by color alone. */
  variant?: BadgeVariant
  /** Visually hidden prefix read by assistive tech (e.g. "Estado"). */
  srLabel?: string
}

const variants: Record<BadgeVariant, string> = {
  outline: 'border-star-25 text-star-70',
  accent: 'border-accent-50 text-accent',
  dashed: 'border-dashed border-star-25 text-star-70',
}

/** Square mono tag (Hero label language) for project status and category. */
export function Badge({ variant = 'outline', srLabel, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.2em]',
        variants[variant],
        className,
      )}
      {...props}
    >
      {srLabel ? <span className="sr-only">{srLabel}: </span> : null}
      {children}
    </span>
  )
}
