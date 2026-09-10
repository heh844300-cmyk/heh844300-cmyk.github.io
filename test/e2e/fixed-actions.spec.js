import { expect, test } from '@playwright/test'

test('固定操作圖示在 hover 時維持文字與圖示顏色', async ({ page }) => {
  await page.goto('/')

  const actions = [
    page.getByRole('button', { name: '動效設定：使用系統設定' }),
    page.getByRole('link', { name: 'GitHub' }),
    page.getByRole('link', { name: 'Gmail' }),
  ]

  for (const action of actions) {
    const text = action.locator('span')
    const icon = action.locator('svg')
    const color = await text.evaluate((element) => getComputedStyle(element).color)
    const iconColor = await icon.evaluate((element) => getComputedStyle(element).color)
    const background = await action.evaluate((element) => getComputedStyle(element).backgroundColor)

    await action.hover()
    await page.waitForTimeout(250)

    await expect(text).toHaveCSS('color', color)
    await expect(icon).toHaveCSS('color', iconColor)
    await expect(action).toHaveCSS('background-color', background)
  }
})
