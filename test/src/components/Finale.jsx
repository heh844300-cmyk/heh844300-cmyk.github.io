function Finale({ motionEnabled, toggleMotion }) {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'auto' })
    document.getElementById('main')?.focus()
  }

  return (
    <section aria-labelledby="finale-heading" className="finale">
      <h2 id="finale-heading" className="finale-heading">
        把想法變成作品
      </h2>
      <p>這座網站本身，就是第一個作品。鍵盤也能完成全部操作。</p>
      <div className="finale-actions">
        <button type="button" onClick={backToTop}>
          回到頂部
        </button>
        <button type="button" onClick={toggleMotion} aria-pressed={!motionEnabled}>
          {motionEnabled ? '關閉動效' : '開啟動效'}
        </button>
      </div>
    </section>
  )
}

export default Finale