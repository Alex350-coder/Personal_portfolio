import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { navHref, type NavItem } from '@/data/navigation'
import { cn } from '@/lib/utils'

/** Tailwind `md` breakpoint: from here the desktop bar replaces this menu. */
const DESKTOP_QUERY = '(min-width: 48rem)'

type CurrentState = 'page' | 'location' | undefined

interface MobileMenuProps {
  items: readonly NavItem[]
  getCurrent: (item: NavItem) => CurrentState
}

/** Makes every sibling of `keep` inert and returns a function that restores the previous state. */
function inertSiblings(keep: Element): () => void {
  const changed: Element[] = []
  for (const sibling of Array.from(keep.parentElement?.children ?? [])) {
    if (sibling === keep || sibling.hasAttribute('inert')) continue
    sibling.setAttribute('inert', '')
    changed.push(sibling)
  }
  return () => changed.forEach((element) => element.removeAttribute('inert'))
}

/**
 * Disclosure menu for small screens. Opening moves focus to the first link and makes the rest of
 * the page inert (focus is contained in the header, content is hidden from AT) and locks page
 * scroll so the header cannot hide under it. Escape closes it
 * and returns focus to the toggle; choosing a link, any route change, or growing the viewport to
 * the desktop layout also closes it.
 */
export function MobileMenu({ items, getCurrent }: MobileMenuProps) {
  const { key: locationKey } = useLocation()
  // Open state is tied to the location it was opened on: any navigation closes it, no effect needed.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const isOpen = openedAt === locationKey

  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const header = buttonRef.current?.closest('header')
    const restore = header ? inertSiblings(header) : () => {}
    // Lock page scroll so the header cannot slide away (and go inert) under an open menu.
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()

    const close = () => setOpenedAt(null)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      close()
      buttonRef.current?.focus()
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', close)
    return () => {
      restore()
      root.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', close)
    }
  }, [isOpen])

  const Icon = isOpen ? X : Menu

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpenedAt(isOpen ? null : locationKey)}
        className="type-label inline-flex h-11 items-center gap-2 border border-star-25 px-3 text-star transition-colors hover:bg-star-10"
      >
        <Icon aria-hidden="true" className="size-4" />
        {isOpen ? 'Cerrar' : 'Menú'}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-star-10 bg-void/95 backdrop-blur"
      >
        {isOpen ? (
          <nav aria-label="Menú principal" className="section-x py-4">
            <ul>
              {items.map((item) => {
                const current = getCurrent(item)
                return (
                  <li key={item.id} className="border-t border-star-10 first:border-t-0">
                    <Link
                      to={navHref(item.id)}
                      aria-current={current}
                      onClick={() => setOpenedAt(null)}
                      className={cn(
                        'type-label flex min-h-12 items-center transition-colors hover:text-star',
                        current && 'text-accent hover:text-accent',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  )
}
