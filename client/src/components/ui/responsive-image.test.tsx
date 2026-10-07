import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResponsiveImage } from '@/components/ui/responsive-image'
import { seriousViolations } from '@/test/axe'

const media = { src: '/projects/demo/home.jpg', alt: 'Pantalla de inicio', width: 1600, height: 900 }

describe('ResponsiveImage', () => {
  it('renders the alt text with intrinsic size, lazy and async by default', () => {
    render(<ResponsiveImage media={media} />)
    const img = screen.getByRole('img', { name: 'Pantalla de inicio' })
    expect(img).toHaveAttribute('width', '1600')
    expect(img).toHaveAttribute('height', '900')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('decoding', 'async')
    expect(img).toHaveAttribute('src', '/projects/demo/home.jpg')
  })

  it('emits AVIF then WebP sources before the fallback img', () => {
    const { container } = render(<ResponsiveImage media={media} />)
    const types = [...container.querySelectorAll('source')].map((source) => source.getAttribute('type'))
    expect(types).toEqual(['image/avif', 'image/webp'])
  })

  it('loads eagerly when it is the priority image', () => {
    render(<ResponsiveImage media={media} priority />)
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')
  })

  it('renders a plain img without sources for a remote image', () => {
    const { container } = render(<ResponsiveImage media={{ ...media, src: 'https://example.com/a.png' }} />)
    expect(container.querySelectorAll('source')).toHaveLength(0)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/a.png')
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<ResponsiveImage media={media} />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
