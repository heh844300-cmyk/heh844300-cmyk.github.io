import { useEffect, useRef, useState } from 'react'

function CursorTrail({ disabled }) {
  const [particles, setParticles] = useState([])
  const particleId = useRef(0)
  const removalTimers = useRef(new Set())

  useEffect(() => {
    if (disabled) {
      setParticles([])
      return undefined
    }

    const onMouseMove = (event) => {
      const newParticles = Array.from({ length: 12 }, () => {
        const id = particleId.current
        particleId.current += 1
        const angle = Math.random() * Math.PI * 2
        const distance = Math.sqrt(Math.random()) * 12
        return {
          id,
          x: event.clientX + Math.cos(angle) * distance,
          y: event.clientY + Math.sin(angle) * distance,
        }
      })
      const particleIds = new Set(newParticles.map((particle) => particle.id))
      setParticles((currentParticles) => [...currentParticles, ...newParticles])
      const timer = window.setTimeout(() => {
        removalTimers.current.delete(timer)
        setParticles((currentParticles) => currentParticles.filter((particle) => !particleIds.has(particle.id)))
      }, 1500)
      removalTimers.current.add(timer)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      removalTimers.current.forEach((timer) => clearTimeout(timer))
      removalTimers.current.clear()
    }
  }, [disabled])

  return (
    <div className="cursor-trail" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          data-cursor-particle
          className={`cursor-trail__particle cursor-trail__particle--${particle.id % 2 ? 'pink' : 'purple'}`}
          style={{ left: particle.x, top: particle.y }}
        />
      ))}
    </div>
  )
}

export default CursorTrail
