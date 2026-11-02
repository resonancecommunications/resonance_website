import type { ReactNode } from 'react'
import { SignalField } from '@/components/brand/SignalField'
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

/**
 * Split screen: heading on paper, content on near-black, bleeding to the viewport edges.
 * Both halves carry the Signal Field; on desktop the hovered half widens.
 */
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
    <section id={id} aria-labelledby={headingId} className="split-expand flex flex-col lg:flex-row">
      <div
        className={cn(
          'split-left on-light relative overflow-hidden bg-paper py-20 text-ink md:py-28 lg:py-32',
          reverse && 'lg:order-2',
        )}
        style={{
          paddingInlineStart: reverse ? 'var(--gutter)' : edge,
          paddingInlineEnd: reverse ? edge : 'var(--gutter)',
        }}
      >
        <SignalField opacity={0.25} color="var(--color-gray)" fade="top" interactive />
        <div className="reveal relative max-w-[30rem] lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
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
        className="split-right relative overflow-hidden bg-surface py-20 text-paper md:py-28 lg:py-32"
        style={{
          paddingInlineStart: reverse ? edge : 'var(--gutter)',
          paddingInlineEnd: reverse ? 'var(--gutter)' : edge,
        }}
      >
        <SignalField opacity={0.055} fade="bottom" interactive />
        <div className="reveal relative max-w-2xl lg:pl-8">{children}</div>
      </div>
    </section>
  )
}
