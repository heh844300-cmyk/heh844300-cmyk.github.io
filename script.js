// ==========================================================
// 作品資料 — 要新增作品,直接在陣列裡多加一個物件就好,
// 不需要動 HTML 或 CSS
// ==========================================================
const projects = [
  {
    title: "專案名稱一",
    desc: "一兩句話描述這個專案在做什麼、解決了什麼問題。",
    tags: ["JavaScript", "Node.js"],
    link: "https://github.com/yourname/project-one"
  },
  {
    title: "專案名稱二",
    desc: "一兩句話描述這個專案在做什麼、解決了什麼問題。",
    tags: ["Python", "Docker"],
    link: "https://github.com/yourname/project-two"
  }
];

// 把 projects 陣列渲染成卡片,插入到 #projectsContainer 裡
function renderProjects() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__tags">
          ${p.tags.map((tag) => `<span class="project-card__tag">${tag}</span>`).join("")}
        </div>
        <a class="project-card__link" href="${p.link}" target="_blank" rel="noopener">
          查看專案 →
        </a>
      </article>
    `
    )
    .join("");
}

// footer 年份自動更新,不用每年手動改
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

renderProjects();
setYear();