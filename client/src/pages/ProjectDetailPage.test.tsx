import { render, screen, within } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { contactCta } from '@/data/contact'
import { createTestRouter } from '@/app/router'
import { validateProjects, type Project } from '@/data/project.schema'
import { projects } from '@/data/projects'
import { seriousViolations } from '@/test/axe'

const { FULL, TEXT_ONLY } = vi.hoisted(() => {
  const base = {
    category: 'seguridad',
    status: 'completado',
    year: 2026,
    stack: ['typescript', 'react'],
  } as const
  return {
    FULL: {
      ...base,
      slug: 'fixture-completo',
      title: 'Proyecto completo',
      summary: 'Fixture con todos los campos opcionales.',
      role: 'Backend y pruebas',
      links: { repo: 'https://github.com/Alex350-coder/fixture-completo', live: 'https://fixture.example.com' },
      problem: 'Problema del fixture completo.',
      highlights: ['Primer aspecto', 'Segundo aspecto'],
      decisions: [{ title: 'Decisión uno', body: 'Porque sí.' }],
      security: ['Nota de seguridad uno'],
      media: [
        { src: '/projects/fixture-completo/a.jpg', alt: 'Captura A', width: 1600, height: 900 },
        { src: '/projects/fixture-completo/b.jpg', alt: 'Captura B', width: 1600, height: 900 },
      ],
    } satisfies Project,
    TEXT_ONLY: {
      ...base,
      slug: 'fixture-solo-texto',
      title: 'Proyecto solo texto',
      summary: 'Fixture con únicamente los campos obligatorios.',
      links: { repo: 'https://github.com/Alex350-coder/fixture-solo-texto' },
      problem: 'Problema del fixture de solo texto.',
    } satisfies Project,
  }
})

vi.mock('@/data/projects', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/data/projects')>()
  return { projects: [...original.projects, FULL, TEXT_ONLY] }
})

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

function renderAt(path: string) {
  const router = createTestRouter([path])
  render(<RouterProvider router={router} />)
  return router
}

/** The closing contact CTA has its own h2; these tests are about the page content. */
const h2Names = () =>
  screen
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)
    .filter((text) => text !== contactCta.detail.heading)

describe('ProjectDetailPage', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('keeps the dataset (with fixtures) valid', () => {
    expect(validateProjects(projects)).toEqual([])
  })

  it.each(projects.map((project) => [project.slug, project.title] as const))(
    '/proyectos/%s renders its page with one h1 and its repo link',
    (slug, title) => {
      renderAt(`/proyectos/${slug}`)
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
      const project = projects.find((item) => item.slug === slug)
      expect(screen.getByRole('link', { name: /Código en GitHub/ })).toHaveAttribute('href', project?.links.repo)
      expect(screen.getByRole('link', { name: /Todos los proyectos/ })).toHaveAttribute('href', '/proyectos')
    },
  )

  it('renders a text-only project with just problem and stack (no empty sections)', () => {
    renderAt(`/proyectos/${TEXT_ONLY.slug}`)
    expect(h2Names()).toEqual(['Qué problema resuelve', 'Tecnologías usadas'])
    expect(screen.queryByText('Rol')).toBeNull()
    expect(screen.queryByRole('link', { name: /Demo en vivo/ })).toBeNull()
    expect(document.querySelector('main img')).toBeNull()
  })

  it('renders every optional section for a project with all fields', () => {
    renderAt(`/proyectos/${FULL.slug}`)
    expect(h2Names()).toEqual([
      'Qué problema resuelve',
      'Aspectos técnicos destacados',
      'Decisiones técnicas',
      'Notas de seguridad',
      'Capturas',
      'Tecnologías usadas',
    ])
    expect(screen.getByText('Backend y pruebas')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Demo en vivo/ })).toHaveAttribute('href', 'https://fixture.example.com')
    expect(screen.getByRole('heading', { level: 3, name: 'Decisión uno' })).toBeInTheDocument()
    expect(screen.getByText('Nota de seguridad uno')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Ampliar captura/ })).toHaveLength(2)
  })

  it('shows the real highlights of saas-pensiones from the dataset', () => {
    renderAt('/proyectos/saas-pensiones')
    expect(h2Names()).toContain('Aspectos técnicos destacados')
  })

  it('links the full project to its neighbours', () => {
    renderAt(`/proyectos/${FULL.slug}`)
    const nav = screen.getByRole('navigation', { name: 'Más proyectos' })
    expect(within(nav).getByRole('link', { name: /Anterior/ })).toHaveAttribute('href')
    expect(within(nav).getByRole('link', { name: /Siguiente/ })).toHaveAttribute('href', `/proyectos/${TEXT_ONLY.slug}`)
  })

  it.each([FULL.slug, TEXT_ONLY.slug, 'saas-pensiones'])('/proyectos/%s has no serious accessibility violations', async (slug) => {
    renderAt(`/proyectos/${slug}`)
    expect(await seriousViolations(document.body)).toEqual([])
  })
})
