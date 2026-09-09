import { useEffect, useState } from 'react'

const reducedMotionQuery = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)')

export function useMotionPreference() {
  const [reduced, setReduced] = useState(() => {
    const query = reducedMotionQuery()
    if (!query?.matches) return false
    return true
  })

  useEffect(() => {
    const query = reducedMotionQuery()
    if (!query) return undefined
    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'off' : 'on'
  }, [reduced])

  const toggleMotion = () => setReduced((value) => !value)

  return { motionEnabled: !reduced, toggleMotion }
}