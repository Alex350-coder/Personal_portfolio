/** Rules §20: only absolute https: URLs are accepted for external links and project data. */
export function isHttpsUrl(href: string): boolean {
  try {
    return new URL(href).protocol === 'https:'
  } catch {
    return false
  }
}
