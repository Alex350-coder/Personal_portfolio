import type { Media } from '@/data/project.schema'
import { isHttpsUrl } from '@/lib/url'

/**
 * Widths exported by `scripts/optimize-images.mjs` (keep both lists identical). The original
 * file stays as the `<img>` fallback; `<name>-<width>.avif|webp` are the derivatives.
 */
export const MEDIA_WIDTHS = [480, 960, 1600] as const

const FORMATS = [
  { type: 'image/avif', extension: 'avif' },
  { type: 'image/webp', extension: 'webp' },
] as const

export interface MediaSource {
  type: string
  srcSet: string
}

export interface MediaSources {
  sources: MediaSource[]
  fallbackSrc: string
}

/** Smaller exported sizes plus the intrinsic width, capped at the largest exported size. */
function widthsFor(intrinsic: number): number[] {
  const largest = MEDIA_WIDTHS[MEDIA_WIDTHS.length - 1]
  const top = Math.min(intrinsic, largest)
  return [...MEDIA_WIDTHS.filter((width) => width < top), top]
}

function withoutExtension(src: string): string {
  return src.replace(/\.[^./]+$/, '')
}

/**
 * Pure builder for `<picture>`: AVIF then WebP sources with width descriptors, original as fallback.
 * Remote (https) images have no derivatives and only get the plain fallback.
 */
export function buildMediaSources(media: Media): MediaSources {
  if (isHttpsUrl(media.src)) return { sources: [], fallbackSrc: media.src }

  const base = withoutExtension(media.src)
  const widths = widthsFor(media.width)
  const sources = FORMATS.map(({ type, extension }) => ({
    type,
    srcSet: widths.map((width) => `${base}-${width}.${extension} ${width}w`).join(', '),
  }))

  return { sources, fallbackSrc: media.src }
}
