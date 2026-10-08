import { describe, expect, it } from 'vitest'

import { buildMediaSources, MEDIA_WIDTHS } from '@/lib/media'

const local = { src: '/projects/demo/home.jpg', alt: 'Inicio', width: 1600, height: 900 }

describe('buildMediaSources', () => {
  it('lists AVIF before WebP and keeps the original as the fallback', () => {
    const { sources, fallbackSrc } = buildMediaSources(local)
    expect(sources.map((source) => source.type)).toEqual(['image/avif', 'image/webp'])
    expect(fallbackSrc).toBe('/projects/demo/home.jpg')
  })

  it('builds one width descriptor per exported size, following the optimizer naming', () => {
    const [avif] = buildMediaSources(local).sources
    const expected = MEDIA_WIDTHS.map((width) => `/projects/demo/home-${width}.avif ${width}w`).join(', ')
    expect(avif?.srcSet).toBe(expected)
  })

  it('drops widths larger than the intrinsic image', () => {
    const { sources } = buildMediaSources({ ...local, width: 700 })
    expect(sources[0]?.srcSet).not.toMatch(/1[0-9]{3}w/)
    expect(sources[0]?.srcSet).toMatch(/480w/)
  })

  it('keeps a single source when the image is smaller than every width', () => {
    const { sources } = buildMediaSources({ ...local, width: 300 })
    expect(sources[0]?.srcSet).toBe('/projects/demo/home-300.avif 300w')
  })

  it('returns no sources for remote images, which only get the plain img', () => {
    const remote = { ...local, src: 'https://example.com/shot.png' }
    expect(buildMediaSources(remote)).toEqual({ sources: [], fallbackSrc: 'https://example.com/shot.png' })
  })

  it('does not mutate its input', () => {
    const input = { ...local }
    buildMediaSources(input)
    expect(input).toEqual(local)
  })
})
