import type { CopyLabels } from '@/lib/clipboard'

/** Contact section copy (Rules §11). Availability wording comes from the owner CV (2026-10-09). */
export const contactCopy = {
  statement:
    'Busco oportunidades de nivel inicial o medio y estoy abierto a trabajo remoto. Escríbeme para hablar de un proyecto, una colaboración o del código que ves aquí: la forma más directa es el correo.',
  emailLabel: 'Correo',
  emailHint: 'Se abre tu aplicación de correo. Si no tienes una, copia la dirección.',
  copy: {
    idle: 'Copiar correo',
    copied: 'Correo copiado',
    failed: 'No se pudo copiar',
  } satisfies CopyLabels,
  profilesLabel: 'Perfiles',
} as const

/** Closing calls to action that lead to `/#contacto` (Hero → Projects → Contact flow). */
export const contactCta = {
  detail: {
    heading: '¿Hablamos de este proyecto?',
    body: 'Si algo de lo que viste te interesa, escríbeme y lo comentamos.',
    action: 'Ir a contacto',
  },
  index: {
    heading: '¿Algo te llamó la atención?',
    body: 'Escríbeme para comentar cualquiera de estos proyectos.',
    action: 'Ir a contacto',
  },
} as const

export type ContactCtaCopy = (typeof contactCta)[keyof typeof contactCta]
