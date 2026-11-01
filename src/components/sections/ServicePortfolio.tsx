import Image from 'next/image'
import { BulletList } from '@/components/ui/BulletList'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { Service } from '@/content/types'
import { pad2 } from '@/lib/utils'
import { ServiceNav } from './ServiceNav'

type ServicePortfolioProps = {
  eyebrow: string
  navLabel: string
  services: Service[]
}

export function ServicePortfolio({ eyebrow, navLabel, services }: ServicePortfolioProps) {
  const navItems = services.map(({ slug, title }) => ({ slug, title }))
  return (
    <section aria-labelledby="portfolio-heading" className="on-light relative bg-paper text-ink">
      <div className="container-brand py-20 md:py-28 lg:grid lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Eyebrow tone="light" as="h2" className="mb-6">
              <span id="portfolio-heading">{eyebrow}</span>
            </Eyebrow>
            <div className="hidden lg:block">
              <ServiceNav label={navLabel} items={navItems} variant="list" />
            </div>
          </div>
        </div>
        <div className="mt-2 lg:col-span-8 lg:mt-0">
          <div className="sticky top-16 z-10 -mx-[var(--gutter)] border-b border-ink/10 bg-paper/95 px-[var(--gutter)] backdrop-blur lg:hidden">
            <ServiceNav label={navLabel} items={navItems} variant="pills" />
          </div>
          {services.map((service, i) => (
            <article
              key={service._id}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="reveal scroll-mt-40 border-t border-ink/15 py-14 first:border-t-0 md:py-20 lg:scroll-mt-28 lg:first:pt-4"
            >
              <div className="flex items-start justify-between gap-6">
                <p
                  aria-hidden="true"
                  className="font-display text-6xl font-extralight text-ink/25 md:text-7xl"
                >
                  {pad2(i + 1)}
                </p>
                {service.icon ? (
                  <Image
                    src={service.icon}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="size-12"
                  />
                ) : null}
              </div>
              <h3 id={`${service.slug}-title`} className="mt-6 type-h2">
                {service.title}
              </h3>
              <p className="mt-6 max-w-2xl type-lead text-muted-light">{service.summary}</p>
              <p className="mt-10 eyebrow text-ink">{service.listLabel}</p>
              <BulletList items={service.items} columns={2} tone="light" className="mt-3" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
