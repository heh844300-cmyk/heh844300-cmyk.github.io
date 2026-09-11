import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

HTMLCanvasElement.prototype.getContext = () => ({
  arc() {},
  beginPath() {},
  clearRect() {},
  fill() {},
  lineTo() {},
  moveTo() {},
  setTransform() {},
  stroke() {},
})

afterEach(() => {
  cleanup()
})
