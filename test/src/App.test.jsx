import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  }
})

describe('固定操作圖示', () => {
  it.each([
    ['首頁', '#/'],
    ['專案案例頁', '#/projects/personal-site'],
    ['開發紀錄頁', '#/projects/personal-site/development-record'],
  ])('在%s提供動效、GitHub 與 Gmail 操作', (_, route) => {
    window.location.hash = route
    render(<App />)

    expect(screen.getByRole('button', { name: '動效設定：使用系統設定' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Gmail' })).toBeTruthy()
  })
})
