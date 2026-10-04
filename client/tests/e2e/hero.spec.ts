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

test.describe('Hero accessibility and robustness', () => {
  test('is the #inicio landmark, named by the h1', async ({ page }) => {
    await page.goto('/')
    const hero = page.getByRole('region', { name: 'Ander Alexander Aguirre Tejada' })
    await expect(hero).toHaveAttribute('id', 'inicio')
  })

  test('the pause button stops the render loop and resume restarts it', async ({ page }) => {
    // Count the animation frames the page actually runs: a paused Hero must stop requesting them.
    await page.addInitScript(() => {
      const w = window as unknown as { __frames: number }
      w.__frames = 0
      const original = window.requestAnimationFrame.bind(window)
      window.requestAnimationFrame = (callback) =>
        original((time) => {
          w.__frames += 1
          callback(time)
        })
    })
    await page.goto('/')
    await page.locator('canvas').waitFor()

    const frames = () => page.evaluate(() => (window as unknown as { __frames: number }).__frames)
    const framesAfter = async (ms: number) => {
      await page.waitForTimeout(ms)
      return frames()
    }

    const running = await framesAfter(500)
    expect(await framesAfter(500)).toBeGreaterThan(running) // animating

    await page.getByRole('button', { name: 'Pausar animación de fondo' }).click()
    const paused = await framesAfter(400) // let the in-flight frame finish
    expect(await framesAfter(800)).toBe(paused) // no new frames while paused

    await page.getByRole('button', { name: 'Reanudar animación de fondo' }).click()
    expect(await framesAfter(800)).toBeGreaterThan(paused) // animating again
  })

  test('the pause button works from the keyboard', async ({ page }) => {
    await page.goto('/')
    const pause = page.getByRole('button', { name: 'Pausar animación de fondo' })
    await pause.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('button', { name: 'Reanudar animación de fondo' })).toBeFocused()
  })

  test('has no pause button under prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('button', { name: /animación de fondo/ })).toHaveCount(0)
  })

  test('without WebGL2 it shows a fallback in the preset palette, not the crimson one', async ({ page }) => {
    await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null
    })
    await page.goto('/')

    const hero = page.locator('#inicio')
    await expect(hero.locator('canvas')).toHaveCount(0)
    // abyssal void #02060a, not the crimson default #050309.
    await expect(hero).toHaveCSS('background-color', 'rgb(2, 6, 10)')
    const fallback = await hero.locator('div.absolute.inset-0').first().evaluate((el) => getComputedStyle(el).backgroundImage)
    expect(fallback).toContain('rgb(63, 242, 224)') // abyssal accent #3ff2e0
    expect(fallback).not.toContain('rgb(255, 31, 90)') // crimson hot #ff1f5a
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
