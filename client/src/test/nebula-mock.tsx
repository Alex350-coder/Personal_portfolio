import type { ReactNode } from 'react'

/**
 * jsdom has no WebGL: tests replace the nebula with a passthrough that mirrors the landmark
 * props and the paused state. Use as `vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))`.
 * The canvas itself is covered by the Playwright smoke test.
 */
export default function NebulaMock({
  children,
  id,
  labelledBy,
  paused,
}: {
  children?: ReactNode
  id?: string
  labelledBy?: string
  paused?: boolean
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-paused={String(paused)}>
      {children}
    </section>
  )
}
