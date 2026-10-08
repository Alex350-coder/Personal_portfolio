import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { buildDocumentTitle, useDocumentTitle } from '@/hooks/use-document-title'

const meta = () => document.head.querySelector('meta[name="description"]')

describe('useDocumentTitle', () => {
  beforeEach(() => {
    document.title = 'Inicial'
  })

  afterEach(() => {
    meta()?.remove()
  })

  it('builds "Page | Portafolio" and falls back to the site title', () => {
    expect(buildDocumentTitle('Proyectos')).toBe('Proyectos | Portafolio')
    expect(buildDocumentTitle()).toBe('Portafolio | Software, Web, IA y Ciberseguridad')
  })

  it('sets the title and restores the previous one on unmount', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Proyectos'))
    expect(document.title).toBe('Proyectos | Portafolio')
    unmount()
    expect(document.title).toBe('Inicial')
  })

  it('updates the title when the page changes', () => {
    const { rerender } = renderHook(({ page }) => useDocumentTitle(page), { initialProps: { page: 'Uno' } })
    rerender({ page: 'Dos' })
    expect(document.title).toBe('Dos | Portafolio')
  })

  it('creates the meta description and removes it on unmount when none existed', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Proyectos', 'Descripción'))
    expect(meta()).toHaveAttribute('content', 'Descripción')
    unmount()
    expect(meta()).toBeNull()
  })

  it('restores an existing meta description on unmount', () => {
    const existing = document.createElement('meta')
    existing.name = 'description'
    existing.content = 'Original'
    document.head.append(existing)

    const { unmount } = renderHook(() => useDocumentTitle('Proyectos', 'Nueva'))
    expect(meta()).toHaveAttribute('content', 'Nueva')
    unmount()
    expect(meta()).toHaveAttribute('content', 'Original')
  })

  it('leaves the meta description alone when no description is given', () => {
    renderHook(() => useDocumentTitle('Proyectos'))
    expect(meta()).toBeNull()
  })
})
