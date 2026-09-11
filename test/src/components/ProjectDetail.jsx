const repositoryUrl = 'https://github.com/heh844300-cmyk/heh844300-cmyk.github.io'
const liveSiteUrl = 'https://heh844300-cmyk.github.io'

function ProjectDetail() {
  return (
    <main id="main-content" className="project-detail">
      <header className="project-detail__nav">
        <a href="#/" className="concept-wordmark">
          KJH <span>QUEST LOG</span>
        </a>
        <a href="#/" className="project-detail__back">BACK TO QUEST LOG</a>
      </header>

      <section className="project-detail__hero" aria-labelledby="project-detail-heading">
        <div className="project-detail__content">
          <p className="project-detail__eyebrow">QUEST 05 / FIRST QUEST</p>
          <h1 id="project-detail-heading" className="main-heading" tabIndex="-1">我的個人網站</h1>
          <p className="project-detail__lead">
            以 Vite、React 與 Tailwind 打造的自我介紹網站，也是我學習的起點。
          </p>
          <div className="project-detail__tags" aria-label="使用技術">
            <span>VITE</span>
            <span>REACT</span>
            <span>TAILWIND CSS</span>
          </div>
          <div className="project-detail__actions">
            <a className="project-detail__link" href={liveSiteUrl} target="_blank" rel="noreferrer">
              <span>VISIT LIVE SITE</span>
              <small>開啟正式網站 -&gt;</small>
            </a>
            <a className="project-detail__link project-detail__link--secondary" href={repositoryUrl} target="_blank" rel="noreferrer">
              <span>GITHUB REPOSITORY</span>
              <small>查看原始碼 -&gt;</small>
            </a>
          </div>
        </div>
        <div className="project-detail__previews" aria-label="個人網站預覽">
          <div className="project-detail__preview">
            <img src="/personal-site-preview.png" alt="個人網站首頁預覽" />
            <p>WEBSITE PREVIEW</p>
          </div>
        </div>
      </section>
      <section className="development-record-card" aria-labelledby="development-record-card-heading">
        <div className="development-record-card__specimen" aria-hidden="true">
          <span className="development-record-card__stem" />
          <span className="development-record-card__leaf development-record-card__leaf--one" />
          <span className="development-record-card__leaf development-record-card__leaf--two" />
          <span className="development-record-card__core" />
        </div>
        <div>
          <p>SPECIMEN 01 / GPT-5.6</p>
          <h2 id="development-record-card-heading">AI 輔助開發紀錄</h2>
          <span>以機械植物時間軸，回看從構想到上線的協作與驗證。</span>
        </div>
        <a href="#/projects/personal-site/development-record">展開成長紀錄 -&gt;</a>
      </section>
    </main>
  )
}

export default ProjectDetail
