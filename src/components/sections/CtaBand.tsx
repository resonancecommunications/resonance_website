import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { SignalField } from '@/components/brand/SignalField'
import { CtaLink } from '@/components/ui/CtaLink'
import type { CtaBanner } from '@/content/types'
import { slugify } from '@/lib/utils'

/** Closing call-to-action band. */
export function CtaBand({ banner }: { banner: CtaBanner }) {
  const id = `cta-${slugify(banner.headline)}`
  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-deep text-paper">
      <HeroBackdrop glow="center" />
      <SignalField opacity={0.12} fade="radial" interactive />
      <div className="reveal relative container-brand py-24 text-center md:py-32 lg:py-40">
        <h2 id={id} className="mx-auto max-w-4xl type-h1 text-teal">
          {banner.headline}
        </h2>
        {banner.body ? (
          <p className="mx-auto mt-8 max-w-2xl type-lead text-paper/85">{banner.body}</p>
        ) : null}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaLink cta={banner.primaryCta} size="lg" />
          {banner.secondaryCta ? <CtaLink cta={banner.secondaryCta} size="lg" /> : null}
        </div>
      </div>
    </section>
  )
}
