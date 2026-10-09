import { AxeBuilder } from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function blockingViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.help}`)
}

/** Scrolls through the page so every Reveal block has faded in before contrast is measured. */
async function revealEverything(page: Page) {
  for (const section of await page.locator('article section').all()) await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
}

const SAMPLE_SLUGS = ['saas-pensiones', 'attack-surface-studio', 'security-notes'] as const

test.describe('Project detail pages', () => {
  test('a deep link renders the project with its title, links and highlights', async ({ page }) => {
    await page.goto('/proyectos/saas-pensiones')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pensiones — SaaS para restaurantes')
    await expect(page).toHaveTitle('Pensiones — SaaS para restaurantes | Portafolio')
    await expect(page.getByRole('heading', { level: 2, name: 'Aspectos técnicos destacados' })).toBeVisible()

    const repo = page.getByRole('link', { name: /Código en GitHub/ })
    await expect(repo).toHaveAttribute('href', 'https://github.com/Alex350-coder/SaaS-pensiones')
    await expect(repo).toHaveAttribute('target', '_blank')
    await expect(repo).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('text-only projects show no empty sections', async ({ page }) => {
    await page.goto('/proyectos/personal-tasks')
    await expect(page.locator('article').getByRole('heading', { level: 2 })).toHaveText(['Qué problema resuelve', 'Tecnologías usadas'])
    await expect(page.locator('article img')).toHaveCount(0)
  })

  test('browser back and forward move between the index and a detail page', async ({ page }) => {
    await page.goto('/proyectos')
    await page.getByRole('link', { name: 'Attack Surface Studio', exact: true }).click()
    await expect(page).toHaveURL(/\/proyectos\/attack-surface-studio$/)
    await expect(page).toHaveTitle('Attack Surface Studio | Portafolio')

    await page.goBack()
    await expect(page).toHaveURL(/\/proyectos$/)
    await expect(page).toHaveTitle('Proyectos | Portafolio')

    await page.goForward()
    await expect(page).toHaveURL(/\/proyectos\/attack-surface-studio$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Attack Surface Studio')
  })

  test('previous and next follow the dataset order', async ({ page }) => {
    await page.goto('/proyectos/saas-pensiones')
    const nav = page.getByRole('navigation', { name: 'Más proyectos' })
    await expect(nav.getByRole('link', { name: /Anterior/ })).toHaveAttribute('href', '/proyectos/attack-surface-studio')
    await nav.getByRole('link', { name: /Siguiente/ }).click()
    await expect(page).toHaveURL(/\/proyectos\/threat-intelligence-dashboard$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Threat Intelligence Dashboard')
  })

  test('a technology opens the index filtered by it', async ({ page }) => {
    await page.goto('/proyectos/saas-pensiones')
    await page.getByRole('link', { name: 'Ver proyectos con Prisma' }).click()
    await expect(page).toHaveURL(/\/proyectos\?tec=prisma$/)
    await expect(page.getByRole('status')).not.toHaveText('0 proyectos')
  })

  test('an unknown slug shows the in-theme 404 with a way back to the index', async ({ page }) => {
    await page.goto('/proyectos/no-existe')
    await expect(page.getByRole('heading', { level: 1, name: 'Este proyecto no existe' })).toBeVisible()
    await expect(page).toHaveTitle('Proyecto no encontrado | Portafolio')
    await page.getByRole('link', { name: 'Ver todos los proyectos' }).click()
    await expect(page).toHaveURL(/\/proyectos$/)
  })

  test('keyboard users reach the repo link and the neighbours in order', async ({ page }) => {
    await page.goto('/proyectos/saas-pensiones')
    await page.getByRole('link', { name: /Todos los proyectos/ }).focus()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: /Código en GitHub/ })).toBeFocused()
  })

  for (const slug of SAMPLE_SLUGS) {
    test(`/proyectos/${slug} has one h1 and no serious or critical axe violations`, async ({ page }) => {
      await page.goto(`/proyectos/${slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await revealEverything(page)
      expect(await blockingViolations(page)).toEqual([])
    })
  }

  test('all sections are visible at once with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/proyectos/saas-pensiones')
    const blocks = page.locator('article [data-revealed]')
    expect(await blocks.count()).toBeGreaterThan(0)
    for (const block of await blocks.all()) await expect(block).toHaveAttribute('data-revealed', 'true')
  })
})

for (const [name, width, height] of [
  ['mobile 375', 375, 800],
  ['tablet 768', 768, 1024],
] as const) {
  test.describe(`Project detail (${name})`, () => {
    test.use({ viewport: { width, height } })

    for (const slug of SAMPLE_SLUGS) {
      test(`/proyectos/${slug} has no horizontal scroll and no serious axe violations`, async ({ page }) => {
        await page.goto(`/proyectos/${slug}`)
        await revealEverything(page)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow).toBeLessThanOrEqual(0)
        expect(await blockingViolations(page)).toEqual([])
      })
    }
  })
}
