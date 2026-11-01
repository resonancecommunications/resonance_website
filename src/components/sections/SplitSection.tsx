import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/utils'

type SplitSectionProps = {
  eyebrow?: string | null
  headline: string
  headingId: string
  children: ReactNode
  /** Light heading side + dark content side, as on the guideline's content slides. */
  reverse?: boolean
  id?: string
}

/** Split screen: heading on paper, content on near-black, bleeding to the viewport edges. */
export function SplitSection({
  eyebrow,
  headline,
  headingId,
  children,
  reverse = false,
  id,
}: SplitSectionProps) {
  const edge = 'max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter)))'
  return (
    <section id={id} aria-labelledby={headingId} className="grid lg:grid-cols-12">
      <div
        className={cn(
          'on-light bg-paper py-20 text-ink md:py-28 lg:col-span-5 lg:py-32',
          reverse && 'lg:order-2',
        )}
        style={{
          paddingInlineStart: reverse ? 'var(--gutter)' : edge,
          paddingInlineEnd: reverse ? edge : 'var(--gutter)',
        }}
      >
        <div className="reveal lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
          {eyebrow ? (
            <Eyebrow tone="light" className="mb-6">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <h2 id={headingId} className="type-h2">
            {headline}
          </h2>
        </div>
      </div>
      <div
        className="bg-surface py-20 text-paper md:py-28 lg:col-span-7 lg:py-32"
        style={{
          paddingInlineStart: reverse ? edge : 'var(--gutter)',
          paddingInlineEnd: reverse ? 'var(--gutter)' : edge,
        }}
      >
        <div className="reveal max-w-2xl lg:pl-8">{children}</div>
      </div>
    </section>
  )
}
