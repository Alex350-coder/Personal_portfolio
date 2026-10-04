import { useState } from "react"
import { ArrowRight, Mail, Pause, Play } from "lucide-react"

import HalftoneNebula, { type NebulaParams } from "@/components/ui/halftone-nebula"
import { ActionLink } from "@/components/ui/action-link"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// Owner-confirmed copy (see docs/ProfileData.md §7). Moves to data/profile.ts in Phase 2 (P2-T04).
const PROFILE = {
  name: "Ander Alexander Aguirre Tejada",
  role: "Desarrollador full-stack · Seguridad",
  summary:
    "Desarrollo aplicaciones web full-stack con enfoque en seguridad. Aquí reúno mis proyectos, con el código disponible en GitHub.",
}

const YEAR = new Date().getFullYear()

const FOCUS_AREAS = ["Software", "Web", "Ciberseguridad", "Desarrollo asistido por IA"]

// Cool palette; planet parked top-right, clear of the bottom-left copy.
const SKY: Partial<NebulaParams> = { planetX: 0.76, planetY: 0.72 }

export default function HeroSection() {
  // Pause state lives in memory only: a reload starts playing again.
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <HalftoneNebula
      id="inicio"
      labelledBy="inicio-titulo"
      preset="abyssal"
      params={SKY}
      touch="scroll"
      maxDpr={1.5}
      paused={paused}
    >
      <div className="flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="flex items-start justify-between gap-4">
          <p className="type-meta">Portafolio / {YEAR}</p>
          {/* WCAG 2.2.2: the background animates for more than 5 s, so it can be paused. */}
          {reducedMotion ? null : (
            <Button
              type="button"
              variant="ghost-hero"
              // aria-label starts with the visible word, as WCAG 2.5.3 (Label in Name) requires.
              aria-label={paused ? "Reanudar animación de fondo" : "Pausar animación de fondo"}
              onClick={() => setPaused((value) => !value)}
              className="pointer-events-auto -mt-2.5 h-9 gap-2 rounded-none px-3 font-mono text-[10px] uppercase tracking-[0.24em]"
            >
              {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              {paused ? "Reanudar" : "Pausar"}
            </Button>
          )}
        </div>

        <div className="max-w-2xl pb-6 sm:pb-10">
          <Eyebrow className="mb-4">{PROFILE.role}</Eyebrow>
          <h1
            id="inicio-titulo"
            className="text-5xl font-semibold leading-[0.95] tracking-tight text-star sm:text-6xl lg:text-7xl"
          >
            {PROFILE.name}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-star/70 sm:text-base">
            {PROFILE.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-star/60">
            {FOCUS_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="#proyectos">
              Explorar proyectos
              <ArrowRight aria-hidden="true" />
            </ActionLink>
            <ActionLink href="#contacto" variant="ghost-hero">
              <Mail aria-hidden="true" />
              Contacto
            </ActionLink>
          </div>
        </div>
      </div>
    </HalftoneNebula>
  )
}
