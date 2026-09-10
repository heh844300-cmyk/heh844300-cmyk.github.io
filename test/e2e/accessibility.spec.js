import { expect, test } from '@playwright/test'

test('鍵盤使用者可跳至首頁主標題', async ({ page }) => {
  await page.goto('/')

  const skipLink = page.getByRole('link', { name: '跳至主要內容' })
  await skipLink.focus()
  await expect(skipLink).toBeFocused()

  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
})

test('LOCKED 專案卡提供狀態資訊但不是可聚焦控制項', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: /COMING SOON/ })).toHaveCount(0)
  await expect(page.getByText('COMING SOON')).toHaveCount(3)
  await expect(page.getByText('LOCKED')).toHaveCount(3)
})

test('動效設定在系統、關閉與開啟模式間循環並保存覆寫', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')

  const action = page.getByRole('button', { name: '動效設定：使用系統設定' })
  await action.click()
  await expect(page.getByRole('button', { name: '動效設定：關閉動效' })).toBeVisible()
  await expect(page.locator('[data-motion-reduced="true"]')).toBeVisible()
  await expect.poll(() => page.evaluate(() => localStorage.getItem('motion-preference'))).toBe('reduced')

  await page.getByRole('button', { name: '動效設定：關閉動效' }).click()
  await expect(page.getByRole('button', { name: '動效設定：開啟動效' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => localStorage.getItem('motion-preference'))).toBe('full')

  await page.getByRole('button', { name: '動效設定：開啟動效' }).click()
  await expect(page.getByRole('button', { name: '動效設定：使用系統設定' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => localStorage.getItem('motion-preference'))).toBeNull()
})

test('沒有保存覆寫時動效設定採用系統 reduced-motion 偏好', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => localStorage.clear())
  await page.goto('/')

  await expect(page.locator('[data-motion-reduced="true"]')).toBeVisible()
  await expect(page.getByRole('button', { name: '動效設定：使用系統設定' })).toBeVisible()
})

test('hash 路由切換後焦點移至新頁主標題', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: /個人網站/ }).click()
  await expect(page).toHaveURL(/#\/projects\/personal-site$/)
  await expect(page.getByRole('heading', { level: 1, name: '我的個人網站' })).toBeFocused()

  await page.getByRole('link', { name: '展開成長紀錄 ->' }).click()
  await expect(page).toHaveURL(/#\/projects\/personal-site\/development-record$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
})

test.describe('手機觸控操作', () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } })

  test('可開啟 MENU、時間軸節點與動效設定', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'MENU' }).click()
    await expect(page.getByRole('link', { name: /專案/ })).toBeVisible()

    await page.goto('/#/projects/personal-site/development-record')
    await page.getByRole('button', { name: '01' }).click()
    await expect(page.getByRole('heading', { level: 2, name: '確立目標' })).toBeVisible()

    await page.getByRole('button', { name: '動效設定：使用系統設定' }).click()
    await expect(page.getByRole('button', { name: '動效設定：關閉動效' })).toBeVisible()
  })
})
