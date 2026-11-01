'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from '@/content/types'
import { cn } from '@/lib/utils'

export function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

type NavLinksProps = {
  items: NavItem[]
  variant?: 'bar' | 'menu'
  onNavigate?: () => void
}

export function NavLinks({ items, variant = 'bar', onNavigate }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <ul className={cn(variant === 'bar' ? 'flex items-center gap-1' : 'flex flex-col')}>
      {items.map((item) => {
        const active = isActivePath(pathname, item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative font-display transition-colors duration-200',
                variant === 'bar'
                  ? 'flex min-h-11 items-center px-3 text-[0.9375rem] text-paper/75 hover:text-paper aria-[current=page]:text-teal'
                  : 'flex min-h-14 items-center border-b border-white/10 py-3 text-[1.75rem] font-light tracking-tight text-paper hover:text-teal aria-[current=page]:text-teal sm:text-4xl',
              )}
            >
              {item.label}
              {variant === 'bar' && active ? (
                <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 bg-teal" />
              ) : null}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
