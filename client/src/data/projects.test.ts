import { describe, expect, it } from 'vitest'

import { validateProjects } from '@/data/project.schema'
import { projects } from '@/data/projects'

describe('projects dataset', () => {
  it('passes the schema validation', () => {
    expect(validateProjects(projects)).toEqual([])
  })

  it('features exactly the five owner-selected projects in order (ProfileData.md §7)', () => {
    const featured = projects
      .filter((project) => project.featured !== undefined)
      .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
      .map((project) => project.slug)
    expect(featured).toEqual([
      'attack-surface-studio',
      'saas-pensiones',
      'threat-intelligence-dashboard',
      'health-his',
      'electroshop-microservicios',
    ])
  })

  it('never features the sensitive index-only entry', () => {
    expect(projects.find((project) => project.slug === 'p2p-exchange-simulado')?.featured).toBeUndefined()
  })

  it('excludes the repos the owner removed from the site', () => {
    const repos = projects.map((project) => project.links.repo).join(' ')
    expect(repos).not.toMatch(/Italian_restaurant|Land_Rover/)
  })

  it('links only to the owner GitHub account and invents no live demos', () => {
    for (const project of projects) {
      expect(project.links.repo).toMatch(/^https:\/\/github\.com\/Alex350-coder\/[\w.-]+$/)
      expect(project.links.live, project.slug).toBeUndefined()
    }
  })

  it('contains no invented metrics: the only percentage is the owner-confirmed backend coverage', () => {
    const withPercent = projects.filter((project) => JSON.stringify(project).includes('%')).map((project) => project.slug)
    expect(withPercent).toEqual(['saas-pensiones'])
  })

  it('never mentions certifications (ADR-008) nor betting imagery fields', () => {
    expect(JSON.stringify(projects)).not.toMatch(/certific|eJPT|Security\+/i)
    expect(projects.find((project) => project.slug === 'p2p-exchange-simulado')?.cover).toBeUndefined()
  })

  it('marks no project as a placeholder: every entry is owner-confirmed', () => {
    expect(projects.filter((project) => project.placeholder)).toEqual([])
  })
})
