import { cn } from '@/lib/utils'

type BulletListProps = {
  items: string[]
  columns?: 1 | 2
  tone?: 'light' | 'dark'
  className?: string
}

/** List with short teal rules as markers. */
export function BulletList({ items, columns = 1, tone = 'dark', className }: BulletListProps) {
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
            'flex items-start gap-3 border-b py-3 text-[0.9375rem] leading-snug',
            tone === 'dark' ? 'border-white/10' : 'border-ink/10',
          )}
        >
          <span aria-hidden="true" className="mt-[0.6em] h-0.5 w-3 shrink-0 bg-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
