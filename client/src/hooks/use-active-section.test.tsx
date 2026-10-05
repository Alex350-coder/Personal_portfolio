import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useActiveSection } from '@/hooks/use-active-section'
import { installFakeIntersectionObserver } from '@/test/fake-intersection-observer'

const IDS = ['uno', 'dos', 'tres'] as const

function Probe({ enabled = true }: { enabled?: boolean }) {
  const active = useActiveSection(IDS, enabled)
  return <p data-testid="active">{active ?? 'none'}</p>
}

function Sections() {
  return (
    <>
      {IDS.map((id) => (
        <section key={id} id={id} data-testid={id} />
      ))}
    </>
  )
}

describe('useActiveSection', () => {
  let fake: ReturnType<typeof installFakeIntersectionObserver>

  beforeEach(() => {
    fake = installFakeIntersectionObserver()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('reports none until a section crosses the reading line', () => {
    render(
      <>
        <Sections />
        <Probe />
      </>,
    )
    expect(screen.getByTestId('active')).toHaveTextContent('none')
  })

  it('reports the intersecting section', () => {
    render(
      <>
        <Sections />
        <Probe />
      </>,
    )
    fake.setIntersecting(screen.getByTestId('dos'), true)
    expect(screen.getByTestId('active')).toHaveTextContent('dos')
  })

  it('prefers the earliest section in the list when several intersect', () => {
    render(
      <>
        <Sections />
        <Probe />
      </>,
    )
    fake.setIntersecting(screen.getByTestId('tres'), true)
    fake.setIntersecting(screen.getByTestId('dos'), true)
    expect(screen.getByTestId('active')).toHaveTextContent('dos')
    fake.setIntersecting(screen.getByTestId('dos'), false)
    expect(screen.getByTestId('active')).toHaveTextContent('tres')
  })

  it('observes nothing and returns none while disabled', () => {
    render(
      <>
        <Sections />
        <Probe enabled={false} />
      </>,
    )
    expect(fake.live()).toHaveLength(0)
    expect(screen.getByTestId('active')).toHaveTextContent('none')
  })

  it('ignores ids that are not in the document', () => {
    render(<Probe />)
    expect(screen.getByTestId('active')).toHaveTextContent('none')
  })

  it('returns none when IntersectionObserver is unsupported', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    render(
      <>
        <Sections />
        <Probe />
      </>,
    )
    expect(screen.getByTestId('active')).toHaveTextContent('none')
  })
})
