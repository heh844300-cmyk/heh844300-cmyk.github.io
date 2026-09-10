import { useEffect, useRef, useState } from 'react'
import { experienceActs, skillActs } from '../content.js'

const projects = [
  { id: 'site', title: '個人網站', subtitle: 'FIRST QUEST', href: '#/projects/personal-site' },
  { id: 'soon-one', title: 'COMING SOON', subtitle: 'LOCKED' },
  { id: 'soon-two', title: 'COMING SOON', subtitle: 'LOCKED' },
  { id: 'soon-three', title: 'COMING SOON', subtitle: 'LOCKED' },
]

function ContactLinks() {
  return (
    <div className="concept-contacts" aria-label="聯絡連結">
      <a href="https://github.com/heh844300-cmyk" target="_blank" rel="noreferrer" aria-label="GitHub">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.45c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
        <span>GitHub</span>
      </a>
      <a href="mailto:heh844300@gmail.com" aria-label="Gmail">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.5 5h17a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.5 3.5v8h16v-8l-8 5-8-5Zm7 4.2 6.7-4.2H4.3l6.7 4.2Z" /></svg>
        <span>Gmail</span>
      </a>
    </div>
  )
}

function ProjectWall() {
  return (
    <section id="projects" data-nav-section className="concept-projects" aria-labelledby="prototype-project-heading">
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
            <button
              key={project.id}
              type="button"
              className="project-slice"
              aria-label={`${project.title}，${project.subtitle}`}
            >
              <span className="project-slice__dial" aria-hidden="true" />
              <span className="project-slice__content">
                <small>{project.subtitle}</small>
                <strong>{project.title}</strong>
              </span>
            </button>
          )
        ))}
      </div>
    </section>
  )
}

function QuestAchievements() {
  return (
    <section id="achievements" data-nav-section className="quest-achievements" aria-labelledby="achievements-heading">
      <div className="quest-achievements__inner">
        <div className="concept-section-label">
          <span>03</span>
          <h2 id="achievements-heading">QUEST ACHIEVEMENTS</h2>
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
    <section id="skills" data-nav-section className="skill-loadout" aria-labelledby="skills-heading">
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

function ScrollChapter({ children, profile }) {
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
  }, [profile])

  return (
    <div
      ref={ref}
      data-reveal-profile={profile}
      className={`scroll-chapter is-${phase}`}
    >
      <div className="scroll-chapter__pin">
        {children}
      </div>
    </div>
  )
}

function ConceptPreview() {
  const [activeSection, setActiveSection] = useState('prototype-hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [revealProfile, setRevealProfile] = useState('standard')

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

  const navigation = [
    { id: 'prototype-hero', label: 'HOME', detail: '首頁' },
    { id: 'adventurer-dossier', label: 'DOSSIER', detail: '冒險者檔案' },
    { id: 'achievements', label: 'QUESTS', detail: '任務成就' },
    { id: 'skills', label: 'SKILLS', detail: '技能' },
    { id: 'projects', label: 'PROJECTS', detail: '專案' },
  ]

  return (
    <main
      className="concept-preview concept-preview--gateway concept-preview--gear-candy"
      data-reveal-profile={revealProfile}
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
        <button
          type="button"
          className="concept-motion-profile"
          aria-pressed={revealProfile === 'lite'}
          onClick={() => setRevealProfile((profile) => (profile === 'standard' ? 'lite' : 'standard'))}
        >
          {revealProfile === 'standard' ? 'MOTION / STANDARD' : 'MOTION / LITE'}
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
            >
              <span>{item.label}</span>
              {item.detail}
            </a>
          ))}
        </nav>
      </header>
      <ContactLinks />

      <section id="prototype-hero" data-nav-section className="concept-hero" aria-labelledby="prototype-title">
        <div className="concept-steam concept-steam--one" aria-hidden="true" />
        <div className="concept-steam concept-steam--two" aria-hidden="true" />
        <div className="concept-gear concept-gear--large" aria-hidden="true" />
        <div className="concept-gear concept-gear--small" aria-hidden="true" />
        <div className="concept-rivet-rail" aria-hidden="true" />

        <div className="concept-hero-copy">
          <p className="concept-eyebrow">ADVENTURER PROFILE / LV. 01</p>
          <h1 id="prototype-title">柯均翰 <span>HEH</span></h1>
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

      <ScrollChapter profile={revealProfile}>
        <section id="adventurer-dossier" data-nav-section className="adventurer-dossier" aria-labelledby="dossier-heading">
          <div className="dossier-frame">
            <div className="concept-section-label">
              <span>02</span>
              <h2 id="dossier-heading">ADVENTURER DOSSIER</h2>
            </div>
            <p className="dossier-classification">CORE BELIEF / ACTIVE</p>
            <blockquote className="dossier-motto">Cogito, ergo sum</blockquote>
            <p className="dossier-translation">我思故我在</p>
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

      <ScrollChapter profile={revealProfile}><QuestAchievements /></ScrollChapter>
      <ScrollChapter profile={revealProfile}><SkillLoadout /></ScrollChapter>
      <ScrollChapter profile={revealProfile}><ProjectWall /></ScrollChapter>
      <footer className="concept-footer">
        <span>STYLE PROTOTYPE / NO CONTENT CHANGED</span>
      </footer>
    </main>
  )
}

export default ConceptPreview
