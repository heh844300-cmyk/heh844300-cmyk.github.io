export const storyActs = [
  {
    id: 'about',
    kind: 'text',
    kicker: '關於我',
    title: '用好奇驅動的學習者',
    body: '我是專注於人工智慧與機器學習的大學部學生，相信好的問題，比好的答案更值得追。',
  },
  {
    id: 'education',
    kind: 'list',
    kicker: '學歷',
    columns: [
      { key: 'year', label: '年份' },
      { key: 'school', label: '學校' },
      { key: 'degree', label: '學位' },
    ],
    entries: [
      {
        year: '2026~',
        school: '國立澎湖科技大學',
        degree: '資訊工程學系 · 大一',
      },
    ],
  },
]

export const experienceActs = [
  {
    index: '01',
    title: '工科賽（電腦軟體設計）',
    tag: '2025',
    desc: '優勝',
  },
]

export const featureActs = [
  {
    index: '01',
    title: '我的個人網站',
    tag: '第一個專案',
    desc: '以 Vite、React 與 Tailwind 打造的自我介紹網站，也是我學習的起點。',
  },
]

export const actColors = ['#3e6e92', '#5f8fb2', '#93bfd8', '#b7c2cf']

export const promptExamples = [
  {
    id: 'need',
    label: '需求',
    title: '需求 Prompt',
    prompt:
      '目標：\n為個人網站新增「需求、動效、驗收」三個分頁，供學生實際切換與複製。\n\n使用者：\n給大學教授看的自我介紹網站。\n\n成功條件：\n不用滑鼠也能完整操作。',
  },
  {
    id: 'motion',
    label: '動效',
    title: '動效 Prompt',
    prompt:
      '目標：\n為網頁加上克制的捲動動效。\n\n限制：\n1. 動效預設開啟。\n2. 使用者可一鍵關閉全部動效。\n3. 連續捲動使用 requestAnimationFrame，不逐幀 setState。\n4. 效果移除時要移除監聽與取消 animation frame。',
  },
  {
    id: 'acceptance',
    label: '驗收',
    title: '驗收 Prompt',
    prompt:
      '驗收清單（全部勾選才算完成）：\n[ ] 無滑鼠可切換分頁（方向鍵、Home、End）\n[ ] 無滑鼠可複製 Prompt\n[ ] 無滑鼠可關閉動效\n[ ] 無滑鼠可回到頂部\n[ ] Clipboard 失敗時提供「請手動選取」提示',
  },
]