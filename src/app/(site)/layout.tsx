import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { strings } from '@/lib/strings'

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-teal px-5 py-3 font-display font-semibold text-ink transition-transform focus:translate-y-0"
      >
        {strings.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
