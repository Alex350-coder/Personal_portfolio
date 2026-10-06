import type { ComponentProps } from 'react'

import { uiLabels } from '@/data/ui'
import { isHttpsUrl } from '@/lib/url'

/**
 * The one way to link outside the site: `target="_blank"` always comes with
 * `rel="noopener noreferrer"` and a screen-reader hint. An unsafe href renders its text
 * without a link instead of a broken or dangerous anchor.
 */
export function ExternalLink({ href, children, ...props }: Omit<ComponentProps<'a'>, 'target' | 'rel'>) {
  if (href === undefined || !isHttpsUrl(href)) return <span className={props.className}>{children}</span>

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children} <span className="sr-only">{uiLabels.opensInNewTab}</span>
    </a>
  )
}
