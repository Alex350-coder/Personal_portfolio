import { describe, expect, it } from 'vitest'

/** Every non-test source file as raw text (Vite glob, so no Node typings are needed). */
const modules = import.meta.glob<string>(['/src/**/*.{ts,tsx}', '!/src/**/*.test.{ts,tsx}', '!/src/test/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const files = Object.entries(modules).map(([path, text]) => ({ name: path.replace('/src/', ''), text }))

/** Rules §20 / docs/Security.md: static guards that fail if a safe-link rule is bypassed. */
describe('source security guards', () => {
  it('scans the source tree', () => {
    expect(files.length).toBeGreaterThan(50)
  })

  it('opens new tabs only inside ExternalLink', () => {
    const offenders = files.filter(
      (file) => /target\s*[=:]\s*["'{]|window\.open\(|setAttribute\(\s*["']target/.test(file.text) && file.name !== 'components/ui/external-link.tsx',
    )
    expect(offenders.map((file) => file.name)).toEqual([])
  })

  it('never injects HTML', () => {
    const offenders = files.filter((file) => /dangerouslySetInnerHTML|\.innerHTML\s*=/.test(file.text))
    expect(offenders.map((file) => file.name)).toEqual([])
  })

  it('contains no secrets', () => {
    const SECRET = /AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{36}|AIza[0-9A-Za-z_-]{35}|xox[abp]-[A-Za-z0-9-]+|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|(?:password|token|api[_-]?key)\s*[:=]\s*["'][^"']+["']/i
    expect(files.filter((file) => SECRET.test(file.text)).map((file) => file.name)).toEqual([])
  })

  it('never writes the contact address as a literal (lib/email.ts assembles it)', () => {
    const LITERAL_EMAIL = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i
    expect(files.filter((file) => LITERAL_EMAIL.test(file.text)).map((file) => file.name)).toEqual([])
  })
})
