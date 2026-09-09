import { useRef } from 'react'
import { experienceActs } from './content.js'
import SiteNav from './components/SiteNav.jsx'
import Hero from './components/Hero.jsx'
import ScrollStory from './components/ScrollStory.jsx'
import FeatureGrid from './components/FeatureGrid.jsx'
import PromptLab from './components/PromptLab.jsx'
import Finale from './components/Finale.jsx'
import Particles from './components/Particles.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import { useMotionPreference } from './hooks/useMotionPreference.js'
import { useSectionNavigation } from './hooks/useSectionNavigation.js'

function App() {
  const { motionEnabled, toggleMotion } = useMotionPreference()
  const sectionStatusRef = useRef(null)
  useSectionNavigation({ motionEnabled, statusRef: sectionStatusRef })

  return (
    <div className="min-h-svh">
      <p ref={sectionStatusRef} role="status" className="sr-only" />
      <a href="#main" className="skip-link">
        跳至主要內容
      </a>
      <Particles motionEnabled={motionEnabled} />
      <CursorGlow motionEnabled={motionEnabled} />
      <SiteNav motionEnabled={motionEnabled} toggleMotion={toggleMotion} />
      <main id="main" tabIndex={-1} className="skip-target">
        <div data-section>
          <Hero motionEnabled={motionEnabled} />
        </div>
        <div data-section>
          <ScrollStory motionEnabled={motionEnabled} />
        </div>
        <div data-section>
          <FeatureGrid
            motionEnabled={motionEnabled}
            heading="個人經歷"
            headingId="experience-heading"
            items={experienceActs}
          />
        </div>
        <div data-section>
          <FeatureGrid motionEnabled={motionEnabled} />
        </div>
        <div data-section>
          <PromptLab />
        </div>
        <div data-section>
          <Finale motionEnabled={motionEnabled} toggleMotion={toggleMotion} />
        </div>
      </main>
    </div>
  )
}

export default App