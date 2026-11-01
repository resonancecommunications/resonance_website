import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

type SectionHeadingProps = {
  eyebrow?: string | null
  headline: string
  intro?: string | null
  tone?: 'light' | 'dark'
  /** id for the h2, so the section can reference it via aria-labelledby. */
  id?: string
  as?: 'h2' | 'h3'
  className?: string
}

export function SectionHeading({
  eyebrow,
  headline,
  intro,
  tone = 'light',
  id,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className="mb-6">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading id={id} className="type-h2">
        {headline}
      </Heading>
      {intro ? (
        <p
          className={cn(
            'mt-6 type-lead',
            tone === 'light' ? 'text-muted-light' : 'text-muted-dark',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
