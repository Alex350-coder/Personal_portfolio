import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CopyButton } from '@/components/ui/copy-button'
import { seriousViolations } from '@/test/axe'

const LABELS = { idle: 'Copiar', copied: 'Copiado', failed: 'No se pudo copiar' }

vi.mock('@/lib/clipboard', () => ({ copyText: vi.fn() }))
import { copyText } from '@/lib/clipboard'

afterEach(() => vi.mocked(copyText).mockReset())

function setup(resetMs = 400) {
  return render(<CopyButton value="a@b.co" labels={LABELS} resetMs={resetMs} />)
}

describe('CopyButton', () => {
  it('is a named button with an empty polite status region initially', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Copiar' })).toBeEnabled()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('copies the value and announces success, then resets', async () => {
    vi.mocked(copyText).mockResolvedValue(true)
    setup()

    await userEvent.click(screen.getByRole('button'))

    expect(copyText).toHaveBeenCalledWith('a@b.co')
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copiado'))
    expect(screen.getByRole('button', { name: 'Copiado' })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('status')).toBeEmptyDOMElement())
    expect(screen.getByRole('button', { name: 'Copiar' })).toBeInTheDocument()
  })

  it('announces failure instead of swallowing it', async () => {
    vi.mocked(copyText).mockResolvedValue(false)
    setup()

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('No se pudo copiar'))
  })

  it('works from the keyboard (Enter and Space)', async () => {
    vi.mocked(copyText).mockResolvedValue(true)
    setup(1000)
    const button = screen.getByRole('button')
    button.focus()

    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copiado'))
    await userEvent.keyboard(' ')
    expect(copyText).toHaveBeenCalledTimes(2)
  })

  it('does not set state after unmount', async () => {
    let resolveCopy: (ok: boolean) => void = () => undefined
    vi.mocked(copyText).mockReturnValue(new Promise((resolve) => (resolveCopy = resolve)))
    const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { unmount } = setup()

    await userEvent.click(screen.getByRole('button'))
    unmount()
    resolveCopy(true)
    await Promise.resolve()

    expect(errors).not.toHaveBeenCalled()
  })

  it('has no serious accessibility violations', async () => {
    const { container } = setup()
    expect(await seriousViolations(container)).toEqual([])
  })
})
