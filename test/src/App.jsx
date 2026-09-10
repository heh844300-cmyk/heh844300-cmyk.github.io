import { useEffect, useState } from 'react'
import ConceptPreview from './components/ConceptPreview.jsx'
import DevelopmentRecord from './components/DevelopmentRecord.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'

function App() {
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (route === '#/projects/personal-site') return <ProjectDetail />
  if (route === '#/projects/personal-site/development-record') return <DevelopmentRecord />
  return <ConceptPreview />
}

export default App
