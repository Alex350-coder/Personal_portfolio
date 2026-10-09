import { Check, Copy, TriangleAlert } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ComponentProps } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { copyText, type CopyLabels } from '@/lib/clipboard'
import { cn } from '@/lib/utils'

type CopyState = 'idle' | 'copied' | 'failed'

interface CopyButtonProps extends Omit<ComponentProps<'button'>, 'children' | 'onClick' | 'type'> {
  /** Text placed on the clipboard. */
  value: string
  /** `idle` names the button; `copied`/`failed` are the outcome messages. */
  labels: CopyLabels
  /** How long the outcome message stays before it clears. */
  resetMs?: number
}

const ICONS = { idle: Copy, copied: Check, failed: TriangleAlert } as const
const DEFAULT_RESET_MS = 2500
const NBSP = String.fromCharCode(0xa0)

/**
 * Copy-to-clipboard control. The button keeps a stable name; the outcome (success or failure) is
 * shown as visible text in a persistent `role="status"` region, mounted from the start so screen
 * readers register it and announce it once.
 */
export function CopyButton({ value, labels, resetMs = DEFAULT_RESET_MS, className, ...props }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle')
  /** Odd/even attempts alternate a trailing nbsp so a repeated outcome is announced again. */
  const [attempts, setAttempts] = useState(0)
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
    setAttempts((count) => count + 1)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), resetMs)
  }, [value, resetMs])

  const Icon = ICONS[state]

  return (
    <>
      <button
        type="button"
        onClick={() => {
          void handleClick()
        }}
        className={cn(buttonVariants({ variant: 'ghost-hero', size: 'hero' }), className)}
        {...props}
      >
        <Icon aria-hidden="true" className="size-4" />
        {labels.idle}
      </button>
      <span role="status" aria-live="polite" className="type-label min-h-6">
        {state === 'idle' ? '' : labels[state] + (attempts % 2 === 0 ? NBSP : '')}
      </span>
    </>
  )
}
