import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ChipProps = {
  children: ReactNode
  className?: string
}

/** Rounded keyword pill (dark gray, light text) from the guideline's Brand Overview page. */
export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-10 items-center rounded-full bg-chip px-5 font-display text-[0.9375rem] leading-tight text-paper',
        className,
      )}
    >
      {children}
    </span>
  )
}
