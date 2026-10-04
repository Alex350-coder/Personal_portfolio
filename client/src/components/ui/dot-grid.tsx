import { cn } from '@/lib/utils'

interface DotGridProps {
  /** Fade the lattice out toward the edges (default true). */
  fade?: boolean
  className?: string
}

/**
 * Decorative halftone surface (6px dot lattice, token colors). Pure CSS, no motion.
 * Place inside a `relative` parent; it fills it and ignores the pointer.
 */
export function DotGrid({ fade = true, className }: DotGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('dot-grid pointer-events-none absolute inset-0 opacity-40', fade && 'dot-grid-fade', className)}
    />
  )
}
