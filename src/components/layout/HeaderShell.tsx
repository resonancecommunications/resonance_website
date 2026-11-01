'use client'

import { useEffect, useState, type ReactNode } from 'react'

/** Sticky header bar that condenses once the page scrolls. */
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
      className="group/header sticky top-0 z-50 border-b border-transparent bg-ink text-paper transition-[border-color] duration-300 data-condensed:border-white/10"
    >
      <div className="container-brand flex h-[var(--header-h)] items-center justify-between gap-6 transition-[height] duration-300 ease-brand group-data-condensed/header:h-16">
        {children}
      </div>
    </header>
  )
}
