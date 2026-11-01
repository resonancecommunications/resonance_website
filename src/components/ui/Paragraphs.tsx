import { cn } from '@/lib/utils'

type ParagraphsProps = {
  items?: string[] | null
  /** Render the first paragraph larger, as a lead. */
  lead?: boolean
  className?: string
}

export function Paragraphs({ items, lead = false, className }: ParagraphsProps) {
  if (!items?.length) return null
  return (
    <div className={cn('space-y-5', className)}>
      {items.map((text, i) => (
        <p key={i} className={cn(lead && i === 0 && 'type-lead')}>
          {text}
        </p>
      ))}
    </div>
  )
}
