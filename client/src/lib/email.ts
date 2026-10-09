/**
 * The published address is stored as chunks (data/profile.ts) and assembled here, so the
 * full `user@domain` never appears as a literal in the source or the bundle (docs/Security.md:
 * trivial-scraping mitigation; not a secret, the address is public by the owner's choice).
 */
export interface EmailParts {
  /** Chunks of the local part, joined with no separator. */
  user: readonly string[]
  /** Domain labels, joined with dots (at least two: name + TLD). */
  domain: readonly string[]
}

const SAFE_CHUNK = /^[A-Za-z0-9._+-]+$/

/** No leading/trailing/double dots in either part, and a TLD of 2+ letters. */
const ADDRESS = /^[A-Za-z0-9+_-]+(?:\.[A-Za-z0-9+_-]+)*@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/

function assertChunks(name: string, chunks: readonly string[], min: number): void {
  if (chunks.length < min) throw new Error(`Email ${name} needs at least ${min} chunk(s)`)
  if (!chunks.every((chunk) => SAFE_CHUNK.test(chunk))) throw new Error(`Email ${name} has an invalid chunk`)
}

export function buildEmailAddress({ user, domain }: EmailParts): string {
  assertChunks('user', user, 1)
  assertChunks('domain', domain, 2)
  const address = `${user.join('')}@${domain.join('.')}`
  if (!ADDRESS.test(address)) throw new Error('Assembled email address is invalid')
  return address
}

export function buildMailtoHref(parts: EmailParts): string {
  return `mailto:${buildEmailAddress(parts)}`
}
