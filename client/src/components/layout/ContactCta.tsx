import { Mail } from 'lucide-react'
import { Link } from 'react-router'
import { useId } from 'react'

import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/button'
import { DotGrid } from '@/components/ui/dot-grid'
import type { ContactCtaCopy } from '@/data/contact'

/** End-of-page call to action that leads back to the Home contact section. */
export function ContactCta({ copy }: { copy: ContactCtaCopy }) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="pb-16 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden border border-star-10 bg-haze/40 p-6 sm:p-10">
          <DotGrid />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id={headingId} className="type-h3">
                {copy.heading}
              </h2>
              <p className="type-body mt-2">{copy.body}</p>
            </div>
            <Link to="/#contacto" className={buttonVariants({ variant: 'hero', size: 'hero' })}>
              <Mail aria-hidden="true" className="size-4" />
              {copy.action}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
