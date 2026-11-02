'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Fixed glass header (translucent ink + backdrop blur) over the page; every hero starts
 * underneath it. Condenses once the page scrolls.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-condensed={condensed || undefined}
      className="group/header fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-ink/35 text-paper backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color] duration-300 data-condensed:border-white/10 data-condensed:bg-ink/65"
    >
      <div className="container-brand flex h-[var(--header-h)] items-center justify-between gap-6 transition-[height] duration-300 ease-brand group-data-condensed/header:h-16">
        {children}
      </div>
    </header>
  )
}
