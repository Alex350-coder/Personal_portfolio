import { Check, Copy, TriangleAlert } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ComponentProps } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { copyText } from '@/lib/clipboard'
import { cn } from '@/lib/utils'

type CopyState = 'idle' | 'copied' | 'failed'

export interface CopyButtonLabels {
  idle: string
  copied: string
  failed: string
}

interface CopyButtonProps extends Omit<ComponentProps<'button'>, 'children' | 'onClick' | 'type'> {
  /** Text placed on the clipboard. */
  value: string
  labels: CopyButtonLabels
  /** How long the success/failure message stays before returning to idle. */
  resetMs?: number
}

const ICONS = { idle: Copy, copied: Check, failed: TriangleAlert } as const
const DEFAULT_RESET_MS = 2500

/**
 * Copy-to-clipboard control. The visible label changes with the outcome and a persistent
 * `role="status"` region (mounted from the start so screen readers register it) announces
 * both success and failure.
 */
export function CopyButton({ value, labels, resetMs = DEFAULT_RESET_MS, className, ...props }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearTimeout(timer.current)
    }
  }, [])

  const handleClick = useCallback(async () => {
    const ok = await copyText(value)
    if (!mounted.current) return
    setState(ok ? 'copied' : 'failed')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), resetMs)
  }, [value, resetMs])

  const Icon = ICONS[state]

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(buttonVariants({ variant: 'ghost-hero', size: 'hero' }), className)}
        {...props}
      >
        <Icon aria-hidden="true" className="size-4" />
        {labels[state]}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'idle' ? '' : labels[state]}
      </span>
    </>
  )
}
