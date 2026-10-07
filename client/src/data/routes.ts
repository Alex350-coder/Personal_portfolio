/** Copy of the route pages that are not Home. */

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

export const projectNotFound = {
  eyebrow: 'Error 404',
  heading: 'Este proyecto no existe',
  description: 'No hay ningún proyecto con esa dirección. Puedes volver al índice de proyectos.',
  action: 'Ver todos los proyectos',
} as const
