import test from 'node:test'
import assert from 'node:assert/strict'
import { createParticles, shouldEmitParticles } from './cursorTrail.js'

test('粒子每次發射四顆，且散布在游標 12px 半徑內', () => {
  const particles = createParticles({ x: 120, y: 180 }, 1000, () => 0.5)

  assert.equal(particles.length, 4)
  particles.forEach((particle) => {
    assert.ok(Math.hypot(particle.x - 120, particle.y - 180) <= 12)
    assert.equal(particle.createdAt, 1000)
    assert.equal(particle.lifetime, 1500)
  })
})

test('粒子需相隔 50ms 且游標至少移動 8px 才能再次發射', () => {
  const previous = { point: { x: 100, y: 100 }, emittedAt: 1000 }

  assert.equal(shouldEmitParticles(previous, { x: 120, y: 100 }, 1049), false)
  assert.equal(shouldEmitParticles(previous, { x: 107, y: 100 }, 1050), false)
  assert.equal(shouldEmitParticles(previous, { x: 108, y: 100 }, 1050), true)
})
