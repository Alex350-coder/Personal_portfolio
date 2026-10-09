/** Outcome texts of a copy action, shared by the copy control and its copy in `data/`. */
export interface CopyLabels {
  idle: string
  copied: string
  failed: string
}

/** Legacy path for contexts without the async Clipboard API (older browsers, insecure origins). */
function copyWithExecCommand(text: string): boolean {
  try {
    if (typeof document.execCommand !== 'function') return false
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.setAttribute('aria-hidden', 'true')
    field.style.position = 'fixed'
    field.style.top = '0'
    field.style.opacity = '0'
    document.body.append(field)
    try {
      field.select()
      field.setSelectionRange(0, text.length)
      return document.execCommand('copy')
    } finally {
      field.remove()
      // select() moved focus into the helper node; give it back so keyboard users keep their place.
      previous?.focus({ preventScroll: true })
    }
  } catch {
    return false
  }
}

/**
 * Copies `text` and reports whether it worked. Never throws: the caller must show the outcome
 * (CopyButton announces both success and failure), so a failure is a value, not a silent catch.
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      // Permission denied or document not focused: try the legacy path before reporting failure.
      if (import.meta.env.DEV) console.debug('[clipboard] writeText rejected, trying execCommand', error)
    }
  }
  return copyWithExecCommand(text)
}
