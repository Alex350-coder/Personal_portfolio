/**
 * The CV is the only same-origin file the site links to. Only `/cv/<file>.pdf` (a flat name from
 * `client/public/cv/`) is accepted, so a bad value in data can never become a script or foreign URL.
 */
const CV_PATH = /^\/cv\/[A-Za-z0-9][A-Za-z0-9._-]*\.pdf$/

export function isCvPath(href: string): boolean {
  return CV_PATH.test(href) && !href.includes('..')
}
