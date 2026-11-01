import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EyebrowProps = {
  children: ReactNode
  /** dark: teal text. light: ink text with a teal marker (teal text fails contrast on paper). */
  tone?: 'light' | 'dark'
  as?: ElementType
  className?: string
}

/** Wide-tracked uppercase label, the guideline's "K E Y W O R D S" style. */
export function Eyebrow({ children, tone = 'dark', as: Tag = 'p', className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'flex items-center gap-3 eyebrow',
        tone === 'dark' ? 'text-teal' : 'text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block h-0.5 w-6 shrink-0 bg-teal" />
      <span>{children}</span>
    </Tag>
  )
}
