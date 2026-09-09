# AGENTS.md

## ⚠️ 重要規則：修改程式碼前必須先取得同意

在使用者明確表示「可以修改程式碼」之前，**不得直接修改、新增或刪除任何程式碼檔案**。

- 若任務需要修改程式碼，應先說明「打算修改哪些檔案、做什麼樣的變更、為什麼要這樣改」，並等待使用者明確同意後才能動手。
- 僅在使用者要求「說明、分析、建議、規劃」等情況下，可以直接以文字回覆，不需要先修改檔案。
- 讀取檔案內容、查看程式碼、執行 lint/build 等唯讀操作不受此限制。
- 若不確定使用者是否已經同意修改，一律視為尚未同意，先詢問。
## Project layout

All source code lives in `test/`. There is no monorepo or workspace — the repo root only contains this subdirectory.

## Commands (run from `test/`)

```sh
npm run dev       # Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm test          # node --test src/**/*.test.js
```

No typecheck command is configured.

## Key conventions

- **Linter**: Oxlint, configured in `test/.oxlintrc.json`. Plugins: `react`, `oxc`. Runs `react/rules-of-hooks` as error and `react/only-export-components` as warning.
- **Language**: Plain JSX (not TSX). No TypeScript. No `tsconfig.json`.
- **Entry point**: `test/src/main.jsx` → `test/src/App.jsx`
- **Build tool**: Vite 6.4.3 with `@vitejs/plugin-react`. Config at `test/vite.config.js`.
- **Styling**: Plain CSS files (`src/styles.css`). CSS nesting and CSS custom properties are used. Dark color scheme (ink/frost tokens) is the default; no `prefers-color-scheme` handling.
- **Assets**: Public assets live in `test/public/` (only `test.png`, the hero avatar). Site icons are inline SVG in components.
