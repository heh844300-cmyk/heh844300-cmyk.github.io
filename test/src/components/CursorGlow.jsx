import { useEffect, useRef } from 'react'

function CursorGlow({ motionEnabled }) {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!motionEnabled || !glow) return undefined

    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let initialised = false

    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!frame) frame = requestAnimationFrame(step)
    }
    const step = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      glow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`
      if (!initialised && Math.abs(currentX - targetX) < 1 && Math.abs(currentY - targetY) < 1) {
        initialised = true
        frame = requestAnimationFrame(step)
        return
      }
      frame = requestAnimationFrame(step)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    frame = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      glow.style.removeProperty('transform')
    }
  }, [motionEnabled])

  return <div ref={glowRef} aria-hidden="true" className="cursor-glow" />
}

export default CursorGlow