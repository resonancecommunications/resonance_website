'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type StackLayerProps = {
  children: ReactNode
  /** Position in the stack; later layers slide over earlier ones. */
  index: number
  /** The final layer is at least one screen tall so it can settle fully before the footer. */
  last?: boolean
}

/**
 * Home page scroll effect: each section stays in place while the next one slides up
 * over it. A layer sticks once its bottom edge reaches the bottom of the viewport, so
 * sections taller than the screen are still read in full before being covered.
 *
 * The viewport height comes from a 100svh probe (the small viewport), which does not
 * change when mobile browser toolbars show/hide, so layers never jump mid-scroll.
 * Falls back to normal document flow when reduced motion is requested.
 */
export function StackLayer({ children, index, last = false }: StackLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const probeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const probe = probeRef.current
    if (!el || !probe) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = window.innerWidth
    const update = () => {
      if (reduced.matches) {
        el.style.position = 'relative'
        el.style.top = ''
        return
      }
      el.style.position = 'sticky'
      el.style.top = `${Math.min(0, probe.offsetHeight - el.offsetHeight)}px`
    }
    const onResize = () => {
      // Ignore height-only resizes (mobile toolbars); layout only changes with width.
      if (window.innerWidth === width) return
      width = window.innerWidth
      update()
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', onResize)
    reduced.addEventListener('change', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
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
        last && 'flex min-h-svh flex-col motion-reduce:block motion-reduce:min-h-0 [&>*]:flex-1',
      )}
      style={{ zIndex: index + 1 }}
    >
      <div
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute h-svh w-px"
      />
      {children}
    </div>
  )
}
