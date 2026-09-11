import { expect, test } from '@playwright/test'

test('鍵盤使用者可跳至首頁主標題', async ({ page }) => {
  await page.goto('/')

  const skipLink = page.getByRole('link', { name: '跳至主要內容' })
  await skipLink.focus()
  await expect(skipLink).toBeFocused()
  const bounds = await skipLink.boundingBox()
  const viewport = page.viewportSize()
  expect(bounds.y).toBe(24)
  expect(Math.abs(bounds.x + bounds.width / 2 - viewport.width / 2)).toBeLessThan(1)

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

test('桌面導覽可用左右鍵移動焦點', async ({ page }) => {
  await page.goto('/')

  const links = page.getByRole('navigation', { name: '頁面導覽' }).getByRole('link')
  await links.nth(0).focus()
  await page.keyboard.press('ArrowRight')
  await expect(links.nth(1)).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(links.nth(0)).toBeFocused()
})

test('時間軸節點可用左右鍵移動焦點並展開目前節點', async ({ page }) => {
  await page.goto('/#/projects/personal-site/development-record')

  const nodes = page.getByRole('button', { name: /^\d{2}$/ })
  await nodes.nth(1).focus()
  await page.keyboard.press('ArrowRight')

  await expect(nodes.nth(2)).toBeFocused()
  await expect(nodes.nth(2)).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('ArrowLeft')
  await expect(nodes.nth(1)).toBeFocused()
})

test('冒險者檔案可將標語複製到剪貼簿', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')

  await page.getByRole('button', { name: '複製標語' }).click()

  await expect(page.getByText('標語已複製')).toBeVisible()
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('Cogito, ergo sum')
})

test('鍵盤可用 Enter 與 Space 複製標語', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])

  for (const key of ['Enter', ' ']) {
    await page.goto('/')
    const button = page.getByRole('button', { name: '複製標語' })
    await button.focus()
    await page.keyboard.press(key)

    await expect(page.getByText('標語已複製')).toBeVisible()
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('Cogito, ergo sum')
  }
})

test('標語已複製提示在三秒後淡出並於五秒後消失', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-write'])
  await page.goto('/')

  await page.getByRole('button', { name: '複製標語' }).click()
  const status = page.getByText('標語已複製')
  await expect(status).toBeVisible()

  await page.waitForTimeout(3100)
  await expect.poll(() => status.evaluate((element) => Number(getComputedStyle(element).opacity))).toBeLessThan(1)

  await page.waitForTimeout(2100)
  await expect(status).toHaveCount(0)
})

test('專案案例顯示個人網站首頁預覽', async ({ page }) => {
  await page.goto('/#/projects/personal-site')

  await expect(page.getByRole('img', { name: '個人網站首頁預覽' })).toBeVisible()
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
