import { ArrowRight, Mail } from "lucide-react"

import HalftoneNebula, { type NebulaParams } from "@/components/ui/halftone-nebula"
import { ActionLink } from "@/components/ui/action-link"
import { Eyebrow } from "@/components/ui/eyebrow"

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
  return (
    <HalftoneNebula preset="abyssal" params={SKY} touch="scroll" maxDpr={1.5}>
      <div className="flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <p className="type-meta">Portafolio / {YEAR}</p>

        <div className="max-w-2xl pb-6 sm:pb-10">
          <Eyebrow className="mb-4">{PROFILE.role}</Eyebrow>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-star sm:text-6xl lg:text-7xl">
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
