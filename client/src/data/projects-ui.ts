import type { Category, Status } from '@/data/project.schema'

/** UI copy for the project components (Rules §11: copy lives in data, not in components). */
export const categoryLabels = {
  web: 'Web',
  software: 'Software',
  ia: 'IA',
  seguridad: 'Seguridad',
  herramientas: 'Herramientas',
} as const satisfies Record<Category, string>

export const statusLabels = {
  activo: 'Activo',
  completado: 'Completado',
  'en-desarrollo': 'En desarrollo',
  archivado: 'Archivado',
} as const satisfies Record<Status, string>

export const projectLabels = {
  categoryPrefix: 'Categoría',
  statusPrefix: 'Estado',
  repo: 'Código en GitHub',
  live: 'Demo en vivo',
  stackLabel: 'Tecnologías',
  of: (title: string) => `de ${title}`,
  moreTech: (count: number) => `+${count}`,
  moreTechSr: (count: number) => `y ${count} más`,
  problemLabel: 'Problema',
  featuredCoverNumber: (order: number) => String(order).padStart(2, '0'),
} as const

export const featuredSection = {
  listLabel: 'Proyectos destacados',
  seeAll: 'Ver todos los proyectos',
  github: {
    title: 'Más en GitHub',
    body: 'Todos mis repositorios públicos, incluidos los que no están en esta selección.',
    cta: 'Ver perfil de GitHub',
  },
} as const

export const filterLabels = {
  groupLabel: 'Filtros de proyectos',
  category: 'Categoría',
  status: 'Estado',
  technology: 'Tecnología',
  allTechnologies: 'Todas',
  clear: 'Limpiar filtros',
  showArchived: 'Mostrar archivados',
} as const

/** Copy of the `/proyectos/:slug` detail page. */
export const detailLabels = {
  eyebrow: 'Proyecto',
  back: 'Todos los proyectos',
  year: 'Año',
  role: 'Rol',
  links: 'Enlaces del proyecto',
  problem: { eyebrow: 'Contexto', heading: 'Qué problema resuelve' },
  highlights: { eyebrow: 'Ingeniería', heading: 'Aspectos técnicos destacados' },
  decisions: { eyebrow: 'Criterio', heading: 'Decisiones técnicas' },
  security: { eyebrow: 'Seguridad', heading: 'Notas de seguridad' },
  media: { eyebrow: 'Evidencia', heading: 'Capturas' },
  nav: { label: 'Más proyectos', previous: 'Anterior', next: 'Siguiente' },
  lightbox: {
    label: 'Visor de capturas',
    open: (alt: string) => `Ampliar captura: ${alt}`,
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
    counter: (current: number, total: number) => `Captura ${current} de ${total}`,
  },
  stack: { eyebrow: 'Stack', heading: 'Tecnologías usadas', linkHint: 'Ver proyectos con' },
} as const

export const techEvidence = {
  note: 'El número indica cuántos proyectos usan la tecnología; al elegirla se filtra el índice de proyectos.',
  countSr: (count: number) => (count === 1 ? ', 1 proyecto' : `, ${count} proyectos`),
} as const
