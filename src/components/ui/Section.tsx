import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type SectionTone = 'light' | 'dark' | 'surface' | 'deep'

const TONES: Record<SectionTone, string> = {
  light: 'on-light bg-paper text-ink',
  dark: 'bg-ink text-paper',
  surface: 'bg-surface text-paper',
  deep: 'bg-deep text-paper',
}

type SectionProps = {
  children: ReactNode
  tone?: SectionTone
  id?: string
  /** Fine grid-line motif in the background. */
  gridLines?: boolean
  className?: string
  containerClassName?: string
  /** Accessible name when the section has no visible heading id to point to. */
  labelledBy?: string
  bleed?: ReactNode
}

/** Full-width band with brand tone and the standard container. */
export function Section({
  children,
  tone = 'light',
  id,
  gridLines = false,
  className,
  containerClassName,
  labelledBy,
  bleed,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative overflow-hidden py-20 md:py-28 lg:py-32', TONES[tone], className)}
    >
      {gridLines ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-lines"
          style={
            tone === 'light' ? { ['--grid-line' as string]: 'var(--color-line-light)' } : undefined
          }
        />
      ) : null}
      {bleed}
      <div className={cn('relative container-brand', containerClassName)}>{children}</div>
    </section>
  )
}

/** True when text on this tone should use the light-background colour rules. */
export function isLightTone(tone: SectionTone) {
  return tone === 'light'
}
