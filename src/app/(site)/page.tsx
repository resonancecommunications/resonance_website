import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { CtaLink } from '@/components/ui/CtaLink'
import { homePage } from '@/content/defaults'

export default function HomePage() {
  const { hero } = homePage
  return (
    <section className="relative overflow-hidden bg-deep text-paper">
      <HeroBackdrop />
      <div className="relative container-brand py-28">
        <h1 className="max-w-4xl text-display text-5xl text-teal md:text-8xl">{hero.headline}</h1>
        <div className="mt-10 flex flex-wrap gap-4">
          {hero.primaryCta ? <CtaLink cta={hero.primaryCta} size="lg" /> : null}
          {hero.secondaryCta ? <CtaLink cta={hero.secondaryCta} size="lg" /> : null}
        </div>
        <ResonanceFlow animated className="mt-16 w-full max-w-3xl" />
      </div>
    </section>
  )
}
