import { useEffect, useRef, useState } from 'react'
import { clamp } from '../lib/motion.js'
import { actColors, storyActs } from '../content.js'

const ACT_COUNT = storyActs.length

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function mixColor(hexA, hexB, t) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  const channel = a
    .map((value, i) => Math.round(value + (b[i] - value) * t))
    .join(' ')
  return `rgb(${channel})`
}

function isPlaceholder(entry) {
  return Object.values(entry).some((value) => String(value).startsWith('['))
}

function ScrollStory({ motionEnabled }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!motionEnabled) return undefined

    let frame = 0
    const update = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const progress = clamp(-rect.top / travel)
      const index = clamp(Math.floor(progress * ACT_COUNT), 0, ACT_COUNT - 1)

      const segment = clamp(progress * (ACT_COUNT - 1))
      const base = Math.min(Math.floor(segment), ACT_COUNT - 2)
      const coreColor = mixColor(actColors[base], actColors[base + 1], segment - base)

      track.style.setProperty('--story-progress', String(progress))
      track.style.setProperty('--core-color', coreColor)
      setActiveIndex((previous) => (previous === index ? previous : index))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [motionEnabled])

  return (
    <section
      ref={trackRef}
      aria-labelledby="story-heading"
      className={motionEnabled ? 'story-track' : 'story-track story-track--static'}
    >
      <div className="story-pane">
        <div className="story-orb" aria-hidden="true" />
        <div className="story-progress-line" aria-hidden="true" />

        <h2 id="story-heading" className="story-heading">
          我的故事
        </h2>

        <div className="story-acts">
          {storyActs.map((act, index) => (
            <article
              key={act.id}
              className={`story-act ${index === activeIndex ? 'is-active' : ''}`}
            >
              <p className="story-act-kicker">{act.kicker}</p>
              {act.kind === 'list' ? (
                <div className="story-list" role="table">
                  <div className="story-list-row story-list-head" role="row">
                    {act.columns.map((column) => (
                      <span key={column.key} role="columnheader">
                        {column.label}
                      </span>
                    ))}
                  </div>
                  {act.entries.map((entry, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`story-list-row ${isPlaceholder(entry) ? 'is-placeholder' : ''}`}
                      role="row"
                    >
                      {act.columns.map((column) => (
                        <span key={column.key} role="cell">
                          {entry[column.key]}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h3 className="story-act-title">{act.title}</h3>
                  <p className="story-act-body">{act.body}</p>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ScrollStory