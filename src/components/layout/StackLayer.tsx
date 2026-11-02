'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type StackLayerProps = {
  children: ReactNode
  /** Position in the stack; later layers slide over earlier ones. */
  index: number
}

/**
 * Home page scroll effect: each section stays in place while the next one slides up
 * over it. A layer sticks once its bottom edge reaches the bottom of the viewport, so
 * sections taller than the screen are still read in full before being covered.
 * Falls back to normal document flow when reduced motion is requested.
 */
export function StackLayer({ children, index }: StackLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      if (reduced.matches) {
        el.style.position = 'relative'
        el.style.top = ''
        return
      }
      el.style.position = 'sticky'
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    reduced.addEventListener('change', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        index > 0 &&
          '-mt-8 overflow-clip rounded-t-[2rem] shadow-[0_-28px_60px_-12px_rgb(1_1_1/0.45)] motion-reduce:mt-0 motion-reduce:rounded-none',
      )}
      style={{ zIndex: index + 1 }}
    >
      {children}
    </div>
  )
}
