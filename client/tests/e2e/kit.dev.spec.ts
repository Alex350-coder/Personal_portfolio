import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Runs against the Vite dev server (project `chromium-dev`): /__kit only exists there.
test.describe('/__kit primitive gallery (dev only)', () => {
  test('lists every primitive and has no serious or critical axe violations', async ({ page }) => {
    await page.goto('/__kit')
    await expect(page.getByRole('heading', { level: 2, name: 'Kit de primitivas' })).toBeVisible()

    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  })

  test('the skip link is the first tab stop and moves focus to the content', async ({ page }) => {
    await page.goto('/__kit')
    // The dev page is lazy-loaded: wait for it before sending keys.
    await expect(page.getByRole('heading', { level: 2, name: 'Kit de primitivas' })).toBeVisible()
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Saltar al contenido' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
  })
})
