import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { Logo } from '@/components/brand/Logo'
import { SignalField } from '@/components/brand/SignalField'
import type { NavItem } from '@/content/types'
import { getNavigation, getSiteSettings } from '@/lib/content'
import { strings } from '@/lib/strings'
import { SocialLinks } from './SocialLinks'

async function currentYear() {
  'use cache'
  cacheLife('days')
  return new Date().getFullYear()
}

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-5 eyebrow text-teal">{children}</h2>
}

function FooterLinks({ items }: { items: NavItem[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link
            href={item.href}
            className="inline-flex min-h-10 items-center text-paper/80 transition-colors hover:text-teal"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export async function Footer() {
  const [navigation, settings, year] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
    currentYear(),
  ])
  const { footer } = navigation

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="relative container-brand grid gap-12 pt-20 pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        <div className="lg:col-span-4">
          <Logo
            variant="horizontal"
            tone="dark"
            height={34}
            className="-m-[22px]"
            src={settings.logos?.horizontal}
          />
          <p className="mt-10 font-display text-xl leading-snug font-light text-paper">
            {settings.tagline}
          </p>
          <p className="mt-4 max-w-sm text-[0.9375rem] text-muted-dark">{settings.description}</p>
        </div>

        <nav
          aria-label={strings.footerNavigation}
          className="grid gap-12 sm:grid-cols-2 lg:col-span-5"
        >
          <div>
            <FooterHeading>{footer.quickLinksHeading}</FooterHeading>
            <FooterLinks items={footer.quickLinks} />
          </div>
          <div>
            <FooterHeading>{footer.divisionsHeading}</FooterHeading>
            <FooterLinks items={footer.divisions} />
          </div>
        </nav>

        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
          <div>
            <FooterHeading>{footer.contactHeading}</FooterHeading>
            <address className="space-y-1 text-paper/80 not-italic">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="inline-flex min-h-10 items-center break-all transition-colors hover:text-teal"
              >
                {settings.contactEmail}
              </a>
              {settings.phone ? (
                <a
                  href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                  className="flex min-h-10 items-center transition-colors hover:text-teal"
                >
                  {settings.phone}
                </a>
              ) : null}
              <p className="flex min-h-10 items-center">{settings.location}</p>
            </address>
          </div>
          {Object.values(settings.social).some(Boolean) ? (
            <div>
              <FooterHeading>{footer.socialHeading}</FooterHeading>
              <SocialLinks social={settings.social} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <SignalField opacity={0.14} fade="bottom" className="-bottom-6" />
        <div className="relative container-brand flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="font-display text-lg text-paper">{settings.footerStatement}</p>
            <p className="text-sm text-muted-dark">{strings.copyright(year, settings.siteName)}</p>
          </div>
          <Logo
            variant="symbol"
            tone="dark"
            height={88}
            alt={`${settings.siteName}: ${settings.brandLine}`}
            src={settings.logos?.symbol}
            className="-m-[19px] self-start md:self-auto"
          />
        </div>
      </div>
    </footer>
  )
}
