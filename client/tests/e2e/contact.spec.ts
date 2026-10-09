import { AxeBuilder } from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function blockingViolations(page: Page, include?: string) {
  const builder = new AxeBuilder({ page })
  const { violations } = await (include ? builder.include(include) : builder).analyze()
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.help}`)
}

test.describe('Contact', () => {
  // Chromium-only permission names; add a browser guard if other engines join playwright.config.ts.
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

  test('the Hero Contacto CTA is reachable by keyboard and lands on the section', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('#inicio').getByRole('link', { name: 'Contacto' })
    await cta.focus()
    await expect(cta).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('#contacto')).toBeInViewport({ timeout: 15_000 })
  })

  test('shows a mailto link and no form', async ({ page }) => {
    await page.goto('/#contacto')
    const section = page.locator('#contacto')
    const mail = section.getByRole('link', { name: /@/ })
    await expect(mail).toHaveAttribute('href', /^mailto:[^@\s]+@[^@\s]+$/)
    await expect(section.locator('form')).toHaveCount(0)
  })

  test('copy button copies the address and announces it', async ({ page }) => {
    await page.goto('/#contacto')
    const section = page.locator('#contacto')
    const address = (await section.getByRole('link', { name: /@/ }).textContent())?.trim() ?? ''
    expect(address).toContain('@')

    await section.getByRole('button', { name: 'Copiar correo' }).click()

    await expect(section.getByRole('status')).toHaveText('Correo copiado')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(address)
    await expect(section.getByRole('status')).toHaveText('', { timeout: 6_000 })
  })

  test('external profile links are safe and the CV is a download link or readable fallback', async ({ page }) => {
    await page.goto('/#contacto')
    const list = page.locator('#contacto').getByRole('list', { name: 'Enlaces profesionales' })
    for (const name of [/GitHub/, /LinkedIn/]) {
      const link = list.getByRole('link', { name })
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    const missing = list.locator('[data-cv-missing]')
    if (await missing.count()) {
      await expect(missing).toHaveText(/próximamente/)
      await expect(list.getByRole('link', { name: /CV/ })).toHaveCount(0)
      await expect(list.getByText(/PLACEHOLDER/)).toHaveCount(0)
    } else {
      const cv = list.getByRole('link', { name: /CV/ })
      await expect(cv).toHaveAttribute('href', /^\/cv\/[\w.-]+\.pdf$/)
      await expect(cv).toHaveAttribute('download', /\.pdf$/)
      const response = await page.request.get((await cv.getAttribute('href')) ?? '')
      expect(response.status()).toBe(200)
    }
  })

  test('has no serious axe violations in the contact section', async ({ page }) => {
    await page.goto('/#contacto')
    await expect(page.locator('#contacto')).toBeInViewport({ timeout: 15_000 })
    expect(await blockingViolations(page, '#contacto')).toEqual([])
  })
})

test.describe('Footer and closing CTAs', () => {
  for (const path of ['/', '/proyectos', '/proyectos/saas-pensiones', '/no-existe']) {
    test(`${path} has the footer with links and no serious violations`, async ({ page }) => {
      await page.goto(path)
      const footer = page.getByRole('contentinfo')
      await expect(footer.getByRole('link', { name: /GitHub/ })).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Volver arriba' })).toHaveAttribute('href', '/#inicio')
      expect(await blockingViolations(page, 'footer')).toEqual([])
    })
  }

  test('back-to-top returns to the Hero from the footer', async ({ page }) => {
    await page.goto('/#contacto')
    await page.getByRole('contentinfo').getByRole('link', { name: 'Volver arriba' }).click()
    await expect(page.locator('#inicio')).toBeInViewport({ timeout: 15_000 })
  })

  test('a project detail page ends with a CTA that leads to the contact section', async ({ page }) => {
    await page.goto('/proyectos/saas-pensiones')
    await page.getByRole('link', { name: 'Ir a contacto' }).click()
    await expect(page).toHaveURL(/\/#contacto$/)
    await expect(page.locator('#contacto')).toBeInViewport({ timeout: 15_000 })
  })

  test('the 404 offers two ways out', async ({ page }) => {
    await page.goto('/no-existe')
    await expect(page.getByRole('heading', { level: 1, name: 'Esta página no existe' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ver proyectos' })).toHaveAttribute('href', '/proyectos')
    expect(await blockingViolations(page)).toEqual([])
  })
})
