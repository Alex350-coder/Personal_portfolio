import type { Placeholder } from '@/lib/placeholder'

/** Eyebrow / heading / lead of the Home sections whose content is not part of `profile`. */
export interface SectionCopy {
  eyebrow: string
  heading: string
  lead?: string
}

export const sections = {
  tecnologias: {
    eyebrow: 'Tecnologías',
    heading: 'Con qué trabajo',
    lead: 'Herramientas agrupadas por área. Sin niveles ni porcentajes: la evidencia está en los proyectos que las usan.',
  },
  proyectos: {
    eyebrow: 'Proyectos',
    heading: 'Proyectos seleccionados',
  },
  contacto: {
    eyebrow: 'Contacto',
    heading: 'Hablemos',
  },
} as const satisfies Record<string, SectionCopy>

/** Shown inside sections whose real content belongs to a later phase. */
export const pendingNotes = {
  tecnologias: '[[PLACEHOLDER: projects that use each technology (Phase 3)]]',
  proyectos: '[[PLACEHOLDER: featured projects section (Phase 3)]]',
  contacto: '[[PLACEHOLDER: contact section (Phase 5)]]',
} as const satisfies Record<string, Placeholder>
