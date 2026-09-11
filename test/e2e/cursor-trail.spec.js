import { expect, test } from '@playwright/test'

test('桌面滑鼠移動產生會淡出的粉紫粒子軌跡', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  await expect(page.locator('[data-motion-reduced="false"]')).toBeVisible()

  await page.mouse.move(240, 240)
  const particles = page.locator('[data-cursor-particle]')
  await expect.poll(() => particles.count()).toBeGreaterThanOrEqual(10)
  await expect.poll(() => particles.count()).toBeLessThanOrEqual(15)
  await expect.poll(() => particles.first().evaluate((element) => Number.parseFloat(getComputedStyle(element).width))).toBeLessThan(4)
  const positions = await particles.evaluateAll((elements) => elements.map((element) => ({
    left: Number.parseFloat(getComputedStyle(element).left),
    top: Number.parseFloat(getComputedStyle(element).top),
  })))
  expect(new Set(positions.map(({ left, top }) => `${left}:${top}`)).size).toBeGreaterThan(1)
  positions.forEach(({ left, top }) => {
    expect(Math.hypot(left - 240, top - 240)).toBeLessThanOrEqual(24)
  })

  await page.waitForTimeout(600)
  await expect.poll(() => particles.first().evaluate((element) => Number(getComputedStyle(element).opacity))).toBeLessThan(1)

  await page.waitForTimeout(1000)
  await expect(particles).toHaveCount(0)
})

test('快速連續移動仍持續產生粒子群', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  await expect(page.locator('[data-motion-reduced="false"]')).toBeVisible()

  await page.mouse.move(120, 180)
  await page.mouse.move(260, 260)
  await page.mouse.move(420, 340)

  await expect.poll(() => page.locator('[data-cursor-particle]').count()).toBeGreaterThanOrEqual(30)
})

test.describe('手機觸控', () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } })

  test('觸控不產生滑鼠粒子軌跡', async ({ page }) => {
    await page.goto('/')
    await page.touchscreen.tap(200, 300)

    await expect(page.locator('[data-cursor-particle]')).toHaveCount(0)
  })
})
