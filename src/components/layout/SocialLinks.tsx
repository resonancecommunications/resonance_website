import type { SiteSettings } from '@/content/types'
import { strings } from '@/lib/strings'
import { cn } from '@/lib/utils'

type Network = keyof SiteSettings['social']

const ICONS: Record<Network, string> = {
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.25H3zM9.5 9.75h3.83v1.54h.06c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.66 4.8 6.13V21h-4v-5.07c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68V21h-4z',
  facebook:
    'M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63A20.9 20.9 0 0 0 14.25 4.5c-2.25 0-3.79 1.37-3.79 3.89v2.17H7.92v2.94h2.54V21z',
  instagram:
    'M12 3.6c2.74 0 3.06.01 4.14.06 2.78.13 4.07 1.45 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.14c-.13 2.75-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.14.06s-3.06-.01-4.14-.06c-2.79-.13-4.07-1.46-4.2-4.2C3.61 15.06 3.6 14.74 3.6 12s.01-3.06.06-4.14c.13-2.75 1.42-4.07 4.2-4.2C8.94 3.61 9.26 3.6 12 3.6zM12 7.68a4.32 4.32 0 1 0 0 8.64 4.32 4.32 0 0 0 0-8.64zm0 7.12a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm4.49-8.3a1.01 1.01 0 1 0 0 2.02 1.01 1.01 0 0 0 0-2.02z',
  tiktok:
    'M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z',
}

const ORDER: Network[] = ['linkedin', 'facebook', 'instagram', 'tiktok']

type SocialLinksProps = {
  social: SiteSettings['social']
  tone?: 'light' | 'dark'
  className?: string
}

/** Vertical list of networks (icon + name). Renders only the networks that have a URL set in Site Settings. */
export function SocialLinks({ social, tone = 'dark', className }: SocialLinksProps) {
  const items = ORDER.filter((network) => social[network])
  if (items.length === 0) return null

  return (
    <ul className={cn('space-y-1', className)}>
      {items.map((network) => (
        <li key={network}>
          <a
            href={social[network] ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex min-h-10 items-center gap-3 transition-colors duration-200',
              tone === 'dark' ? 'text-paper/80 hover:text-teal' : 'text-ink hover:text-ink/70',
            )}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={cn(
                'size-[1.125rem] shrink-0 fill-current',
                tone === 'light' && 'text-ink transition-colors group-hover:text-teal',
              )}
            >
              <path d={ICONS[network]} />
            </svg>
            {strings.social[network]}
          </a>
        </li>
      ))}
    </ul>
  )
}
