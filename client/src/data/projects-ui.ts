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
  moreTech: (count: number) => `+${count}`,
  moreTechSr: (count: number) => `y ${count} más`,
  problemLabel: 'Problema',
  featuredCoverNumber: (order: number) => String(order).padStart(2, '0'),
} as const
