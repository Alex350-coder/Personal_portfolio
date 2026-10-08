import type { CopyButtonLabels } from '@/components/ui/copy-button'

/** Contact section copy (Rules §11). No availability claim: the owner has not supplied one (ADR-009). */
export const contactCopy = {
  statement:
    'Escríbeme para hablar de un proyecto, una colaboración o del código que ves aquí. La forma más directa es el correo.',
  emailLabel: 'Correo',
  emailHint: 'Se abre tu aplicación de correo. Si no tienes una, copia la dirección.',
  copy: {
    idle: 'Copiar correo',
    copied: 'Correo copiado',
    failed: 'No se pudo copiar',
  } satisfies CopyButtonLabels,
  profilesLabel: 'Perfiles',
} as const
