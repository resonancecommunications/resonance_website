import { Carrier } from '@/components/brand/Carrier'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ResonanceFlow, type FlowArtwork } from '@/components/brand/ResonanceFlow'
import { CtaLink } from '@/components/ui/CtaLink'
import { Paragraphs } from '@/components/ui/Paragraphs'
import type { Hero } from '@/content/types'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  hero: Hero
  /** Glow side and Flow artwork let the two divisions read as distinct. */
  glow?: 'left' | 'right' | 'center'
  flow?: { artwork: FlowArtwork; flip?: boolean; segments?: [number, number] } | null
  className?: string
}

/** Inner-page hero: Carrier label, large Bricolage headline, intro, CTA. */
export function PageHero({ hero, glow = 'right', flow = null, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-deep text-paper', className)}>
      <HeroBackdrop glow={glow} />
      {flow ? (
        <ResonanceFlow
          artwork={flow.artwork}
          segments={flow.segments}
          flip={flow.flip}
          fill={flow.flip ? 'fade-right' : 'fade-left'}
          animated
          className={cn(
            'pointer-events-none absolute bottom-10 h-28 w-auto opacity-70 md:h-40 lg:bottom-16 lg:h-52',
            flow.flip ? '-left-6' : '-right-6',
          )}
        />
      ) : null}
      <div className="relative container-brand pt-16 pb-36 md:pt-24 md:pb-48 lg:pt-32 lg:pb-56">
        {hero.eyebrow ? <Carrier size="sm">{hero.eyebrow}</Carrier> : null}
        <h1 className="mt-8 max-w-5xl type-h1 text-teal">{hero.headline}</h1>
        <Paragraphs
          items={hero.supportingText}
          lead
          className="mt-8 max-w-2xl text-muted-dark [&>p:first-child]:text-paper"
        />
        {hero.primaryCta || hero.secondaryCta ? (
          <div className="mt-10 flex flex-wrap gap-4">
            {hero.primaryCta ? <CtaLink cta={hero.primaryCta} size="lg" /> : null}
            {hero.secondaryCta ? <CtaLink cta={hero.secondaryCta} size="lg" /> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
