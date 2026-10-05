import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it, vi } from 'vitest'

import { createTestRouter } from '@/app/router'

vi.mock('@/components/ui/halftone-nebula', () => import('@/test/nebula-mock'))

describe('router', () => {
  it('renders the Hero (single h1) on /', () => {
    render(<RouterProvider router={createTestRouter(['/'])} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ander Alexander Aguirre Tejada')
  })
})
