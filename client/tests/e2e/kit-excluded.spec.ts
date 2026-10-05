import { expect, test } from '@playwright/test'

// Runs against the production build: the dev gallery must not ship.
test('the /__kit gallery is not part of the production build', async ({ page }) => {
  const scripts: string[] = []
  page.on('response', async (response) => {
    if (response.request().resourceType() === 'script') scripts.push(await response.text())
  })

  await page.goto('/__kit')

  // No such route in production: the in-theme 404 answers instead.
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Esta página no existe')
  await expect(page.getByRole('heading', { name: 'Kit de primitivas' })).toHaveCount(0)
  expect(scripts.length).toBeGreaterThan(0)
  expect(scripts.some((source) => source.includes('Kit de primitivas'))).toBe(false)
})
