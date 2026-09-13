import { useEffect, useRef, useState } from 'react'
import { experienceActs, skillActs } from '../content.js'

const projects = [
  { id: 'site', title: '個人網站', subtitle: 'FIRST QUEST', href: '#/projects/personal-site' },
  { id: 'soon-one', title: 'COMING SOON', subtitle: 'LOCKED' },
  { id: 'soon-two', title: 'COMING SOON', subtitle: 'LOCKED' },
  { id: 'soon-three', title: 'COMING SOON', subtitle: 'LOCKED' },
]

function ProjectWall() {
  return (
    <section data-nav-section className="concept-projects" aria-labelledby="prototype-project-heading">
        <div className="concept-section-label">
          <span>05</span>
          <h2 id="prototype-project-heading">PROJECT SELECT</h2>
      </div>
      <p>移至卡片以啟動專案訊號</p>
      <div className="project-slices">
        {projects.map((project) => (
          project.href ? (
            <a
              key={project.id}
              href={project.href}
              className="project-slice is-available"
              aria-label={`${project.title}，${project.subtitle}`}
            >
              <span className="project-slice__dial" aria-hidden="true" />
              <span className="project-slice__content">
                <small>{project.subtitle}</small>
                <strong>{project.title}</strong>
              </span>
            </a>
          ) : (
            <div
              key={project.id}
              className="project-slice"
            >
              <span className="project-slice__dial" aria-hidden="true" />
              <span className="project-slice__content">
                <small>{project.subtitle}</small>
                <strong>{project.title}</strong>
              </span>
            </div>
          )
        ))}
      </div>
    </section>
  )
}

function QuestAchievements() {
  return (
    <section data-nav-section className="quest-achievements" aria-labelledby="achievements-heading">
      <div className="quest-achievements__inner">
        <div className="concept-section-label">
          <span>03</span>
              <h2 id="achievements-heading" tabIndex="-1">QUEST ACHIEVEMENTS</h2>
        </div>
        <p className="quest-achievements__hint">COMPLETED QUEST LOG</p>
        <div className="quest-achievements__list">
          {experienceActs.map((achievement) => (
            <article key={achievement.index} className="quest-card">
              <div className="quest-card__stamp">CLEAR</div>
              <p className="quest-card__number">QUEST-{achievement.tag}-{achievement.index}</p>
              <h3>{achievement.title}</h3>
              <p className="quest-card__reward">RESULT / {achievement.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillLoadout() {
  return (
    <section data-nav-section className="skill-loadout" aria-labelledby="skills-heading">
      <div className="concept-section-label">
        <span>04</span>
        <h2 id="skills-heading">SKILL LOADOUT</h2>
      </div>
      <p className="skill-loadout__hint">CURRENTLY EXPLORING / NO MASTERED SKILLS YET</p>
      <div className="skill-grid">
        {skillActs.map((skill) => (
          <article key={skill.name} className={`skill-chip skill-chip--${skill.group.toLowerCase()}`}>
            <span className="skill-chip__group">{skill.group}</span>
            <h3>{skill.name}</h3>
            <p>{skill.role}</p>
            <span className="skill-chip__status">EXPLORING</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function ScrollChapter({ id, children }) {
  const ref = useRef(null)
  const [phase, setPhase] = useState('before')

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    let frame = 0
    let previousPhase = ''
    const update = () => {
      const rect = node.getBoundingClientRect()
      const midpoint = window.innerHeight / 2
      const nextPhase =
        rect.top > midpoint ? 'before' : rect.bottom < midpoint ? 'after' : 'active'

      if (nextPhase !== previousPhase) {
        previousPhase = nextPhase
        setPhase(nextPhase)
      }
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
  }, [])

  return (
    <div id={id} ref={ref} className={`scroll-chapter is-${phase}`}>
      <div className="scroll-chapter__pin">
        {children}
      </div>
    </div>
  )
}

function ConceptPreview() {
  const [activeSection, setActiveSection] = useState('prototype-hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mottoCopied, setMottoCopied] = useState(false)
  const [mottoFading, setMottoFading] = useState(false)
  const mottoFadeTimer = useRef(0)
  const mottoHideTimer = useRef(0)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-nav-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55%', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => {
    clearTimeout(mottoFadeTimer.current)
    clearTimeout(mottoHideTimer.current)
  }, [])

  const navigation = [
    { id: 'prototype-hero', label: 'HOME', detail: '首頁' },
    { id: 'adventurer-dossier', label: 'DOSSIER', detail: '冒險者檔案' },
    { id: 'achievements', label: 'QUESTS', detail: '任務成就' },
    { id: 'skills', label: 'SKILLS', detail: '技能' },
    { id: 'projects', label: 'PROJECTS', detail: '專案' },
  ]

  return (
    <main
      id="main-content"
      className="concept-preview concept-preview--gateway concept-preview--gear-candy"
    >
      <header className="concept-nav">
        <a className="concept-wordmark" href="#prototype-hero">
          KJH <span>QUEST LOG</span>
        </a>
              <button
          type="button"
          className="concept-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="concept-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          MENU
        </button>
        <nav
          id="concept-navigation"
          className={`concept-navigation ${menuOpen ? 'is-open' : ''}`}
          aria-label="頁面導覽"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : ''}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
              onKeyDown={(event) => {
                const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
                if (!direction) return
                const links = Array.from(event.currentTarget.parentElement.querySelectorAll('a'))
                const nextLink = links[links.indexOf(event.currentTarget) + direction]
                if (!nextLink) return
                event.preventDefault()
                nextLink.focus()
              }}
            >
              <span>{item.label}</span>
              {item.detail}
            </a>
          ))}
        </nav>
      </header>

      <section id="prototype-hero" data-nav-section className="concept-hero" aria-labelledby="prototype-title">
        <div className="concept-steam concept-steam--one" aria-hidden="true" />
        <div className="concept-steam concept-steam--two" aria-hidden="true" />
        <div className="concept-gear concept-gear--large" aria-hidden="true" />
        <div className="concept-gear concept-gear--small" aria-hidden="true" />
        <div className="concept-rivet-rail" aria-hidden="true" />

        <div className="concept-hero-copy">
          <p className="concept-eyebrow">ADVENTURER PROFILE / LV. 01</p>
          <h1 id="prototype-title" className="main-heading" tabIndex="-1">柯均翰 <span>HEH</span></h1>
          <p className="concept-role">未知領域的實習機械術士</p>
          <p className="concept-intro">
            主修資訊工程，正在以人工智慧與機器學習，製作下一段可被遊玩的未來。
          </p>
        </div>

        <div className="concept-portrait-wrap">
          <span className="portrait-ring portrait-ring--outer" aria-hidden="true" />
          <span className="portrait-ring portrait-ring--inner" aria-hidden="true" />
          <img src="/test.webp" alt="柯均翰的角色肖像" className="concept-portrait" />
          <span className="portrait-caption">PLAYER ONE</span>
        </div>

        <aside className="concept-status" aria-label="角色狀態">
          <p>CLASS <strong>CODE ALCHEMIST</strong></p>
          <p>ORIGIN <strong>PENGHU, TW</strong></p>
          <p>QUEST <strong>LEARN / BUILD / EXPLORE</strong></p>
        </aside>
      </section>

      <ScrollChapter id="adventurer-dossier">
        <section data-nav-section className="adventurer-dossier" aria-labelledby="dossier-heading">
          <div className="dossier-frame">
            <div className="concept-section-label">
              <span>02</span>
              <h2 id="dossier-heading">ADVENTURER DOSSIER</h2>
            </div>
            <p className="dossier-classification">CORE BELIEF / ACTIVE</p>
            <blockquote className="dossier-motto">Cogito, ergo sum</blockquote>
            <p className="dossier-translation">我思故我在</p>
            <button
              type="button"
              className="dossier-copy"
              onClick={async () => {
                await navigator.clipboard.writeText('Cogito, ergo sum')
                clearTimeout(mottoFadeTimer.current)
                clearTimeout(mottoHideTimer.current)
                setMottoCopied(true)
                setMottoFading(false)
                mottoFadeTimer.current = window.setTimeout(() => setMottoFading(true), 3000)
                mottoHideTimer.current = window.setTimeout(() => {
                  setMottoCopied(false)
                  setMottoFading(false)
                }, 5000)
              }}
              >
                複製標語
              </button>
              <a
                className="dossier-next"
                href="#achievements"
                onClick={(event) => {
                  event.preventDefault()
                  const heading = document.querySelector('#achievements-heading')
                  heading?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  heading?.focus()
                }}
              >
                前往任務成就
              </a>
              {mottoCopied && <span className={`dossier-copy-status ${mottoFading ? 'is-fading' : ''}`} role="status">標語已複製</span>}
            <p className="dossier-intro">
              我相信思考是探索的起點。在未知中持續提問、學習，並把每一次理解化為下一次前進的方向。
            </p>
            <div className="dossier-traits" aria-label="個人特質">
              <span>好奇</span>
              <span>學習</span>
              <span>探索</span>
            </div>
          </div>
        </section>
      </ScrollChapter>

      <ScrollChapter id="achievements"><QuestAchievements /></ScrollChapter>
      <ScrollChapter id="skills"><SkillLoadout /></ScrollChapter>
      <ScrollChapter id="projects"><ProjectWall /></ScrollChapter>
      <footer className="concept-footer">
        <span>STYLE PROTOTYPE / NO CONTENT CHANGED</span>
      </footer>
    </main>
  )
}

export default ConceptPreview
