'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SignalField } from '@/components/brand/SignalField'
import { CtaLink } from '@/components/ui/CtaLink'
import type { Cta, NavItem } from '@/content/types'
import { strings } from '@/lib/strings'
import { NavLinks } from './NavLinks'

type MobileMenuProps = {
  items: NavItem[]
  cta: Cta
  email: string
  location: string
}

/**
 * Full-screen menu below the xl breakpoint. Built on <dialog>, which provides focus
 * containment, Escape to close and an inert background without extra code.
 */
export function MobileMenu({ items, cta, email, location }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  // Close when the route changes (e.g. browser back while open).
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex size-12 items-center justify-center rounded-full border border-white/20 text-paper transition-colors hover:border-teal hover:text-teal xl:hidden"
      >
        <span className="sr-only">{strings.openMenu}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
          <path d="M3 8h18M3 16h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label={strings.mainNavigation}
        onClose={() => setOpen(false)}
        className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-paper backdrop:bg-ink/60"
      >
        <SignalField opacity={0.1} fade="top" className="top-auto h-1/2" />
        <div className="relative flex h-full flex-col">
          <div className="container-brand flex h-[var(--header-h)] items-center justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-12 items-center justify-center rounded-full border border-white/20 text-paper transition-colors hover:border-teal hover:text-teal"
            >
              <span className="sr-only">{strings.closeMenu}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
          </div>
          <nav className="container-brand flex-1 overflow-y-auto pb-8">
            <NavLinks items={items} variant="menu" onNavigate={() => setOpen(false)} />
          </nav>
          <div className="container-brand flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
            <CtaLink cta={cta} size="lg" />
            <div className="text-sm text-muted-dark">
              <a href={`mailto:${email}`} className="block py-1 hover:text-teal">
                {email}
              </a>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
