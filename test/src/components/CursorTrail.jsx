import { useEffect, useRef } from 'react'
import { createParticles, shouldEmitParticles } from '../lib/cursorTrail.js'

const TRAIL_DURATION = 400

function CursorTrail({ disabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    if (disabled) {
      canvas.dataset.trailActive = 'false'
      canvas.dataset.particleCount = '0'
      return undefined
    }

    const context = canvas.getContext('2d')
    const state = { frame: null, lastEmission: null, lastMoveAt: null, particles: [], points: [] }
    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }
    const drawTrail = (now) => {
      const points = state.points.filter((point) => now - point.createdAt < TRAIL_DURATION)
      if (points.length < 2) return

      const drawPath = () => {
        context.beginPath()
        context.moveTo(points[0].x, points[0].y)
        points.slice(1).forEach((point) => context.lineTo(point.x, point.y))
      }

      drawPath()
      context.globalAlpha = 0.3
      context.strokeStyle = '#ff9acb'
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.lineWidth = 8
      context.shadowBlur = 14
      context.shadowColor = '#ff9acb'
      context.stroke()

      drawPath()
      context.globalAlpha = 0.95
      context.strokeStyle = '#a84ce0'
      context.lineWidth = 2
      context.shadowBlur = 4
      context.shadowColor = '#fff0f8'
      context.stroke()
    }
    const drawParticles = (now) => {
      state.particles = state.particles.filter((particle) => now - particle.createdAt < particle.lifetime)
      state.particles.forEach((particle) => {
        const age = now - particle.createdAt
        context.beginPath()
        context.globalAlpha = 1 - age / particle.lifetime
        context.fillStyle = particle.color
        context.shadowBlur = 6
        context.shadowColor = particle.color
        context.arc(particle.x, particle.y - age * 0.012, 2.25, 0, Math.PI * 2)
        context.fill()
      })
    }
    const render = (now) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      state.points = state.points.filter((point) => now - point.createdAt < TRAIL_DURATION)
      drawTrail(now)
      drawParticles(now)
      const trailActive = state.lastMoveAt !== null && now - state.lastMoveAt < TRAIL_DURATION
      canvas.dataset.trailActive = String(trailActive)
      canvas.dataset.particleCount = String(state.particles.length)
      context.globalAlpha = 1
      context.shadowBlur = 0
      state.frame = trailActive || state.particles.length ? window.requestAnimationFrame(render) : null
    }
    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return

      const now = performance.now()
      const point = { x: event.clientX, y: event.clientY }
      state.points.push({ ...point, createdAt: now })
      state.lastMoveAt = now
      if (shouldEmitParticles(state.lastEmission, point, now)) {
        state.particles.push(...createParticles(point, now))
        state.lastEmission = { point, emittedAt: now }
      }
      if (state.frame === null) state.frame = window.requestAnimationFrame(render)
    }

    resize()
    canvas.dataset.trailActive = 'false'
    canvas.dataset.particleCount = '0'
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (state.frame !== null) window.cancelAnimationFrame(state.frame)
    }
  }, [disabled])

  return <canvas ref={canvasRef} className="cursor-trail" data-cursor-trail-canvas aria-hidden="true" />
}

export default CursorTrail
