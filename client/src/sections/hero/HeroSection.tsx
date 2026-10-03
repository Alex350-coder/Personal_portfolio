import { ArrowRight, Mail } from "lucide-react"

import HalftoneNebula, { type NebulaParams } from "@/components/ui/halftone-nebula"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

const actionBase =
  "pointer-events-auto h-11 rounded-none px-5 font-mono text-[11px] uppercase tracking-[0.24em]"

export default function HeroSection() {
  return (
    <HalftoneNebula preset="abyssal" params={SKY} touch="scroll" maxDpr={1.5}>
      <div className="flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#e4fffb]/60">
          Portafolio / {YEAR}
        </p>

        <div className="max-w-2xl pb-6 sm:pb-10">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#3ff2e0]">
            ✦ {PROFILE.role}
          </p>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-[#e4fffb] sm:text-6xl lg:text-7xl">
            {PROFILE.name}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#e4fffb]/70 sm:text-base">
            {PROFILE.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e4fffb]/60">
            {FOCUS_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className={cn(
                buttonVariants({ variant: "outline" }),
                actionBase,
                "border-[#3ff2e0] bg-[#3ff2e0]/10 text-[#e4fffb] hover:bg-[#3ff2e0] hover:text-[#02060a]",
              )}
            >
              Explorar proyectos
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              href="#contacto"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                actionBase,
                "border-[#e4fffb]/25 text-[#e4fffb] hover:bg-[#e4fffb]/10",
              )}
            >
              <Mail aria-hidden="true" />
              Contacto
            </a>
          </div>
        </div>
      </div>
    </HalftoneNebula>
  )
}
