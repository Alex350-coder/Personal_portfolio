import { lazy, Suspense } from "react"

import HeroSection from "@/sections/hero/HeroSection"

// Dev-only primitive gallery. The DEV guard is statically replaced at build time, so the
// dynamic import (and the whole src/dev chunk) is removed from the production bundle.
const KitPage = import.meta.env.DEV ? lazy(() => import("@/dev/KitPage")) : null

export default function App() {
  if (KitPage && window.location.pathname === "/__kit") {
    return (
      <Suspense fallback={null}>
        <KitPage />
      </Suspense>
    )
  }

  return (
    <main>
      <HeroSection />
    </main>
  )
}
