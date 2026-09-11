import { useEffect, useRef, useState } from 'react'
import ConceptPreview from './components/ConceptPreview.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import DevelopmentRecord from './components/DevelopmentRecord.jsx'
import FixedActions from './components/FixedActions.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'

const motionPreferenceKey = 'motion-preference'

function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  const isInitialRoute = useRef(true)
  const [motionPreference, setMotionPreference] = useState(
    () => localStorage.getItem(motionPreferenceKey) ?? 'system',
  )
  const [systemMotionReduced, setSystemMotionReduced] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mediaQuery) return undefined
    const update = (event) => setSystemMotionReduced(event.matches)
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isInitialRoute.current) {
      isInitialRoute.current = false
      return
    }
    document.querySelector('main h1')?.focus()
  }, [route])

  const page = route === '#/projects/personal-site'
    ? <ProjectDetail />
    : route === '#/projects/personal-site/development-record'
      ? <DevelopmentRecord />
      : <ConceptPreview />
  const motionReduced = motionPreference === 'reduced'
    || (motionPreference === 'system' && systemMotionReduced)
  const cycleMotionPreference = () => {
    const nextPreference = motionPreference === 'system'
      ? 'reduced'
      : motionPreference === 'reduced'
        ? 'full'
        : 'system'
    setMotionPreference(nextPreference)
    if (nextPreference === 'system') localStorage.removeItem(motionPreferenceKey)
    else localStorage.setItem(motionPreferenceKey, nextPreference)
  }

  return (
    <div data-motion-reduced={motionReduced}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.querySelector('main h1')?.focus()
        }}
      >
        跳至主要內容
      </a>
      {page}
      <FixedActions
        motionReduced={motionReduced}
        motionPreference={motionPreference}
        onMotionToggle={cycleMotionPreference}
      />
      <CursorTrail disabled={motionReduced} />
    </div>
  )
}

export default App
