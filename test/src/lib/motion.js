export const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

export function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMin === inMax) return outMin
  const progress = (value - inMin) / (inMax - inMin)
  return outMin + (outMax - outMin) * clamp(progress)
}

export function getScrollProgress(rectTop, rectHeight, viewportHeight) {
  return clamp((viewportHeight - rectTop) / (rectHeight + viewportHeight))
}