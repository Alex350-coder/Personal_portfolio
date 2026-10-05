import { expect, test } from '@playwright/test'

// Runs against the production build: the dev gallery must not ship.
test('the /__kit gallery is not part of the production build', async ({ page }) => {
  const scripts: string[] = []
  page.on('response', async (response) => {
    if (response.request().resourceType() === 'script') scripts.push(await response.text())
  })

  await page.goto('/__kit')

  await expect(page.getByRole('heading', { name: 'Kit de primitivas' })).toHaveCount(0)
  expect(scripts.length).toBeGreaterThan(0)
  expect(scripts.some((source) => source.includes('Kit de primitivas'))).toBe(false)
})
