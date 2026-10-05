import { Link, useLocation } from 'react-router'

import { profile } from '@/data/profile'
import { navHref, navItems, type NavItem } from '@/data/navigation'
import { useActiveSection } from '@/hooks/use-active-section'
import { cn } from '@/lib/utils'

const SECTION_IDS = navItems.map((item) => item.id)
const PROJECTS_ROUTE = '/proyectos'

type CurrentState = 'page' | 'location' | undefined

function currentState(item: NavItem, pathname: string, activeSection: string | null): CurrentState {
  if (item.id === 'proyectos' && pathname.startsWith(PROJECTS_ROUTE)) return 'page'
  return activeSection === item.id ? 'location' : undefined
}

/**
 * Top bar (docs/UI.md §Navigation): mono uppercase links, active = accent + 1 px underline,
 * `bg-void/80 backdrop-blur` with a bottom rule. Links are `/#anchor` so they work from any route.
 */
export function SiteHeader() {
  const { pathname } = useLocation()
  const activeSection = useActiveSection(SECTION_IDS, pathname === '/')

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-star-10 bg-void/80 backdrop-blur">
      <div className="section-x mx-auto flex h-16 max-w-page items-center justify-between gap-6">
        <Link to="/#inicio" className="type-meta truncate text-star-70 transition-colors hover:text-accent">
          {profile.name}
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const current = currentState(item, pathname, activeSection)
              return (
                <li key={item.id}>
                  <Link
                    to={navHref(item.id)}
                    aria-current={current}
                    className={cn(
                      'type-label inline-flex min-h-6 items-center border-b border-transparent pb-0.5 transition-colors hover:text-star',
                      current && 'border-accent text-accent hover:text-accent',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
