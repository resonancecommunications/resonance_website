import { Carrier } from '@/components/brand/Carrier'
import { HeroBackdrop } from '@/components/brand/HeroBackdrop'
import { ResonanceFlow } from '@/components/brand/ResonanceFlow'
import { CtaLink } from '@/components/ui/CtaLink'
import { strings } from '@/lib/strings'

export function NotFoundContent() {
  const t = strings.notFound
  return (
    <section className="relative isolate overflow-hidden bg-deep text-paper">
      <HeroBackdrop glow="center" />
      <div className="relative container-brand flex min-h-[75svh] flex-col justify-center pt-[calc(var(--header-h)+6rem)] pb-24">
        <Carrier size="sm">{t.eyebrow}</Carrier>
        <h1 className="mt-8 max-w-3xl type-h1 text-teal">{t.headline}</h1>
        <p className="mt-6 max-w-xl type-lead text-paper/85">{t.body}</p>
        <div className="mt-10">
          <CtaLink cta={{ label: t.cta, href: '/', style: 'primary' }} size="lg" />
        </div>
        <ResonanceFlow artwork="swell" animated className="mt-20 w-full max-w-2xl" />
      </div>
    </section>
  )
}
