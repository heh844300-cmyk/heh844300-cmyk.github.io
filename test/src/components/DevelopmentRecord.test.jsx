import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DevelopmentRecord from './DevelopmentRecord.jsx'

async function tabToNode(user, node, maxTabs = 25) {
  for (let i = 0; i < maxTabs; i += 1) {
    await user.tab()
    if (document.activeElement === node) return
  }
  throw new Error('Tab 未能在時間軸內到達目標節點')
}

describe('開發紀錄時間軸鍵盤操作', () => {
  it('頁面載入時所有時間軸節點初始為收合狀態', () => {
    render(<DevelopmentRecord />)
    const nodes = screen.getAllByRole('button', { name: /^\d{2}$/ })
    nodes.forEach((node) => {
      expect(node.getAttribute('aria-expanded')).toBe('false')
    })
  })

  it('Tab 可依序到達各時間軸節點', async () => {
    const user = userEvent.setup()
    render(<DevelopmentRecord />)

    const nodes = screen.getAllByRole('button', { name: /^\d{2}$/ })

    await tabToNode(user, nodes[0])
    expect(nodes[0].getAttribute('aria-expanded')).toBe('true')

    await tabToNode(user, nodes[1])
    expect(nodes[1].getAttribute('aria-expanded')).toBe('true')
    expect(nodes[0].getAttribute('aria-expanded')).toBe('false')
  })

  it('滑鼠移入節點時展開該節點', async () => {
    const user = userEvent.setup()
    render(<DevelopmentRecord />)

    const nodes = screen.getAllByRole('button', { name: /^\d{2}$/ })
    await user.hover(nodes[2])

    expect(nodes[2].getAttribute('aria-expanded')).toBe('true')
    expect(nodes[0].getAttribute('aria-expanded')).toBe('false')
  })

  it('聚焦節點後按下 Enter 展開該節點', async () => {
    const user = userEvent.setup()
    render(<DevelopmentRecord />)

    const nodes = screen.getAllByRole('button', { name: /^\d{2}$/ })
    await tabToNode(user, nodes[1])
    await user.keyboard('{Enter}')

    expect(nodes[1].getAttribute('aria-expanded')).toBe('true')
  })

  it('聚焦節點後按下 Space 展開該節點', async () => {
    const user = userEvent.setup()
    render(<DevelopmentRecord />)

    const nodes = screen.getAllByRole('button', { name: /^\d{2}$/ })
    await tabToNode(user, nodes[3])
    await user.keyboard(' ')

    expect(nodes[3].getAttribute('aria-expanded')).toBe('true')
  })

  it('展開節點時其他節點維持收合', async () => {
    const user = userEvent.setup()
    render(<DevelopmentRecord />)

    const nodes = screen.getAllByRole('button', { name: /^\d{2}$/ })
    await tabToNode(user, nodes[1])
    await user.keyboard('{Enter}')

    nodes.forEach((node, index) => {
      expect(node.getAttribute('aria-expanded')).toBe(index === 1 ? 'true' : 'false')
    })
  })
})
