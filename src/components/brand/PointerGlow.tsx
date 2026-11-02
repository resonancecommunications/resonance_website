'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type PointerGlowProps = {
  /** grid: light up the square under the pointer. signal: fill the RC shape under the pointer. */
  variant: 'grid' | 'signal'
  className?: string
}

const POOL = 8

/**
 * Lights up the background cell under the pointer and lets it fade out behind it.
 * Cell size is read from CSS (--grid-size / --sf-size) so it always matches the pattern.
 * Inactive on touch devices and when reduced motion is requested.
 */
export function PointerGlow({ variant, className }: PointerGlowProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const probeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const probe = probeRef.current
    const host = root?.closest('section, footer, article') as HTMLElement | null
    if (!root || !probe || !host) return
    const capable = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    if (!capable.matches) return

    const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-cell]'))
    let next = 0
    let current: HTMLElement | null = null
    let lastKey = ''
    let frame = 0
    // Last known pointer position: scrolling moves the content under a still pointer,
    // so the lit cell is recomputed on scroll too (otherwise it drifts with the page).
    let pointer: { x: number; y: number } | null = null

    const leave = () => {
      current?.classList.remove('is-on')
      current = null
      lastKey = ''
    }
    const paint = () => {
      frame = 0
      if (!pointer) return
      const w = probe.offsetWidth
      const h = probe.offsetHeight
      if (!w || !h) return
      const rect = root.getBoundingClientRect()
      const x = pointer.x - rect.left
      const y = pointer.y - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return leave()
      // Only light up when this section is the topmost thing under the pointer
      // (on Home, stacked sections overlap one another).
      const hit = document.elementFromPoint(pointer.x, pointer.y)
      if (!hit || !host.contains(hit)) return leave()
      const col = Math.floor(x / w)
      const row = Math.floor(y / h)
      const key = `${col}:${row}`
      if (key === lastKey) return
      lastKey = key
      current?.classList.remove('is-on')
      const cell = cells[next]
      next = (next + 1) % cells.length
      cell.style.width = `${w}px`
      cell.style.height = `${h}px`
      cell.style.transform = `translate(${col * w}px, ${row * h}px)`
      cell.classList.add('is-on')
      current = cell
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const out = () => {
      pointer = null
      leave()
    }

    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerleave', out)
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', out)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn('pointer-glow pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        ref={probeRef}
        className={variant === 'grid' ? 'glow-probe-grid' : 'glow-probe-signal'}
      />
      {Array.from({ length: POOL }, (_, i) => (
        <div
          key={i}
          data-cell
          className={variant === 'grid' ? 'glow-cell-grid' : 'glow-cell-signal'}
        />
      ))}
    </div>
  )
}
