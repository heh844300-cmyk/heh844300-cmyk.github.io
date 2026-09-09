import { useEffect } from 'react'

export function useSectionNavigation({ motionEnabled, statusRef } = {}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target
      if (target.closest?.('[role="tablist"], [role="tabpanel"]')) return
      if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) return

      const sections = Array.from(document.querySelectorAll('[data-section]'))
      if (!sections.length) return

      const first = sections[0]
      const margin = first
        ? parseFloat(getComputedStyle(first).scrollMarginTop)
        : 0
      const threshold = (Number.isFinite(margin) ? margin : 0) + 1

      let current = 0
      sections.forEach((el, index) => {
        if (el.getBoundingClientRect().top <= threshold) current = index
      })

      const lastIndex = sections.length - 1
      const next =
        event.key === 'ArrowRight'
          ? Math.min(current + 1, lastIndex)
          : Math.max(current - 1, 0)

      if (next === current) return

      event.preventDefault()
      const targetSection = sections[next]
      targetSection.scrollIntoView({
        behavior: motionEnabled ? 'smooth' : 'auto',
        block: 'start',
      })

      if (statusRef?.current) {
        const heading = targetSection.querySelector('h1, h2')
        statusRef.current.textContent = heading
          ? `跳到 ${heading.textContent}`
          : '跳到下一個區塊'
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [motionEnabled, statusRef])
}