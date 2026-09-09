import { useEffect, useRef } from 'react'

function Particles({ motionEnabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!motionEnabled) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    let frame = 0
    let stars = []
    let width = 0
    let height = 0

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(DPR, 0, 0, DPR, 0, 0)

      const count = Math.min(90, Math.floor((width * height) / 18000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        speed: 2 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: 0.18 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const step = (time) => {
      context.clearRect(0, 0, width, height)
      const t = time / 1000
      for (const star of stars) {
        star.y -= star.speed * 0.05
        star.x += star.drift
        const pulse = 0.7 + 0.3 * Math.sin(t * 1.2 + star.phase)
        const alpha = star.alpha * pulse
        context.beginPath()
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        context.fillStyle = `rgba(147, 191, 216, ${alpha})`
        context.fill()
        if (star.y < -4) {
          star.y = height + 4
          star.x = Math.random() * width
          star.phase = Math.random() * Math.PI * 2
        }
        if (star.x < -4) star.x = width + 4
        if (star.x > width + 4) star.x = -4
      }
      frame = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      context.clearRect(0, 0, width, height)
    }
  }, [motionEnabled])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="particles-canvas"
    />
  )
}

export default Particles