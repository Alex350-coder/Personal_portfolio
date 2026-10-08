import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// 1x1 transparent PNG: the kit gallery uses remote fixture URLs, answered here so no image is stored in the repo.
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
)

// Runs against the Vite dev server (project `chromium-dev`): the gallery fixture lives in /__kit.
test.describe('Gallery lightbox (dev kit fixture)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://fixtures.test/**', (route) => route.fulfill({ contentType: 'image/png', body: PIXEL }))
    await page.goto('/__kit')
    await expect(page.getByRole('heading', { level: 2, name: 'Capturas' })).toBeVisible()
  })

  test('opens from the keyboard, navigates with arrows, closes with Escape and restores focus', async ({ page }) => {
    const second = page.getByRole('button', { name: 'Ampliar captura: Captura de prueba dos' })
    await second.focus()
    await page.keyboard.press('Enter')

    const dialog = page.getByRole('dialog', { name: 'Visor de capturas' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('status')).toContainText('Captura 2 de 3')

    await page.keyboard.press('ArrowRight')
    await expect(dialog.getByRole('status')).toContainText('Captura 3 de 3')
    await page.keyboard.press('Home')
    await expect(dialog.getByRole('status')).toContainText('Captura 1 de 3')

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page.getByRole('button', { name: 'Ampliar captura: Captura de prueba uno' })).toBeFocused()
  })

  test('traps focus while open (Tab never lands on the page behind)', async ({ page }) => {
    await page.getByRole('button', { name: 'Ampliar captura: Captura de prueba uno' }).click()
    const dialog = page.getByRole('dialog', { name: 'Visor de capturas' })
    await expect(dialog).toBeVisible()

    for (let press = 0; press < 8; press += 1) {
      await page.keyboard.press('Tab')
      // Focus may briefly leave to the browser UI (body); it must never land on page content behind the modal.
      const allowed = await page.evaluate(
        () => document.activeElement === document.body || document.activeElement?.closest('dialog') != null,
      )
      expect(allowed).toBe(true)
    }
  })

  test('has no serious or critical axe violations with the lightbox open', async ({ page }) => {
    await page.getByRole('button', { name: 'Ampliar captura: Captura de prueba uno' }).click()
    await expect(page.getByRole('dialog', { name: 'Visor de capturas' })).toBeVisible()
    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  })
})
