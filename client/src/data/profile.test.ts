import { describe, expect, it } from 'vitest'

import { emailAddress, profile } from '@/data/profile'
import { isCvPath } from '@/lib/cv'
import { isPlaceholder } from '@/lib/placeholder'

const SAFE_HREF = /^(https:\/\/|mailto:)/

describe('profile data', () => {
  it('keeps the owner-confirmed identity verbatim', () => {
    expect(profile.name).toBe('Ander Alexander Aguirre Tejada')
    expect(profile.role).toBe('Desarrollador full-stack · Seguridad')
    expect(profile.focusAreas).toEqual(['Software', 'Web', 'Ciberseguridad', 'Desarrollo asistido por IA'])
  })

  it('has unique link ids and only https/mailto, a /cv/ PDF path or placeholder hrefs', () => {
    const ids = profile.links.map((link) => link.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const link of profile.links) {
      const cvPath = link.id === 'cv' && isCvPath(link.href)
      expect(isPlaceholder(link.href) || SAFE_HREF.test(link.href) || cvPath).toBe(true)
    }
  })

  it('has the three focus pillars with unique ids', () => {
    expect(profile.about.pillars.map((pillar) => pillar.id)).toEqual([
      'software-web',
      'ciberseguridad',
      'ia-asistida',
    ])
  })

  it('never mentions certifications (ADR-008)', () => {
    expect(JSON.stringify(profile)).not.toMatch(/certific|eJPT|Security\+/i)
  })

  it('never claims solo authorship (ADR-008)', () => {
    expect(JSON.stringify(profile)).not.toMatch(/yo solo|sin ayuda|completamente solo/i)
  })

  it('points the CV at a published PDF and still flags the pending AI-note approval', () => {
    expect(profile.links.find((link) => link.id === 'cv')!.href).toBe('/cv/Ander-Aguirre-Tejada-CV.pdf')
    expect(isPlaceholder(profile.about.aiNote.approval)).toBe(true)
  })
})

describe('link data is renderable', () => {
  it('every non-placeholder link passes the same safety check the UI applies (no silent drops)', () => {
    for (const link of profile.links) {
      if (isPlaceholder(link.href)) continue
      const ok = link.id === 'cv' ? isCvPath(link.href) : SAFE_HREF.test(link.href)
      expect(ok, link.id).toBe(true)
    }
  })
})

describe('published email', () => {
  it('derives the email link from the assembled address', () => {
    const email = profile.links.find((link) => link.id === 'email')
    expect(email?.href).toBe(`mailto:${emailAddress}`)
    expect(emailAddress).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i)
  })
})
