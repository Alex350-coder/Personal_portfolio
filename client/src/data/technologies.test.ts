import { describe, expect, it } from 'vitest'

import { techGroups, technologies } from '@/data/technologies'

describe('technologies data', () => {
  it('has unique, kebab-case ids (they are reused by projects)', () => {
    const ids = technologies.map((tech) => tech.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('has unique group ids and every technology belongs to a declared group', () => {
    const groupIds = techGroups.map((group) => group.id)
    expect(new Set(groupIds).size).toBe(groupIds.length)
    for (const tech of technologies) expect(groupIds).toContain(tech.group)
  })

  it('has at least one technology per group, in the planned group order', () => {
    expect(techGroups.map((group) => group.id)).toEqual(['lenguajes', 'frontend', 'backend', 'seguridad', 'ia'])
    for (const group of techGroups) {
      expect(technologies.some((tech) => tech.group === group.id), group.id).toBe(true)
    }
  })

  it('has non-empty labels and only https URLs when a URL is given', () => {
    for (const tech of technologies) {
      expect(tech.label.trim().length).toBeGreaterThan(0)
      if ('url' in tech && tech.url) expect(tech.url).toMatch(/^https:\/\//)
    }
  })

  it('lists only technologies evidenced in the repos (ProfileData.md §3, badge-only items excluded)', () => {
    const labels = technologies.map((tech) => tech.label).join(' | ')
    expect(labels).not.toMatch(/C#|PowerShell|MongoDB|Pandas|Photoshop|Canva|Vercel/)
  })

  it('has no skill levels or percentages', () => {
    expect(JSON.stringify([techGroups, technologies])).not.toMatch(/level|nivel|%|stars/i)
  })

  it('never mentions certifications (ADR-008)', () => {
    expect(JSON.stringify([techGroups, technologies])).not.toMatch(/certific|eJPT|Security\+/i)
  })
})
