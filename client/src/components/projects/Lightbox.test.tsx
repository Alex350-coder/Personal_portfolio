import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ProjectGallery } from '@/components/projects/ProjectGallery'
import type { Media, Project } from '@/data/project.schema'
import { seriousViolations } from '@/test/axe'

const shot = (name: string): Media => ({ src: `/projects/demo/${name}.jpg`, alt: `Captura ${name}`, width: 1600, height: 900 })

const project: Project = {
  slug: 'demo',
  title: 'Demo',
  summary: 'Resumen.',
  category: 'web',
  status: 'completado',
  year: 2026,
  stack: ['typescript'],
  links: { repo: 'https://github.com/Alex350-coder/demo' },
  problem: 'Problema.',
  media: [shot('a'), shot('b'), shot('c')],
}

async function openFirst() {
  const user = userEvent.setup()
  render(<ProjectGallery project={project} />)
  const trigger = screen.getByRole('button', { name: 'Ampliar captura: Captura a' })
  await user.click(trigger)
  return { user, trigger, dialog: screen.getByRole('dialog', { name: 'Visor de capturas' }) }
}

describe('Lightbox (via ProjectGallery)', () => {
  it('stays closed until an image is chosen and offers one control per image', () => {
    render(<ProjectGallery project={project} />)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getAllByRole('button', { name: /Ampliar captura/ })).toHaveLength(3)
  })

  it('opens on the chosen image with a position counter', async () => {
    const { dialog } = await openFirst()
    expect(within(dialog).getByRole('img', { name: 'Captura a' })).toBeInTheDocument()
    expect(within(dialog).getByRole('status')).toHaveTextContent('Captura 1 de 3')
  })

  it('moves with the buttons and wraps around', async () => {
    const { user, dialog } = await openFirst()
    await user.click(within(dialog).getByRole('button', { name: /Siguiente/ }))
    expect(within(dialog).getByRole('img', { name: 'Captura b' })).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: /Anterior/ }))
    await user.click(within(dialog).getByRole('button', { name: /Anterior/ }))
    expect(within(dialog).getByRole('img', { name: 'Captura c' })).toBeInTheDocument()
  })

  it('moves with the arrow, Home and End keys', async () => {
    const { user, dialog } = await openFirst()
    await user.keyboard('{ArrowRight}')
    expect(within(dialog).getByRole('status')).toHaveTextContent('Captura 2 de 3')
    await user.keyboard('{End}')
    expect(within(dialog).getByRole('status')).toHaveTextContent('Captura 3 de 3')
    await user.keyboard('{Home}')
    expect(within(dialog).getByRole('status')).toHaveTextContent('Captura 1 de 3')
    await user.keyboard('{ArrowLeft}')
    expect(within(dialog).getByRole('status')).toHaveTextContent('Captura 3 de 3')
  })

  it('closes with Escape and returns focus to the image that opened it', async () => {
    const { user, trigger } = await openFirst()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it('returns focus to the last viewed image after navigating', async () => {
    const { user } = await openFirst()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Ampliar captura: Captura b' })).toHaveFocus()
  })

  it('closes with the close button', async () => {
    const { user, dialog } = await openFirst()
    await user.click(within(dialog).getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('closes when the backdrop (the dialog box itself) is clicked', async () => {
    const { user, dialog } = await openFirst()
    await user.click(dialog)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('has no serious accessibility violations while open', async () => {
    const { dialog } = await openFirst()
    expect(await seriousViolations(dialog)).toEqual([])
  })
})
