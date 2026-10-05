import { lazy, Suspense } from 'react'
import { createBrowserRouter, createMemoryRouter, type RouteObject } from 'react-router'

import HomePage from '@/pages/HomePage'

// Dev-only primitive gallery. The DEV guard is statically replaced at build time, so the
// dynamic import (and the whole src/dev chunk) is removed from the production bundle.
const KitPage = import.meta.env.DEV ? lazy(() => import('@/dev/KitPage')) : null

const devRoutes: RouteObject[] = KitPage
  ? [
      {
        path: '/__kit',
        element: (
          <Suspense fallback={null}>
            <KitPage />
          </Suspense>
        ),
      },
    ]
  : []

export const routes: RouteObject[] = [{ path: '/', element: <HomePage /> }, ...devRoutes]

export const createAppRouter = () => createBrowserRouter(routes)

/** In-memory router for tests: same route table, no browser history. */
export const createTestRouter = (initialEntries: string[] = ['/']) =>
  createMemoryRouter(routes, { initialEntries })
