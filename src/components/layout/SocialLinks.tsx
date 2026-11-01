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
  youtube:
    'M21.58 7.19a2.51 2.51 0 0 0-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41A2.51 2.51 0 0 0 2.42 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.51 2.51 0 0 0 1.77-1.78A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.42-4.81zM10 15V9l5.2 3z',
}

const ORDER: Network[] = ['linkedin', 'facebook', 'instagram', 'youtube']

type SocialLinksProps = {
  social: SiteSettings['social']
  className?: string
}

/** Renders only the networks that have a URL set in Site Settings. */
export function SocialLinks({ social, className }: SocialLinksProps) {
  const items = ORDER.filter((network) => social[network])
  if (items.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((network) => (
        <li key={network}>
          <a
            href={social[network] ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={strings.social[network]}
            className="flex size-11 items-center justify-center rounded-full border border-white/15 text-paper transition-colors duration-200 hover:border-teal hover:text-teal"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1.125rem] fill-current">
              <path d={ICONS[network]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
