import { useEffect, useState } from 'react'

const recordSteps = [
  {
    title: '確立目標',
    summary: '釐清教授與實習招募者的閱讀需求，決定以個人作品集作為任務起點。',
    aiRole: 'GPT-5.6 協助拆解受眾、資訊架構與內容優先順序。',
  },
  {
    title: '建構世界觀',
    summary: '保留冒險者與機械術士設定，讓遊戲感成為網站的主要記憶點。',
    aiRole: 'GPT-5.6 協助收斂紫粉蒸汽龐克的視覺方向。',
  },
  {
    title: '以 AI 輔助實作介面',
    summary: '以 React、Vite 與 Tailwind 建立導覽、專案頁與可回應式介面。',
    aiRole: 'GPT-5.6 協助 React/CSS 實作與介面調整；程式整合由我完成。',
  },
  {
    title: '驗證與修訂',
    summary: '檢查 AI 建議是否符合需求，修訂不符合網站目標或操作情境的部分。',
    aiRole: 'GPT-5.6 協助除錯與提出測試方式；最終取捨由我負責。',
  },
  {
    title: '驗收與上線',
    summary: '完成建置與測試，並檢查桌面、手機、鍵盤操作與降低動效情境。',
    aiRole: 'GPT-5.6 協助驗收檢查；我負責實際測試與發布。',
  },
]

function DevelopmentRecord({ onHomeReturn }) {
  const [activeStep, setActiveStep] = useState(null)

  useEffect(() => {
    let frame = 0
    const updateActiveStep = () => {
      const nodes = Array.from(document.querySelectorAll('[data-record-step]'))
      const marker = window.innerHeight * 0.48
      const nearest = nodes.reduce((best, node, index) => {
        const distance = Math.abs(node.getBoundingClientRect().top - marker)
        return distance < best.distance ? { index, distance } : best
      }, { index: 0, distance: Number.POSITIVE_INFINITY })
      setActiveStep(nearest.index)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveStep)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <main id="main-content" className="development-record">
      <header className="development-record__nav">
        <a href="#/projects/personal-site" className="project-detail__back">&lt;- 回到專案案例</a>
        <a href="#prototype-hero" className="concept-wordmark" onClick={onHomeReturn}>KJH <span>QUEST LOG</span></a>
      </header>

      <section className="development-record__intro" aria-labelledby="development-record-heading">
        <p>DEVELOPMENT RECORD / SPECIMEN 01</p>
        <h1 id="development-record-heading" className="main-heading" tabIndex="-1">讓一個網站<br />慢慢長出來</h1>
        <p>
          這不是 AI 應用，而是我使用 GPT-5.6 輔助規劃、實作、除錯與驗收個人網站的開發紀錄。
          每一項建議都由我判斷、整合與驗證。
        </p>
        <span>向下捲動，查看任務如何展開。</span>
      </section>

      <section className="growth-timeline" aria-label="個人網站的開發時間軸">
        <div className="growth-timeline__trunk" aria-hidden="true" />
        {recordSteps.map((step, index) => {
          const isActive = activeStep === index
          return (
            <article
              key={step.title}
              data-record-step
              className={`growth-timeline__step ${isActive ? 'is-active' : ''}`}
            >
              <div className="growth-timeline__branch" aria-hidden="true" />
              <button
                type="button"
                className="growth-timeline__node"
                aria-expanded={isActive}
                aria-controls={`record-step-${index}`}
                onClick={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
                onKeyDown={(event) => {
                  const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
                  if (!direction) return
                  const nodes = Array.from(
                    event.currentTarget.closest('.growth-timeline').querySelectorAll('button.growth-timeline__node'),
                  )
                  const nextNode = nodes[index + direction]
                  if (!nextNode) return
                  event.preventDefault()
                  nextNode.focus()
                }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
              <div id={`record-step-${index}`} className="growth-timeline__tooltip">
                <p>任務 {String(index + 1).padStart(2, '0')}</p>
                <h2>{step.title}</h2>
                <span>{step.summary}</span>
                <strong>GPT-5.6 / {step.aiRole}</strong>
              </div>
            </article>
          )
        })}
        <article className="growth-timeline__step growth-timeline__step--soon">
          <div className="growth-timeline__branch" aria-hidden="true" />
          <span className="growth-timeline__node" aria-hidden="true">?</span>
          <div className="growth-timeline__tooltip">
            <p>NEXT QUEST</p>
            <h2>COMING SOON</h2>
            <span>下一段學習與實作仍在生長中。</span>
          </div>
        </article>
      </section>

      <section className="development-record__principles" aria-labelledby="principles-heading">
        <p>AI COLLABORATION / PRINCIPLES</p>
        <h2 id="principles-heading">工具提供方向，責任留在手上。</h2>
        <div>
          <article><strong>01</strong><span>GPT-5.6 協助需求、視覺、實作與驗收。</span></article>
          <article><strong>02</strong><span>我負責選擇、整合、測試與每一項公開主張。</span></article>
          <article><strong>03</strong><span>以建置、測試、裝置與鍵盤檢查驗收網站。</span></article>
        </div>
        <a href="https://heh844300-cmyk.github.io" target="_blank" rel="noreferrer">查看正式網站 -&gt;</a>
      </section>
    </main>
  )
}

export default DevelopmentRecord
