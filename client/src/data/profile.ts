import { buildEmailAddress, buildMailtoHref, type EmailParts } from '@/lib/email'
import type { Placeholder } from '@/lib/placeholder'

/**
 * Single source of truth for who the owner is (Rules §11: copy lives in data, not components).
 * Seeded from docs/ProfileData.md §7 (owner decisions, authoritative). Anything the owner has
 * not provided stays a `[[PLACEHOLDER: …]]` (registry: docs/ContentStrategy.md).
 * Never mention certifications; never claim solo/manual authorship (ADR-008).
 */

export type LinkId = 'github' | 'linkedin' | 'email' | 'cv'

export interface ProfileLink {
  id: LinkId
  label: string
  /** https:// or mailto: URL, or a placeholder while the resource does not exist. */
  href: string | Placeholder
}

export interface FocusPillar {
  id: 'software-web' | 'ciberseguridad' | 'ia-asistida'
  title: string
  description: string
}

export interface ProfileFact {
  label: string
  value: string | Placeholder
}

/** Published address as chunks; assembled by lib/email.ts (ADR-009). */
export const emailParts: EmailParts = { user: ['anderaguirre', '787'], domain: ['gmail', 'com'] }

/** The assembled public address, for display and the copy button. */
export const emailAddress = buildEmailAddress(emailParts)

/** The matching `mailto:` href (single source for Contact, footer and the profile link). */
export const mailtoHref = buildMailtoHref(emailParts)

export interface Profile {
  name: string
  role: string
  summary: string
  /** Short tags shown in the Hero. */
  focusAreas: readonly string[]
  about: {
    eyebrow: string
    heading: string
    intro: readonly string[]
    pillars: readonly FocusPillar[]
    facts: readonly ProfileFact[]
    /** Draft until the owner approves it (docs/ContentStrategy.md, missing item #1). */
    aiNote: { text: string; approval: Placeholder | 'approved' }
  }
  links: readonly ProfileLink[]
}

export const profile: Profile = {
  name: 'Ander Alexander Aguirre Tejada',
  role: 'Desarrollador full-stack · Seguridad',
  summary:
    'Desarrollo aplicaciones web full-stack con enfoque en seguridad. Aquí reúno mis proyectos, con el código disponible en GitHub.',
  focusAreas: ['Software', 'Web', 'Ciberseguridad', 'Desarrollo asistido por IA'],
  about: {
    eyebrow: 'Sobre mí',
    heading: 'Desarrollo web con la seguridad en mente',
    intro: [
      'Soy desarrollador full-stack y me interesa la seguridad. Construyo aplicaciones web de punta a punta y practico seguridad ofensiva en laboratorios.',
      'Todo el código está en GitHub: puedes revisarlo y juzgar el trabajo por lo que hay en los repositorios.',
    ],
    pillars: [
      {
        id: 'software-web',
        title: 'Software y web',
        description:
          'Aplicaciones full-stack con React y TypeScript, y servicios en NestJS, Spring Boot o Django.',
      },
      {
        id: 'ciberseguridad',
        title: 'Ciberseguridad',
        description:
          'Autenticación, control de acceso y validación en mis aplicaciones, además de write-ups y notas de laboratorios de seguridad ofensiva.',
      },
      {
        id: 'ia-asistida',
        title: 'Desarrollo asistido por IA',
        description:
          'Construyo muchos de mis sistemas con Claude Code: reviso y pruebo el resultado y resuelvo los problemas. Lo digo de forma explícita para que sepas cómo trabajo.',
      },
    ],
    facts: [
      { label: 'Ubicación', value: 'Cajamarca, Perú' },
      { label: 'Enfoque', value: 'Full-stack · seguridad' },
      { label: 'Código', value: 'GitHub: Alex350-coder' },
      { label: 'Estudios', value: 'Ingeniería de Sistemas, Universidad Privada del Norte (en curso)' },
      { label: 'Disponibilidad', value: 'Busco oportunidades de nivel inicial o medio · Abierto a trabajo remoto' },
      { label: 'Roles de interés', value: 'Analista SOC, pentester junior, analista de vulnerabilidades, desarrollador web' },
    ],
    aiNote: {
      text: 'Cómo trabajo: uso Claude Code para escribir el código, pruebo el resultado y resuelvo los problemas. También sé programar y corregir errores a mano; con IA simplemente es más rápido.',
      approval: 'approved',
    },
  },
  links: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Alex350-coder' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ander-aguirre-tejada-76318333a' },
    { id: 'email', label: 'Correo', href: mailtoHref },
    { id: 'cv', label: 'CV', href: '/cv/Ander-Aguirre-Tejada-CV.pdf' },
  ],
}
