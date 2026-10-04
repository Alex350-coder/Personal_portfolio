import axe from 'axe-core'

/**
 * Runs axe-core on a rendered container and returns serious/critical violations as readable strings.
 * color-contrast is off: jsdom has no layout/paint, so contrast is verified in Playwright instead.
 */
export async function seriousViolations(container: Element): Promise<string[]> {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
  })
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.help}`)
}
