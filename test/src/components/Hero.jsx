import { useEffect, useRef, useState } from 'react'
import { clamp, mapRange } from '../lib/motion.js'

function Hero({ motionEnabled }) {
  const trackRef = useRef(null)
  const decorRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!motionEnabled) {
      setProgress(0)
      return undefined
    }
    let frame = 0
    const update = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      setProgress(clamp(-rect.top / travel))
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
  }, [motionEnabled])

  useEffect(() => {
    const decor = decorRef.current
    if (!motionEnabled || !decor) return undefined

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2
      targetY = (event.clientY / window.innerHeight - 0.5) * 2
      if (!frame) frame = requestAnimationFrame(step)
    }
    const step = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      decor.style.transform = `translate3d(${currentX * 12}px, ${currentY * 14}px, 0)`
      frame = requestAnimationFrame(step)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      decor.style.removeProperty('transform')
    }
  }, [motionEnabled])

  const titleOpacity = clamp(1 - mapRange(progress, 0, 0.5, 0, 1))
  const titleOffset = mapRange(progress, 0, 0.5, 0, -80)

  return (
    <section ref={trackRef} className="relative h-[180svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div
          ref={decorRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="orb absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <span
            className="dot-float absolute left-[18%] top-[26%] h-1.5 w-1.5 rounded-full bg-ice-500"
            style={{ '--dot-duration': '6s', '--dot-delay': '0.4s' }}
          />
          <span
            className="dot-float absolute right-[20%] top-[32%] h-1 w-1 rounded-full bg-ice-400"
            style={{ '--dot-duration': '8s', '--dot-delay': '1.6s' }}
          />
          <span
            className="dot-float absolute bottom-[28%] right-[24%] h-2 w-2 rounded-full bg-ice-400"
            style={{ '--dot-duration': '7s', '--dot-delay': '2.8s' }}
          />
          <span
            className="dot-float absolute bottom-[32%] left-[26%] h-1.5 w-1.5 rounded-full bg-ice-500"
            style={{ '--dot-duration': '6.5s', '--dot-delay': '3.9s' }}
          />
        </div>

        <div
          className="relative z-10 mx-auto max-w-4xl px-6 pt-16 text-center"
          style={{
            opacity: titleOpacity,
            transform: `translate3d(0, ${titleOffset}px, 0)`,
          }}
        >
          <img
            src="/test.webp"
            alt="澎科大大一的網站頭像"
            className="mx-auto mb-6 h-28 w-28 rounded-full border border-ice-700/50 object-cover shadow-[0_0_30px_rgba(111,160,191,0.35)]"
          />
          <p className="mb-6 text-sm tracking-[0.35em] text-frost-400">
            未知的探索者
          </p>
          <h1 className="hero-title text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            柯均翰
          </h1>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-frost-300">
            專注於人工智慧與機器學習研究的大學部學生。
            相信好的問題，比好的答案更能改變世界。
          </p>
        </div>

        <div
          className="absolute inset-x-0 bottom-10 z-10 text-center"
        >
          <span className="block text-xs tracking-[0.3em] text-frost-400">
            下一章 · 關於我
          </span>
          <span className="hint-line mx-auto mt-3 block h-10 w-px bg-ice-500" />
        </div>
      </div>
    </section>
  )
}

export default Hero