import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { CtaLink } from '@/components/ui/CtaLink'
import { Paragraphs } from '@/components/ui/Paragraphs'
import type { Hero } from '@/content/types'

/** Home hero: the guideline cover, with Resonance Flow as the motion element. */
export function HomeHero({ hero }: { hero: Hero }) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-paper">
      <HeroBackdrop glow="right" />
      <div className="relative container-brand flex min-h-[calc(100svh-var(--header-h))] flex-col justify-between gap-16 pt-16 pb-10 md:pt-24 lg:pt-28">
        <div>
          <h1 className="max-w-[15ch] type-hero text-teal">{hero.headline}</h1>
          <Paragraphs
            items={hero.supportingText}
            className="mt-8 max-w-xl type-lead text-paper/85 md:mt-10"
          />
          <div className="mt-10 flex flex-wrap gap-4">
            {hero.primaryCta ? <CtaLink cta={hero.primaryCta} size="lg" /> : null}
            {hero.secondaryCta ? <CtaLink cta={hero.secondaryCta} size="lg" /> : null}
          </div>
        </div>
        <ResonanceFlow
          artwork="wave"
          animated
          className="-mx-[var(--gutter)] w-[calc(100%+2*var(--gutter))] max-w-none md:mx-0 md:w-full"
        />
      </div>
    </section>
  )
}
