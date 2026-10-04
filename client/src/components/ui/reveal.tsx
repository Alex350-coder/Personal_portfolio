import type { ComponentProps } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Fades and lifts content (10px, 500ms, ease-out) the first time it enters the viewport.
 * Under prefers-reduced-motion the content is simply shown, with no transition.
 * Content stays in the DOM and accessibility tree at all times.
 */
export function Reveal({ className, ...props }: ComponentProps<'div'>) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '0px 0px -8% 0px' })
  const shown = reduced || inView

  return (
    <div
      ref={ref}
      data-revealed={shown}
      className={cn(
        !reduced && 'transition-[opacity,transform] duration-500 ease-out',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0',
        className,
      )}
      {...props}
    />
  )
}
