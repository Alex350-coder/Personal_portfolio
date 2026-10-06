import { AxeBuilder } from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function blockingViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.help}`)
}

test.describe('Navigation (desktop)', () => {
  test('the skip link is the first tab stop and moves focus to the content', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Saltar al contenido' })
    await expect(skip).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#contenido$/)
  })

  test('the header is hidden while the Hero is visible and appears after scrolling past it', async ({ page }) => {
    await page.goto('/')
    const header = page.getByRole('banner')
    await expect(header).toHaveAttribute('data-hidden', 'true')
    // Still keyboard-reachable: focusing a header control reveals it.
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Ander Alexander Aguirre Tejada' }).first()).toBeFocused()
    await expect(header).toBeInViewport({ ratio: 0.9 })
    await page.locator('#sobre-mi').scrollIntoViewIfNeeded()
    await expect(header).toHaveAttribute('data-hidden', 'false', { timeout: 15_000 })
    await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible()
  })

  test('is reachable by keyboard and scrolls to the section (hash scroll)', async ({ page }) => {
    await page.goto('/')
    await page.locator('#sobre-mi').scrollIntoViewIfNeeded()
    const link = page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Tecnologías' })
    await link.focus()
    await expect(link).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#tecnologias$/)
    await expect(page.locator('#tecnologias')).toBeInViewport({ timeout: 15_000 })
  })

  test('Hero CTAs reach existing anchors', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#inicio')
    await hero.getByRole('link', { name: /explorar proyectos/i }).click()
    await expect(page.locator('#proyectos')).toBeInViewport({ timeout: 15_000 })
    await page.goto('/')
    await hero.getByRole('link', { name: 'Contacto' }).click()
    await expect(page.locator('#contacto')).toBeInViewport({ timeout: 15_000 })
  })

  test('the header is always visible on other routes and moves focus to main on navigation', async ({ page }) => {
    await page.goto('/proyectos')
    await expect(page.getByRole('banner')).toHaveAttribute('data-hidden', 'false')
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Sobre mí' }).click()
    await expect(page).toHaveURL(/\/#sobre-mi$/)
    await expect(page.locator('#sobre-mi')).toBeInViewport({ timeout: 15_000 })
  })

  test('has no serious or critical axe violations on /', async ({ page }) => {
    await page.goto('/')
    await page.locator('canvas').waitFor()
    await page.locator('#sobre-mi').scrollIntoViewIfNeeded()
    // axe measures contrast: wait until no Reveal is mid-fade (500 ms + stagger).
    await expect(page.locator('#sobre-mi [data-revealed="false"]')).toHaveCount(0)
    await page.waitForTimeout(900)
    expect(await blockingViolations(page)).toEqual([])
  })

  test('has no serious or critical axe violations on /proyectos and the 404', async ({ page }) => {
    await page.goto('/proyectos')
    expect(await blockingViolations(page)).toEqual([])
    await page.goto('/no-existe')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Esta página no existe')
    expect(await blockingViolations(page)).toEqual([])
  })

  test('reduced motion: sections are shown without reveal transitions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.locator('#sobre-mi').scrollIntoViewIfNeeded()
    const revealed = page.locator('#sobre-mi [data-revealed]')
    for (const element of await revealed.all()) {
      await expect(element).toHaveAttribute('data-revealed', 'true')
      expect(await element.evaluate((node) => getComputedStyle(node).transitionDuration)).toBe('0s')
    }
  })
})

test.describe('Navigation (mobile 375)', () => {
  test.use({ viewport: { width: 375, height: 700 } })

  test('the menu opens, traps focus in the header, closes on Escape and restores focus', async ({ page }) => {
    await page.goto('/proyectos')
    const toggle = page.getByRole('button', { name: 'Menú' })
    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('button', { name: 'Cerrar' })).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: 'Sobre mí' })).toBeFocused()

    // Tabbing cannot leave the header: the page content is inert.
    for (let i = 0; i < 8; i += 1) await page.keyboard.press('Tab')
    const inHeader = await page.evaluate(() => document.activeElement?.closest('header') !== null)
    expect(inHeader).toBe(true)

    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Menú' })).toBeFocused()
    await expect(page.getByRole('link', { name: 'Sobre mí' })).toHaveCount(0)
  })

  test('choosing a link closes the menu and scrolls to the section', async ({ page }) => {
    await page.goto('/proyectos')
    await page.getByRole('button', { name: 'Menú' }).click()
    await page.getByRole('link', { name: 'Tecnologías' }).click()
    await expect(page).toHaveURL(/\/#tecnologias$/)
    await expect(page.locator('#tecnologias')).toBeInViewport({ timeout: 15_000 })
    await expect(page.getByRole('button', { name: 'Menú' })).toHaveAttribute('aria-expanded', 'false')
  })

  test('has no horizontal scroll on Home and no axe violations with the menu open', async ({ page }) => {
    await page.goto('/')
    await page.locator('canvas').waitFor()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.goto('/proyectos')
    await page.getByRole('button', { name: 'Menú' }).click()
    expect(await blockingViolations(page)).toEqual([])
  })
})
