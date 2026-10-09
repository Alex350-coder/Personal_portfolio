import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CopyButton } from '@/components/ui/copy-button'
import { copyText } from '@/lib/clipboard'
import { seriousViolations } from '@/test/axe'

const LABELS = { idle: 'Copiar', copied: 'Copiado', failed: 'No se pudo copiar' }
const RESET_MS = 2500

vi.mock('@/lib/clipboard', () => ({ copyText: vi.fn() }))

beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }))
afterEach(() => {
  vi.useRealTimers()
  vi.mocked(copyText).mockReset()
})

function setup() {
  const user = userEvent.setup({ delay: null })
  return { user, ...render(<CopyButton value="a@b.co" labels={LABELS} resetMs={RESET_MS} />) }
}

describe('CopyButton', () => {
  it('is a named button with an empty polite status region initially', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Copiar' })).toBeEnabled()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('copies the value, announces success and keeps the button name stable', async () => {
    vi.mocked(copyText).mockResolvedValue(true)
    const { user } = setup()

    await user.click(screen.getByRole('button'))

    expect(copyText).toHaveBeenCalledWith('a@b.co')
    expect(screen.getByRole('status')).toHaveTextContent('Copiado')
    expect(screen.getByRole('button', { name: 'Copiar' })).toBeInTheDocument()
  })

  it('clears the message after the reset delay', async () => {
    vi.mocked(copyText).mockResolvedValue(true)
    const { user } = setup()
    await user.click(screen.getByRole('button'))

    act(() => vi.advanceTimersByTime(RESET_MS - 100))
    expect(screen.getByRole('status')).toHaveTextContent('Copiado')
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('restarts the delay on a second click and changes the text so it is announced again', async () => {
    vi.mocked(copyText).mockResolvedValue(true)
    const { user } = setup()
    await user.click(screen.getByRole('button'))
    const first = screen.getByRole('status').textContent

    act(() => vi.advanceTimersByTime(RESET_MS - 500))
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('status').textContent).not.toBe(first)

    act(() => vi.advanceTimersByTime(RESET_MS - 100))
    expect(screen.getByRole('status')).toHaveTextContent('Copiado')
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('announces failure instead of swallowing it', async () => {
    vi.mocked(copyText).mockResolvedValue(false)
    const { user } = setup()

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('status')).toHaveTextContent('No se pudo copiar')
  })

  it('works from the keyboard (Enter and Space)', async () => {
    vi.mocked(copyText).mockResolvedValue(true)
    const { user } = setup()
    screen.getByRole('button').focus()

    await user.keyboard('{Enter}')
    await user.keyboard(' ')

    expect(copyText).toHaveBeenCalledTimes(2)
  })

  it('schedules no timer when the copy resolves after unmount', async () => {
    let resolveCopy: (ok: boolean) => void = () => undefined
    vi.mocked(copyText).mockReturnValue(new Promise((resolve) => (resolveCopy = resolve)))
    const { user, unmount } = setup()

    await user.click(screen.getByRole('button'))
    unmount()
    await act(async () => resolveCopy(true))

    expect(vi.getTimerCount()).toBe(0)
  })

  it('has no serious accessibility violations', async () => {
    vi.useRealTimers() // axe schedules work with timers
    const { container } = setup()
    expect(await seriousViolations(container)).toEqual([])
  })
})
