import { describe, expect, it } from 'vitest'

import { profile } from '@/data/profile'
import { isPlaceholder } from '@/lib/placeholder'

const SAFE_HREF = /^(https:\/\/|mailto:)/

describe('profile data', () => {
  it('keeps the owner-confirmed identity verbatim', () => {
    expect(profile.name).toBe('Ander Alexander Aguirre Tejada')
    expect(profile.role).toBe('Desarrollador full-stack · Seguridad')
    expect(profile.focusAreas).toEqual(['Software', 'Web', 'Ciberseguridad', 'Desarrollo asistido por IA'])
  })

  it('has unique link ids and only https/mailto or placeholder hrefs', () => {
    const ids = profile.links.map((link) => link.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const link of profile.links) {
      expect(isPlaceholder(link.href) || SAFE_HREF.test(link.href)).toBe(true)
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

  it('flags unconfirmed items as placeholders', () => {
    expect(isPlaceholder(profile.links.find((link) => link.id === 'cv')!.href)).toBe(true)
    expect(isPlaceholder(profile.about.aiNote.approval)).toBe(true)
  })
})
