import { Carrier } from '@/components/brand/Carrier'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { SignalField } from '@/components/brand/SignalField'
import { BulletList } from '@/components/ui/BulletList'
import { CtaLink } from '@/components/ui/CtaLink'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Division, HomePage } from '@/content/types'

/** Each division keeps the shared palette but carries its own Flow form and direction. */
const DIVISION_FLOW = {
  events: { artwork: 'wave', segments: [0, 4], flip: false },
  media: { artwork: 'swell', segments: [4, 8], flip: true },
} as const

function DivisionCard({ division }: { division: Division }) {
  const flow = DIVISION_FLOW[division.key]
  const headingId = `division-${division.key}`
  return (
    <article
      aria-labelledby={headingId}
      className="reveal relative flex flex-col overflow-hidden rounded-[1.75rem] bg-surface p-7 text-paper sm:p-10 lg:p-12"
    >
      <SignalField opacity={0.035} fade={flow.flip ? 'left' : 'right'} interactive />
      <ResonanceFlow
        artwork={flow.artwork}
        segments={[...flow.segments]}
        flip={flow.flip}
        fill="fade-left"
        className="absolute top-10 right-0 h-14 w-auto opacity-80 sm:h-20"
      />
      <div className="relative flex flex-1 flex-col">
        <p
          className="font-display text-6xl font-extralight text-teal sm:text-7xl"
          aria-hidden="true"
        >
          {division.number}
        </p>
        <Carrier size="md" className="mt-6" reveal>
          {division.title}
        </Carrier>
        <h3 id={headingId} className="mt-6 type-h3">
          <span className="sr-only">{division.title}: </span>
          {division.headline}
        </h3>
        <p className="mt-4 text-muted-dark">{division.body}</p>
        <p className="mt-8 eyebrow text-teal">{division.servicesLabel}</p>
        <BulletList items={division.services} columns={2} size="lg" divided={false} className="mt-3" />
        <div className="mt-auto pt-10">
          <CtaLink cta={division.cta} />
        </div>
      </div>
    </article>
  )
}

export function DivisionShowcase({ data }: { data: HomePage['divisions'] }) {
  return (
    <Section tone="light" labelledBy="divisions-heading" gridLines gridFadeTop>
      <SectionHeading
        eyebrow={data.eyebrow}
        headline={data.headline}
        intro={data.intro}
        id="divisions-heading"
        className="reveal"
      />
      <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
        {data.items.map((division) => (
          <DivisionCard key={division.key} division={division} />
        ))}
      </div>
    </Section>
  )
}
