import { useEffect, useRef, useState } from 'react'
import ConceptPreview from './components/ConceptPreview.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import DevelopmentRecord from './components/DevelopmentRecord.jsx'
import FixedActions from './components/FixedActions.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'

const motionPreferenceKey = 'motion-preference'
const projectRoutes = new Set([
  '#/projects/personal-site',
  '#/projects/personal-site/development-record',
])
const homeFragments = new Set([
  '#prototype-hero',
  '#adventurer-dossier',
  '#achievements',
  '#skills',
  '#projects',
])

function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  const [navigationVersion, setNavigationVersion] = useState(0)
  const [skipFocusRequest, setSkipFocusRequest] = useState(0)
  const [returnFocusRequest, setReturnFocusRequest] = useState(0)
  const isInitialRoute = useRef(true)
  const homeNavigationFocusTarget = useRef(null)
  const [motionPreference, setMotionPreference] = useState(
    () => localStorage.getItem(motionPreferenceKey) ?? 'system',
  )
  const [systemMotionReduced, setSystemMotionReduced] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )

  useEffect(() => {
    const onHashChange = () => {
      const activeElement = document.activeElement
      homeNavigationFocusTarget.current = activeElement instanceof HTMLAnchorElement
        && activeElement.closest('nav[aria-label="頁面導覽"]')
        && activeElement.hash === window.location.hash
        ? activeElement
        : null
      setRoute(window.location.hash)
      setNavigationVersion((version) => version + 1)
    }
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
    if (!projectRoutes.has(route)) return undefined
    const frame = requestAnimationFrame(() => document.querySelector('main h1')?.focus())
    return () => cancelAnimationFrame(frame)
  }, [route, navigationVersion])

  useEffect(() => {
    if (!homeFragments.has(route)) return undefined
    const frame = requestAnimationFrame(() => {
      document.getElementById(route.slice(1))?.scrollIntoView({ block: 'start' })
      homeNavigationFocusTarget.current?.focus()
      homeNavigationFocusTarget.current = null
    })
    return () => cancelAnimationFrame(frame)
  }, [route, navigationVersion])

  useEffect(() => {
    if (!skipFocusRequest || route !== '#/') return undefined
    const frame = requestAnimationFrame(() => document.querySelector('main h1')?.focus())
    return () => cancelAnimationFrame(frame)
  }, [route, navigationVersion, skipFocusRequest])

  useEffect(() => {
    if (!returnFocusRequest || route !== '#prototype-hero') return undefined
    const frame = requestAnimationFrame(() => {
      document.querySelector('main h1')?.focus()
      setReturnFocusRequest(0)
    })
    return () => cancelAnimationFrame(frame)
  }, [route, navigationVersion, returnFocusRequest])

  const requestHomeNavigation = (destination, requestFocus) => {
    window.location.hash = destination
    setRoute(destination)
    setNavigationVersion((version) => version + 1)
    requestFocus((request) => request + 1)
  }

  const handleSkipLink = (event) => {
    event.preventDefault()
    requestHomeNavigation('#/', setSkipFocusRequest)
  }

  const handleProjectReturn = (event) => {
    event.preventDefault()
    requestHomeNavigation('#prototype-hero', setReturnFocusRequest)
  }

  const page = route === '#/projects/personal-site'
    ? <ProjectDetail onHomeReturn={handleProjectReturn} />
    : route === '#/projects/personal-site/development-record'
      ? <DevelopmentRecord onHomeReturn={handleProjectReturn} />
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
        href="#/"
        onClick={handleSkipLink}
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
