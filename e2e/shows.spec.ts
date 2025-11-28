import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/ertflix/i)
})

test('loads shows on home page', async ({ page }) => {
  await page.goto('/')

  // Wait for shows to load (look for show cards)
  const showCards = page.locator('.show-card')
  await expect(showCards.first()).toBeVisible({ timeout: 15000 })

  // Check if there are multiple shows
  const count = await showCards.count()
  expect(count).toBeGreaterThan(0)
})

test('navigates to search page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Search' }).click()
  await expect(page).toHaveURL(/.*search/)
  await expect(page.getByPlaceholder('Type to search...')).toBeVisible()
})

test('search functionality', async ({ page }) => {
  await page.goto('/search')
  const searchInput = page.getByPlaceholder('Type to search...')
  await searchInput.fill('Batman')

  // Wait for results
  const showCards = page.locator('.show-card')
  await expect(showCards.first()).toBeVisible({ timeout: 15000 })

  // Check if results contain "Batman"
  const firstCardImage = showCards.first().locator('img')
  const altText = await firstCardImage.getAttribute('alt')
  expect(altText?.toLowerCase()).toContain('batman')
})
