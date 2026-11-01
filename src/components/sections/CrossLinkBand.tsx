import { Carrier } from '@/components/brand/Carrier'
import { ResonanceFlow, type FlowArtwork } from '@/components/brand/ResonanceFlow'
import { CtaLink } from '@/components/ui/CtaLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { CrossLink } from '@/content/types'

/** Connects one division page to the other. */
export function CrossLinkBand({ data, artwork }: { data: CrossLink; artwork: FlowArtwork }) {
  return (
    <section aria-labelledby="crosslink-heading" className="on-light bg-paper text-ink">
      <div className="container-brand py-16 md:py-20">
        <div className="reveal relative grid items-center gap-10 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper md:grid-cols-12 md:p-12 lg:p-16">
          <div className="relative md:col-span-7">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <Carrier size="md" className="mt-8" reveal>
              {data.title}
            </Carrier>
            <h2 id="crosslink-heading" className="mt-6 type-h2">
              {data.headline}
            </h2>
            <div className="mt-10">
              <CtaLink cta={data.cta} />
            </div>
          </div>
          <ResonanceFlow artwork={artwork} animated className="relative w-full md:col-span-5" />
        </div>
      </div>
    </section>
  )
}
