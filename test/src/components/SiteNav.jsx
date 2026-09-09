function SiteNav({ motionEnabled, toggleMotion }) {
  return (
    <nav
      aria-label="主要導覽"
      className="glass fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4"
    >
      <div className="ml-auto flex items-center gap-3">
        <a
          href="https://github.com/heh844300-cmyk"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          className="flex h-8 w-8 items-center justify-center text-frost-400 transition-colors hover:text-frost-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-500"
        >
          <svg viewBox="0 0 19 19" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="mailto:heh844300@gmail.com"
          aria-label="Gmail"
          className="flex h-8 w-8 items-center justify-center text-frost-400 transition-colors hover:text-frost-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-500"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3.5 5h17a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.5 3.5v8h16v-8l-8 5-8-5Zm7 4.2 6.7-4.2H4.3l6.7 4.2Z"
            />
          </svg>
        </a>
        <button
          type="button"
          onClick={toggleMotion}
          aria-pressed={!motionEnabled}
          className="rounded-full border border-ice-700 px-4 py-1.5 text-xs text-frost-300 transition-colors hover:border-ice-500 hover:text-frost-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-500"
        >
          {motionEnabled ? '動效 開' : '動效 關'}
        </button>
      </div>
    </nav>
  )
}

export default SiteNav