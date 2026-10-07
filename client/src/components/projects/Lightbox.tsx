import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react'

import { ResponsiveImage } from '@/components/ui/responsive-image'
import type { Media } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'

interface LightboxProps {
  images: readonly Media[]
  /** Index of the open image, or `null` while closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const CONTROL_CLASS =
  'type-label inline-flex min-h-11 min-w-11 items-center justify-center border border-star-25 bg-void px-4 transition-colors hover:border-accent hover:text-accent'

/**
 * Modal image viewer on the native `<dialog>`: `showModal()` gives the focus trap and inert
 * background, Escape closes it, arrows/Home/End move between images. The caller restores focus.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isOpen = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const last = images.length - 1
  const move = (next: number) => onIndexChange((next + images.length) % images.length)

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (index === null) return
    const actions: Record<string, () => void> = {
      Escape: onClose,
      ArrowLeft: () => move(index - 1),
      ArrowRight: () => move(index + 1),
      Home: () => onIndexChange(0),
      End: () => onIndexChange(last),
    }
    const action = actions[event.key]
    if (!action) return
    event.preventDefault()
    action()
  }

  // A click on the dialog box itself (the backdrop area) closes it; clicks on children do not.
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  const current = index === null ? undefined : images[index]
  const { lightbox } = detailLabels

  return (
    <dialog
      ref={dialogRef}
      aria-label={lightbox.label}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onClose={onClose}
      className="m-auto max-h-[100svh] w-[min(96vw,80rem)] border border-star-25 bg-void p-4 text-star backdrop:bg-void/90 motion-safe:open:animate-in motion-safe:open:fade-in sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="type-label">
          {current ? lightbox.counter(index === null ? 0 : index + 1, images.length) : null}
        </p>
        <button type="button" onClick={onClose} className={CONTROL_CLASS}>
          {lightbox.close}
        </button>
      </div>

      {current ? (
        <ResponsiveImage media={current} priority sizes="96vw" className="max-h-[70svh] object-contain" />
      ) : null}

      {images.length > 1 ? (
        <div className="mt-4 flex justify-between gap-3">
          <button type="button" onClick={() => move((index ?? 0) - 1)} className={CONTROL_CLASS}>
            <span aria-hidden="true">← </span>
            {lightbox.previous}
          </button>
          <button type="button" onClick={() => move((index ?? 0) + 1)} className={CONTROL_CLASS}>
            {lightbox.next}
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      ) : null}
    </dialog>
  )
}
