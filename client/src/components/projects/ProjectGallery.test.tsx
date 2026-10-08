import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectGallery } from '@/components/projects/ProjectGallery'
import type { Media, Project } from '@/data/project.schema'
import { seriousViolations } from '@/test/axe'

const shot = (name: string): Media => ({ src: `/projects/demo/${name}.jpg`, alt: `Captura ${name}`, width: 1600, height: 900 })

const base: Project = {
  slug: 'demo',
  title: 'Demo',
  summary: 'Resumen.',
  category: 'web',
  status: 'completado',
  year: 2026,
  stack: ['typescript'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Problema.',
}

describe('ProjectGallery', () => {
  it('renders nothing without media', () => {
    const { container } = render(<ProjectGallery project={base} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a single static figure for one image', () => {
    render(<ProjectGallery project={{ ...base, media: [shot('a')] }} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Capturas' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Captura a' })).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('renders a grid of figures for several images', () => {
    render(<ProjectGallery project={{ ...base, media: [shot('a'), shot('b'), shot('c')] }} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getAllByRole('button').map((button) => button.getAttribute('aria-label'))).toEqual([
      'Ampliar captura: Captura a',
      'Ampliar captura: Captura b',
      'Ampliar captura: Captura c',
    ])
  })

  it('has no serious accessibility violations', async () => {
    const { container } = render(<ProjectGallery project={{ ...base, media: [shot('a'), shot('b')] }} />)
    expect(await seriousViolations(container)).toEqual([])
  })
})
