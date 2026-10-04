import type { ComponentProps, PointerEvent } from 'react'

import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Card surface with a soft accent light that follows the pointer (Hero lamp, CSS-only derivative).
 * The light is decoration only: it needs a fine pointer (touch events are ignored), is disabled
 * under prefers-reduced-motion, and never moves layout or content.
 */
export function GlowCard({ className, onPointerMove, ...props }: ComponentProps<'div'>) {
  const reduced = useReducedMotion()

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event)
    if (reduced || event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      data-glow={reduced ? 'off' : 'on'}
      onPointerMove={handlePointerMove}
      className={cn(
        'glow-card border border-star-10 bg-haze/40 transition-colors duration-200 hover:border-accent-50',
        className,
      )}
      {...props}
    />
  )
}
