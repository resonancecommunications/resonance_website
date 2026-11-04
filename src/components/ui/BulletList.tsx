import { cn } from '@/lib/utils'

type BulletListProps = {
  items: string[]
  columns?: 1 | 2
  tone?: 'light' | 'dark'
  /** lg: display typeface at a larger size (division service lists). */
  size?: 'md' | 'lg'
  /** Hairline rule under each item. */
  divided?: boolean
  className?: string
}

/** List with short teal rules as markers. */
export function BulletList({
  items,
  columns = 1,
  tone = 'dark',
  size = 'md',
  divided = true,
  className,
}: BulletListProps) {
  return (
    <ul
      className={cn(
        'grid gap-x-8',
        columns === 2 && 'sm:grid-cols-2',
        tone === 'dark' ? 'text-paper/85' : 'text-ink',
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'flex items-start gap-3 leading-snug',
            size === 'lg' ? 'font-display text-lg' : 'text-[0.9375rem]',
            divided
              ? cn(
                  'border-b',
                  size === 'lg' ? 'py-3.5' : 'py-3',
                  tone === 'dark' ? 'border-white/10' : 'border-ink/10',
                )
              : 'py-2',
            size === 'lg' && tone === 'dark' && 'text-paper',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'h-0.5 shrink-0 bg-teal',
              size === 'lg' ? 'mt-[0.7em] w-4' : 'mt-[0.6em] w-3',
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
