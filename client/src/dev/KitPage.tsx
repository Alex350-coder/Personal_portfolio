import { ArrowRight, Mail } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SkipLink } from '@/components/layout/SkipLink'
import { ActionLink } from '@/components/ui/action-link'
import { DotGrid } from '@/components/ui/dot-grid'
import { Eyebrow } from '@/components/ui/eyebrow'
import { GlowCard } from '@/components/ui/glow-card'
import { Reveal } from '@/components/ui/reveal'

function Specimen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-star-10 py-8">
      <p className="type-label mb-5">{title}</p>
      {children}
    </div>
  )
}

/**
 * Development-only gallery of the Phase 1 primitives, served at /__kit.
 * App.tsx imports it behind `import.meta.env.DEV`, so it never ships in the production build.
 */
export default function KitPage() {
  return (
    <>
      <SkipLink targetId="kit-contenido" />
      <main id="kit-contenido">
        <Section
          id="kit"
          eyebrow="Desarrollo"
          heading="Kit de primitivas"
          lead="Galería interna de los componentes de la Fase 1. Solo existe en el servidor de desarrollo."
        >
          <Specimen title="Eyebrow">
            <Eyebrow>Desarrollador full-stack · Seguridad</Eyebrow>
          </Specimen>

          <Specimen title="ActionLink: hero / ghost-hero">
            <div className="flex flex-wrap gap-3">
              <ActionLink href="#kit">
                Explorar proyectos
                <ArrowRight aria-hidden="true" />
              </ActionLink>
              <ActionLink href="#kit" variant="ghost-hero">
                <Mail aria-hidden="true" />
                Contacto
              </ActionLink>
            </div>
          </Specimen>

          <Specimen title="Tipografía">
            <h3 className="type-h3">Título de tercer nivel</h3>
            <p className="type-body mt-3">
              Texto de cuerpo con el ancho de lectura limitado a 65 caracteres para que la línea nunca se haga
              demasiado larga en pantallas grandes.
            </p>
            <p className="type-meta mt-4">Etiqueta meta · 10 px</p>
          </Specimen>

          <Specimen title="DotGrid">
            <div className="relative h-40 border border-star-10 bg-haze/40">
              <DotGrid />
            </div>
          </Specimen>

          <Specimen title="Reveal">
            <Reveal>
              <p className="type-body">Este bloque aparece con un fundido de 500 ms al entrar en pantalla.</p>
            </Reveal>
          </Specimen>

          <Specimen title="GlowCard">
            <GlowCard className="max-w-sm p-6">
              <h3 className="type-h3">Tarjeta con luz</h3>
              <p className="type-body mt-2">Mueve el puntero sobre la tarjeta para ver el brillo.</p>
            </GlowCard>
          </Specimen>

          <Specimen title="Container">
            <Container className="border border-dashed border-star-25 py-4">
              <p className="type-label">max-w-page + section-x</p>
            </Container>
          </Specimen>
        </Section>
      </main>
    </>
  )
}
