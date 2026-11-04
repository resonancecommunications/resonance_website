'use client'

import { useEffect, useRef } from 'react'

/**
 * Runs the parent Resonance Flow animation only while it is actually visible: on screen
 * and not covered by another layer (on Home, stacked sections cover earlier ones).
 */
export function FlowPlayback() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const flow = ref.current?.parentElement
    if (!flow) return
    let onScreen = false
    let frame = 0
    const setPlaying = (playing: boolean) => {
      if (playing) flow.setAttribute('data-playing', '')
      else flow.removeAttribute('data-playing')
    }
    const check = () => {
      frame = 0
      if (!onScreen) return setPlaying(false)
      const r = flow.getBoundingClientRect()
      const x = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1)
      const y = Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1)
      const hit = document.elementFromPoint(x, y)
      setPlaying(Boolean(hit && flow.parentElement?.contains(hit)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      schedule()
    })
    io.observe(flow)
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  return <span ref={ref} hidden />
}
