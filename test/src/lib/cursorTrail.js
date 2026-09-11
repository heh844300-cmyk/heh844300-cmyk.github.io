const PARTICLE_COUNT = 4
const PARTICLE_RADIUS = 12
const PARTICLE_LIFETIME = 1500
const EMISSION_INTERVAL = 50
const MINIMUM_DISTANCE = 8

export function shouldEmitParticles(previous, point, now) {
  if (!previous) return true

  const distance = Math.hypot(point.x - previous.point.x, point.y - previous.point.y)
  return now - previous.emittedAt >= EMISSION_INTERVAL && distance >= MINIMUM_DISTANCE
}

export function createParticles(point, createdAt, random = Math.random) {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = random() * Math.PI * 2
    const distance = Math.sqrt(random()) * PARTICLE_RADIUS
    return {
      x: point.x + Math.cos(angle) * distance,
      y: point.y + Math.sin(angle) * distance,
      color: index % 2 ? '#ff9acb' : '#a84ce0',
      createdAt,
      lifetime: PARTICLE_LIFETIME,
    }
  })
}
