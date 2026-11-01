'use client'

import { useEffect, useState } from 'react'
import { cn, pad2 } from '@/lib/utils'

type ServiceNavProps = {
  label: string
  items: { slug: string; title: string }[]
  /** pills: horizontal scroller (mobile/tablet). list: sticky side list (desktop). */
  variant: 'pills' | 'list'
}

/** Anchor navigation for the service portfolio; highlights the section in view. */
export function ServiceNav({ label, items, variant }: ServiceNavProps) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label={label}>
      {variant === 'pills' ? (
        <ul className="-mx-[var(--gutter)] flex [scrollbar-width:none] gap-2 overflow-x-auto px-[var(--gutter)] py-3">
          {items.map((item, i) => (
            <li key={item.slug} className="shrink-0">
              <a
                href={`#${item.slug}`}
                aria-current={active === item.slug ? 'true' : undefined}
                className="flex min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 text-sm whitespace-nowrap transition-colors aria-[current=true]:border-ink aria-[current=true]:bg-ink aria-[current=true]:text-paper"
              >
                <span className="font-display text-xs opacity-60">{pad2(i + 1)}</span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ol>
          {items.map((item, i) => (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={active === item.slug ? 'true' : undefined}
                className={cn(
                  'group flex min-h-11 items-center gap-4 border-b border-ink/10 py-3 text-[0.9375rem] text-muted-light transition-colors hover:text-ink aria-[current=true]:text-ink',
                )}
              >
                <span className="w-6 font-display text-xs">{pad2(i + 1)}</span>
                <span className="flex-1">{item.title}</span>
                <span
                  aria-hidden="true"
                  className="h-0.5 w-0 bg-teal transition-[width] duration-300 group-aria-[current=true]:w-6"
                />
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
