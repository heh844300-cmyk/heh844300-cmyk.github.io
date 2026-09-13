import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App.jsx'

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  }
  window.requestAnimationFrame = (callback) => {
    callback()
    return 1
  }
  window.cancelAnimationFrame = vi.fn()
  HTMLElement.prototype.scrollIntoView = vi.fn()
})

beforeEach(() => {
  cleanup()
  window.location.hash = '#/'
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

describe('hash 路由', () => {
  it.each([
    ['#prototype-hero', 'prototype-hero'],
    ['#adventurer-dossier', 'adventurer-dossier'],
    ['#achievements', 'achievements'],
    ['#skills', 'skills'],
    ['#projects', 'projects'],
  ])('已知首頁 fragment %s 顯示首頁與目標區段', (route, sectionId) => {
    window.location.hash = route
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /柯均翰/ })).toBeTruthy()
    expect(document.getElementById(sectionId)).toBeTruthy()
  })

  it.each([
    ['#/projects/personal-site', '我的個人網站'],
    ['#/projects/personal-site/development-record', /讓一個網站\s*慢慢長出來/],
  ])('專案 route %s 顯示對應頁面', (route, heading) => {
    window.location.hash = route
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeTruthy()
  })

  it('未知 hash fallback 至首頁', () => {
    window.location.hash = '#not-a-route'
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /柯均翰/ })).toBeTruthy()
    expect(screen.queryByRole('heading', { level: 1, name: '我的個人網站' })).toBeNull()
    expect(screen.queryByRole('heading', { level: 1, name: /讓一個網站\s*慢慢長出來/ })).toBeNull()
  })

  it.each([
    ['#/', '跳至主要內容'],
    ['#/projects/personal-site', '跳至主要內容'],
  ])('skip link 從 %s 提交首頁主標題焦點', async (route, linkName) => {
    window.location.hash = route
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: linkName }))

    await waitFor(() => expect(window.location.hash).toBe('#/'))
    expect(screen.getByRole('heading', { level: 1, name: /柯均翰/ })).toBe(document.activeElement)
  })

  it.each([
    ['#/projects/personal-site', 'BACK TO QUEST LOG'],
    ['#/projects/personal-site', /KJH QUEST LOG/],
    ['#/projects/personal-site/development-record', /KJH QUEST LOG/],
  ])('專案頁回首頁控制項從 %s 轉移焦點', async (route, linkName) => {
    window.location.hash = route
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: linkName }))

    await waitFor(() => expect(window.location.hash).toBe('#prototype-hero'))
    expect(screen.getByRole('heading', { level: 1, name: /柯均翰/ })).toBe(document.activeElement)
  })

  it('專案頁回首頁後 HOME 導覽保留啟動連結焦點', async () => {
    window.location.hash = '#/projects/personal-site'
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: /KJH QUEST LOG/ }))
    await waitFor(() => expect(window.location.hash).toBe('#prototype-hero'))

    const navigation = screen.getByRole('navigation', { name: '頁面導覽' })
    const dossierLink = navigation.querySelector('a[href="#adventurer-dossier"]')
    const homeLink = navigation.querySelector('a[href="#prototype-hero"]')
    expect(dossierLink).toBeTruthy()
    expect(homeLink).toBeTruthy()

    dossierLink.focus()
    fireEvent.click(dossierLink)
    await waitFor(() => expect(window.location.hash).toBe('#adventurer-dossier'))

    homeLink.focus()
    fireEvent.click(homeLink)

    await waitFor(() => expect(window.location.hash).toBe('#prototype-hero'))
    expect(homeLink).toBe(document.activeElement)
  })
})
