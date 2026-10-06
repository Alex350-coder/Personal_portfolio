import type { Placeholder } from '@/lib/placeholder'

/** Copy of the route pages that are not Home. Stubs are replaced in Phase 3 / Phase 4. */

export const notFound = {
  eyebrow: 'Error 404',
  heading: 'Esta página no existe',
  description: 'La dirección no coincide con ninguna página del portafolio. Puedes volver al inicio.',
  action: 'Volver al inicio',
} as const

export const projectsIndex = {
  eyebrow: 'Proyectos',
  heading: 'Todos los proyectos',
  lead: 'Todo el código está en GitHub. Filtra por categoría, estado o tecnología.',
  resultsLabel: 'Resultados',
  count: (total: number) => (total === 1 ? '1 proyecto' : `${total} proyectos`),
  emptyTitle: 'Ningún proyecto coincide con estos filtros',
  emptyBody: 'Prueba con otra combinación o quita los filtros.',
} as const

export const projectDetailStub = {
  eyebrow: 'Proyecto',
  note: '[[PLACEHOLDER: project case study (Phase 4)]]',
  back: 'Ver todos los proyectos',
} as const satisfies { eyebrow: string; note: Placeholder; back: string }
