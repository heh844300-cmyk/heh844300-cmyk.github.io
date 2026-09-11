import { expect, test } from '@playwright/test'

test('桌面滑鼠移動啟動 Canvas 尾線與稀疏粒子', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  await expect(page.locator('[data-motion-reduced="false"]')).toBeVisible()

  const canvas = page.locator('[data-cursor-trail-canvas]')
  await expect(canvas).toBeVisible()
  await page.mouse.move(240, 240)
  await expect(canvas).toHaveAttribute('data-trail-active', 'true')
  await expect(canvas).toHaveAttribute('data-particle-count', '4')

  await page.waitForTimeout(600)
  await expect(canvas).toHaveAttribute('data-trail-active', 'false')
})

test('連續移動以節流的粒子群維持 Canvas 尾線', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')
  await expect(page.locator('[data-motion-reduced="false"]')).toBeVisible()

  const canvas = page.locator('[data-cursor-trail-canvas]')
  await page.mouse.move(120, 180)
  await page.waitForTimeout(60)
  await page.mouse.move(260, 260)
  await page.waitForTimeout(60)
  await page.mouse.move(420, 340)

  await expect(canvas).toHaveAttribute('data-trail-active', 'true')
  await expect(canvas).toHaveAttribute('data-particle-count', '12')
})

test('關閉動效時 Canvas 不繪製尾線或粒子', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('motion-preference', 'reduced'))
  await page.goto('/')

  const canvas = page.locator('[data-cursor-trail-canvas]')
  await page.mouse.move(240, 240)
  await expect(canvas).toHaveAttribute('data-trail-active', 'false')
  await expect(canvas).toHaveAttribute('data-particle-count', '0')
})

test.describe('手機觸控', () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } })

  test('觸控不啟動 Canvas 尾線或粒子', async ({ page }) => {
    await page.goto('/')
    await page.touchscreen.tap(200, 300)

    const canvas = page.locator('[data-cursor-trail-canvas]')
    await expect(canvas).toHaveAttribute('data-trail-active', 'false')
    await expect(canvas).toHaveAttribute('data-particle-count', '0')
  })
})
