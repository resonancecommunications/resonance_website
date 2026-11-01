import { Carrier } from '@/components/brand/Carrier'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { Section } from '@/components/ui/Section'
import type { TextSection } from '@/content/types'

function Statement({ data, id }: { data: TextSection; id: string }) {
  return (
    <div className="reveal">
      {data.eyebrow ? (
        <Carrier size="sm" reveal>
          {data.eyebrow}
        </Carrier>
      ) : null}
      <h2
        id={id}
        className="mt-8 font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] leading-[1.1] font-light tracking-tight"
      >
        {data.headline}
      </h2>
      <Paragraphs items={data.body} className="mt-6 type-lead text-muted-dark" />
    </div>
  )
}

/** Vision and Mission side by side on a dark panel, as in the guideline. */
export function VisionMission({ vision, mission }: { vision: TextSection; mission: TextSection }) {
  return (
    <Section tone="surface" gridLines>
      <ResonanceFlow
        artwork="wave"
        segments={[3, 5]}
        fill="solid"
        className="mx-auto mb-16 h-10 w-auto opacity-90 md:mb-20"
      />
      <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-24">
        <Statement data={vision} id="vision-heading" />
        <Statement data={mission} id="mission-heading" />
      </div>
    </Section>
  )
}
