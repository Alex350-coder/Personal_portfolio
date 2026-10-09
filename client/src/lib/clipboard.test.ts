import { afterEach, describe, expect, it, vi } from 'vitest'

import { copyText } from '@/lib/clipboard'

function stubClipboard(writeText: ((text: string) => Promise<void>) | undefined) {
  Object.defineProperty(navigator, 'clipboard', { value: writeText ? { writeText } : undefined, configurable: true })
}

function stubExecCommand(result: boolean | Error) {
  const exec = vi.fn(() => {
    if (result instanceof Error) throw result
    return result
  })
  Object.defineProperty(document, 'execCommand', { value: exec, configurable: true })
  return exec
}

afterEach(() => {
  stubClipboard(undefined)
  Reflect.deleteProperty(document, 'execCommand')
})

describe('copyText', () => {
  it('uses the async Clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)

    await expect(copyText('hello')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('hello')
  })

  it('falls back to execCommand when the Clipboard API rejects', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    const exec = stubExecCommand(true)

    await expect(copyText('hello')).resolves.toBe(true)
    expect(exec).toHaveBeenCalledWith('copy')
  })

  it('falls back to execCommand when the Clipboard API is missing and cleans up the helper node', async () => {
    stubClipboard(undefined)
    stubExecCommand(true)

    await expect(copyText('hello')).resolves.toBe(true)
    expect(document.querySelector('textarea')).toBeNull()
  })

  it('gives focus back to the element that had it after the legacy copy', async () => {
    stubClipboard(undefined)
    stubExecCommand(true)
    const button = document.createElement('button')
    document.body.append(button)
    button.focus()

    await copyText('hello')

    expect(document.activeElement).toBe(button)
    button.remove()
  })

  it('resolves false (never throws) when every strategy fails', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    stubExecCommand(new Error('blocked'))

    await expect(copyText('hello')).resolves.toBe(false)
    expect(document.querySelector('textarea')).toBeNull()
  })

  it('resolves false when execCommand reports failure', async () => {
    stubClipboard(undefined)
    stubExecCommand(false)

    await expect(copyText('hello')).resolves.toBe(false)
  })
})
