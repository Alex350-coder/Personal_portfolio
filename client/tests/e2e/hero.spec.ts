import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Hero smoke', () => {
  test('renders the Hero with a canvas and no console errors', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text())
    })
    page.on('pageerror', (error) => problems.push(error.message))

    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ander Alexander Aguirre Tejada')
    await expect(page.locator('canvas')).toBeVisible()
    expect(problems).toEqual([])
  })

  test('renders a static frame under prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.locator('canvas')).toBeVisible()
    await expect(page.getByRole('link', { name: /explorar proyectos/i })).toBeVisible()
  })

  test('has no serious or critical axe violations', async ({ page }) => {
    await page.goto('/')
    await page.locator('canvas').waitFor()

    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')

    expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  })
})
