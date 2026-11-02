import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { HomePage } from '@/content/types'

/** Sister companies of the holding group. Renders nothing until logos are added in Sanity. */
export function PartnerLogos({ data }: { data: HomePage['partners'] }) {
  const logos = data.logos.filter((l) => l.logo?.asset?.url)
  if (logos.length === 0) return null
  return (
    <section aria-labelledby="partners-heading" className="relative bg-ink text-paper">
      <div className="container-brand grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-4">
          <Eyebrow className="mb-5">{data.eyebrow}</Eyebrow>
          <h2
            id="partners-heading"
            className="font-display text-3xl font-light tracking-tight md:text-4xl"
          >
            {data.headline}
          </h2>
          {data.intro ? <p className="mt-4 text-muted-dark">{data.intro}</p> : null}
        </div>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-white/10 sm:grid-cols-3 lg:col-span-8">
          {logos.map((p) => {
            const dims = p.logo?.asset.metadata?.dimensions
            const img = (
              <Image
                src={p.logo!.asset.url}
                alt={p.name}
                width={dims?.width ?? 240}
                height={dims?.height ?? 80}
                unoptimized
                className="h-10 w-auto max-w-[70%] object-contain opacity-60 brightness-0 invert transition duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
              />
            )
            return (
              <li key={p._key} className="group flex h-32 items-center justify-center bg-ink">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-full items-center justify-center"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
