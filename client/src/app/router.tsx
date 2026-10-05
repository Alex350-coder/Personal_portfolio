import { lazy, Suspense } from 'react'
import { createBrowserRouter, createMemoryRouter, type RouteObject } from 'react-router'

import Layout from '@/app/Layout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import ProjectsPage from '@/pages/ProjectsPage'

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

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/proyectos', element: <ProjectsPage /> },
      { path: '/proyectos/:slug', element: <ProjectDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  ...devRoutes,
]

export const createAppRouter = () => createBrowserRouter(routes)

/** In-memory router for tests: same route table, no browser history. */
export const createTestRouter = (initialEntries: string[] = ['/']) =>
  createMemoryRouter(routes, { initialEntries })
