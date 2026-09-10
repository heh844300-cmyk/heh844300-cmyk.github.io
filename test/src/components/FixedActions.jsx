function FixedActions({ motionPreference, motionReduced, onMotionToggle }) {
  const motionLabels = {
    system: '使用系統設定',
    reduced: '關閉動效',
    full: '開啟動效',
  }

  return (
    <div className="concept-contacts" aria-label="固定操作">
      <button
        type="button"
        aria-pressed={motionReduced}
        aria-label={`動效設定：${motionLabels[motionPreference]}`}
        onClick={onMotionToggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 2a8 8 0 0 1 5.28 14L6 6.72A8 8 0 0 1 12 4Zm-5.28 1.99L18 17.28A8 8 0 0 1 6.72 5.99Z" />
        </svg>
        <span>MOTION / {motionPreference.toUpperCase()}</span>
      </button>
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

export default FixedActions
