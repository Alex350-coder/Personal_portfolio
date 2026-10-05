/** Top-navigation entries. Each `id` is the anchor of a Home section (Plan.md §1). */
export interface NavItem {
  id: 'sobre-mi' | 'proyectos' | 'tecnologias' | 'contacto'
  label: string
}

export const navItems: readonly NavItem[] = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'contacto', label: 'Contacto' },
]

/** Home anchors are reachable from every route, so links always point at `/#id`. */
export const navHref = (id: NavItem['id']): string => `/#${id}`
