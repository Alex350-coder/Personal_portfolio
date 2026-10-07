import type { ComponentProps } from 'react'

import type { Media } from '@/data/project.schema'
import { buildMediaSources } from '@/lib/media'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps extends Omit<ComponentProps<'img'>, 'src' | 'alt' | 'width' | 'height' | 'srcSet'> {
  /** Typed media: `alt`, `width` and `height` are required by the project model. */
  media: Media
  /** `sizes` attribute for the sources; defaults to the full content width. */
  sizes?: string
  /** Above-the-fold images load eagerly; everything else is lazy. */
  priority?: boolean
}

const DEFAULT_SIZES = '(min-width: 72rem) 72rem, 100vw'

/** `<picture>` with AVIF/WebP sources, intrinsic size (no layout shift) and lazy/async loading. */
export function ResponsiveImage({ media, sizes = DEFAULT_SIZES, priority = false, className, ...props }: ResponsiveImageProps) {
  const { sources, fallbackSrc } = buildMediaSources(media)

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        {...props}
        src={fallbackSrc}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        className={cn('h-auto w-full', className)}
      />
    </picture>
  )
}
