import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { CtaLink } from '@/components/ui/CtaLink'
import { getNavigation, getSiteSettings } from '@/lib/content'
import { strings } from '@/lib/strings'
import { HeaderShell } from './HeaderShell'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'

export async function Header() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])

  return (
    <HeaderShell>
      <Link
        href="/"
        aria-label={strings.home}
        className="-ml-[20px] block origin-left transition-transform duration-300 ease-brand group-data-condensed/header:scale-[0.8]"
      >
        <Logo
          variant="horizontal"
          tone="dark"
          height={30}
          alt=""
          priority
          src={settings.logos?.horizontal}
        />
      </Link>
      <nav aria-label={strings.mainNavigation} className="hidden xl:block">
        <NavLinks items={navigation.main} />
      </nav>
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <CtaLink cta={navigation.headerCta} />
        </div>
        <MobileMenu
          items={navigation.main}
          cta={navigation.headerCta}
          email={settings.contactEmail}
          location={settings.location}
        />
      </div>
    </HeaderShell>
  )
}
