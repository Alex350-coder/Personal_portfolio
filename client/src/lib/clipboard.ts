/** Legacy path for contexts without the async Clipboard API (older browsers, insecure origins). */
function copyWithExecCommand(text: string): boolean {
  if (typeof document.execCommand !== 'function') return false
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.setAttribute('aria-hidden', 'true')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  try {
    field.select()
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
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
    } catch {
      // Permission denied or document not focused: try the legacy path before reporting failure.
    }
  }
  return copyWithExecCommand(text)
}
