import { Link, useLocation } from 'react-router'

import { MobileMenu } from '@/components/layout/MobileMenu'
import { profile } from '@/data/profile'
import { navHref, navItems, type NavItem } from '@/data/navigation'
import { uiLabels } from '@/data/ui'
import { useActiveSection } from '@/hooks/use-active-section'
import { useHeroVisible } from '@/hooks/use-hero-visible'
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
 * On Home it slides out of view while the Hero is at least half visible (still reachable: focusing
 * any of its controls reveals it); on every other route it is always shown.
 */
export function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeSection = useActiveSection(SECTION_IDS, isHome)
  const isHidden = useHeroVisible(isHome)

  return (
    <header
      data-hidden={isHidden}
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b border-star-10 bg-void/80 backdrop-blur',
        'transition-transform duration-300 motion-reduce:transition-none',
        // Slid away, not inert: keyboard focus inside it brings it back (WCAG 2.1.1, 2.4.3).
        isHidden && '-translate-y-full focus-within:translate-y-0',
      )}
    >
      <div className="section-x mx-auto flex h-16 max-w-page items-center justify-between gap-6">
        <Link to="/#inicio" className="type-meta inline-flex min-h-11 items-center truncate text-star-70 transition-colors hover:text-accent">
          {profile.name}
        </Link>

        <nav aria-label={uiLabels.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const current = currentState(item, pathname, activeSection)
              return (
                <li key={item.id}>
                  <Link
                    to={navHref(item.id)}
                    aria-current={current}
                    className={cn(
                      'type-label inline-flex min-h-11 items-center border-b border-transparent transition-colors hover:text-star',
                      'forced-colors:aria-[current]:underline forced-colors:aria-[current]:decoration-2',
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

        <MobileMenu items={navItems} getCurrent={(item) => currentState(item, pathname, activeSection)} />
      </div>
    </header>
  )
}
