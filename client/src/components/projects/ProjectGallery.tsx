import { useEffect, useRef, useState } from 'react'

import { Lightbox } from '@/components/projects/Lightbox'
import { ProjectSection } from '@/components/projects/ProjectSection'
import { ResponsiveImage } from '@/components/ui/responsive-image'
import type { Project } from '@/data/project.schema'
import { detailLabels } from '@/data/projects-ui'

const FRAME = 'border border-star-10 bg-haze/40 p-2'

/**
 * Screenshots: one static figure for a single image; with two or more, a grid whose items open
 * the lightbox (focus returns to the item that opened it). Nothing renders without media.
 */
export function ProjectGallery({ project }: { project: Project }) {
  const media = project.media ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])
  const lastOpened = useRef(0)
  const wasOpen = useRef(false)

  // Focus returns to the opener after the Lightbox effect has closed the dialog (it is no longer
  // modal by then), so this is the single place that restores focus, whatever closed the viewer.
  useEffect(() => {
    if (openIndex === null && wasOpen.current) triggers.current[lastOpened.current]?.focus()
    wasOpen.current = openIndex !== null
  }, [openIndex])

  if (media.length === 0) return null

  const { eyebrow, heading } = detailLabels.media
  const { open } = detailLabels.lightbox

  function openAt(index: number) {
    lastOpened.current = index
    setOpenIndex(index)
  }

  const close = () => setOpenIndex(null)

  function change(index: number) {
    lastOpened.current = index
    setOpenIndex(index)
  }

  return (
    <ProjectSection id="capturas-heading" eyebrow={eyebrow} heading={heading}>
      {media.length === 1 ? (
        <figure className={FRAME}>
          <ResponsiveImage media={media[0]} />
        </figure>
      ) : (
        <>
          <ul role="list" className="grid gap-4 sm:grid-cols-2">
            {media.map((item, index) => (
              <li key={item.src}>
                <figure className={FRAME}>
                  <button
                    type="button"
                    ref={(node) => {
                      triggers.current[index] = node
                    }}
                    aria-label={open(item.alt)}
                    aria-haspopup="dialog"
                    onClick={() => openAt(index)}
                    className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <ResponsiveImage media={item} sizes="(min-width: 72rem) 36rem, (min-width: 40rem) 50vw, 100vw" aria-hidden="true" />
                  </button>
                </figure>
              </li>
            ))}
          </ul>
          <Lightbox images={media} index={openIndex} onIndexChange={change} onClose={close} />
        </>
      )}
    </ProjectSection>
  )
}
