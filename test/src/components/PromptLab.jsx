import { useRef, useState } from 'react'
import { promptExamples } from '../content.js'

function PromptLab() {
  const [activeId, setActiveId] = useState(promptExamples[0].id)
  const [status, setStatus] = useState('')
  const tabRefs = useRef([])
  const promptRefs = useRef({})

  const activeIndex = promptExamples.findIndex((tab) => tab.id === activeId)
  const count = promptExamples.length

  const activate = (index) => {
    const next = promptExamples[index]
    setActiveId(next.id)
    setStatus('')
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event) => {
    let next = activeIndex
    if (event.key === 'ArrowRight') next = (activeIndex + 1) % count
    else if (event.key === 'ArrowLeft') next = (activeIndex - 1 + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    else return

    event.preventDefault()
    activate(next)
  }

  const selectPrompt = (node) => {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const copyPrompt = async (prompt, tabId) => {
    try {
      if (
        typeof navigator.clipboard === 'undefined' ||
        typeof navigator.clipboard.writeText !== 'function'
      ) {
        throw new Error('Clipboard API unavailable')
      }
      await navigator.clipboard.writeText(prompt)
      setStatus('已複製到剪貼簿')
    } catch {
      setStatus('複製失敗，請手動選取')
      const node = promptRefs.current[tabId]
      if (node) {
        node.focus()
        selectPrompt(node)
      }
    }
  }

  return (
    <section aria-labelledby="prompt-heading" className="prompt-lab">
      <h2 id="prompt-heading" className="prompt-heading">
        Prompt 練習
      </h2>

      <div role="tablist" aria-label="Prompt 範例分頁" className="prompt-tabs">
        {promptExamples.map((tab, index) => (
          <button
            key={tab.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`prompt-tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`prompt-panel-${tab.id}`}
            tabIndex={tab.id === activeId ? 0 : -1}
            className="prompt-tab"
            onClick={() => {
              setActiveId(tab.id)
              setStatus('')
            }}
            onKeyDown={onKeyDown}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {promptExamples.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`prompt-panel-${tab.id}`}
          aria-labelledby={`prompt-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="prompt-panel"
        >
          <h3 className="prompt-panel-title">{tab.title}</h3>
          <pre
            ref={(node) => {
              promptRefs.current[tab.id] = node
            }}
            tabIndex={-1}
          >
            {tab.prompt}
          </pre>
          <button
            type="button"
            className="prompt-copy"
            onClick={() => copyPrompt(tab.prompt, tab.id)}
          >
            複製 Prompt
          </button>
        </div>
      ))}

      <p role="status" className="prompt-status">
        {status}
      </p>
    </section>
  )
}

export default PromptLab