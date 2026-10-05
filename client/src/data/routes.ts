import type { Placeholder } from '@/lib/placeholder'

/** Copy of the route pages that are not Home. Stubs are replaced in Phase 3 / Phase 4. */

export const notFound = {
  eyebrow: 'Error 404',
  heading: 'Esta página no existe',
  description: 'La dirección no coincide con ninguna página del portafolio. Puedes volver al inicio.',
  action: 'Volver al inicio',
} as const

export const projectsIndexStub = {
  eyebrow: 'Proyectos',
  heading: 'Todos los proyectos',
  note: '[[PLACEHOLDER: complete project index with filters (Phase 3)]]',
} as const satisfies { eyebrow: string; heading: string; note: Placeholder }

export const projectDetailStub = {
  eyebrow: 'Proyecto',
  note: '[[PLACEHOLDER: project case study (Phase 4)]]',
  back: 'Ver todos los proyectos',
} as const satisfies { eyebrow: string; note: Placeholder; back: string }
