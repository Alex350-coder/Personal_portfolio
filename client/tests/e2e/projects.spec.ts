import { AxeBuilder } from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function blockingViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.help}`)
}

const FEATURED_TITLES = [
  'Attack Surface Studio',
  'Pensiones — SaaS para restaurantes',
  'Threat Intelligence Dashboard',
  'Sistema de información hospitalaria',
  'ElectroShop — microservicios',
]

test.describe('Projects (home)', () => {
  test('shows the featured projects in order, with safe GitHub links', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#proyectos')
    await section.scrollIntoViewIfNeeded()
    const titles = section.getByRole('heading', { level: 3 })
    await expect(titles).toHaveText([...FEATURED_TITLES, 'Más en GitHub'])

    const repoLinks = section.getByRole('link', { name: /Código en GitHub/ })
    await expect(repoLinks).toHaveCount(FEATURED_TITLES.length)
    for (const link of await repoLinks.all()) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(link).toHaveAttribute('href', /^https:\/\/github\.com\/Alex350-coder\//)
    }
  })

  test('"Ver todos" opens the index and a technology chip opens it filtered', async ({ page }) => {
    await page.goto('/')
    await page.locator('#proyectos').getByRole('link', { name: 'Ver todos los proyectos' }).click()
    await expect(page).toHaveURL(/\/proyectos$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Todos los proyectos' })).toBeVisible()

    await page.goto('/')
    await page.locator('#tecnologias').getByRole('link', { name: /^Rust/ }).click()
    await expect(page).toHaveURL(/\/proyectos\?tec=rust$/)
    await expect(page.getByRole('status')).toHaveText('1 proyecto')
  })

  test('has no serious or critical axe violations on /', async ({ page }) => {
    await page.goto('/')
    await page.locator('#proyectos').scrollIntoViewIfNeeded()
    await page.locator('#tecnologias').scrollIntoViewIfNeeded()
    // Let the Reveal fades finish so contrast is measured on the final state.
    await page.waitForTimeout(1200)
    expect(await blockingViolations(page)).toEqual([])
  })

  test('shows every card at once with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const cards = page.locator('#proyectos [data-revealed]')
    await expect(cards).toHaveCount(FEATURED_TITLES.length + 1)
    for (const card of await cards.all()) await expect(card).toHaveAttribute('data-revealed', 'true')
    for (const glow of await page.locator('#proyectos [data-glow]').all()) await expect(glow).toHaveAttribute('data-glow', 'off')
  })
})

test.describe('Projects (index)', () => {
  test('filters by keyboard, updates the URL and the live count, and restores on reload', async ({ page }) => {
    await page.goto('/proyectos')
    const status = page.getByRole('status')
    await expect(status).toHaveText('13 proyectos')

    const seguridad = page.getByRole('button', { name: 'Seguridad', exact: true })
    await seguridad.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/proyectos\?categoria=seguridad$/)
    await expect(seguridad).toHaveAttribute('aria-pressed', 'true')
    await expect(status).toHaveText('3 proyectos')

    await page.reload()
    await expect(page.getByRole('button', { name: 'Seguridad', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByRole('status')).toHaveText('3 proyectos')
  })

  test('combines category and technology, then clears everything', async ({ page }) => {
    await page.goto('/proyectos?categoria=seguridad&tec=typescript')
    await expect(page.getByRole('combobox', { name: 'Tecnología' })).toHaveValue('typescript')
    await expect(page.getByRole('status')).toHaveText('2 proyectos')

    await page.getByRole('button', { name: 'Limpiar filtros' }).click()
    await expect(page).toHaveURL(/\/proyectos$/)
    await expect(page.getByRole('status')).toHaveText('13 proyectos')
  })

  test('shows an empty state when nothing matches', async ({ page }) => {
    await page.goto('/proyectos?categoria=ia')
    await expect(page.getByText('Ningún proyecto coincide con estos filtros')).toBeVisible()
    await expect(page.getByRole('status')).toHaveText('0 proyectos')
  })

  test('the whole card is one focusable link to the detail route', async ({ page }) => {
    await page.goto('/proyectos')
    await page.getByRole('link', { name: 'Attack Surface Studio', exact: true }).click()
    await expect(page).toHaveURL(/\/proyectos\/attack-surface-studio$/)
  })

  test('has no serious or critical axe violations, with and without filters', async ({ page }) => {
    await page.goto('/proyectos')
    expect(await blockingViolations(page)).toEqual([])
    await page.goto('/proyectos?categoria=seguridad&estado=en-desarrollo')
    expect(await blockingViolations(page)).toEqual([])
  })
})

for (const [name, width, height] of [
  ['mobile 375', 375, 800],
  ['tablet 768', 768, 1024],
] as const) {
  test.describe(`Projects (${name})`, () => {
    test.use({ viewport: { width, height } })

    for (const path of ['/', '/proyectos']) {
      test(`${path} has no horizontal scroll and no serious axe violations`, async ({ page }) => {
        await page.goto(path)
        await page.locator('#proyectos, #proyectos-index-heading').first().scrollIntoViewIfNeeded()
        await page.waitForTimeout(1200)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow).toBeLessThanOrEqual(0)
        expect(await blockingViolations(page)).toEqual([])
      })
    }

    test('filters stay reachable and every target is at least 44px tall', async ({ page }) => {
      await page.goto('/proyectos')
      const controls = page.getByRole('group', { name: 'Filtros de proyectos' }).locator('button, select')
      for (const control of await controls.all()) {
        const box = await control.boundingBox()
        expect(box?.height ?? 0).toBeGreaterThanOrEqual(43.5)
      }
    })
  })
}
