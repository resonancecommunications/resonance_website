import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { NotFoundContent } from '@/components/sections/NotFoundContent'
import { strings } from '@/lib/strings'

export const metadata: Metadata = {
  title: `${strings.notFound.headline} | Resonance Communications`,
  robots: { index: false, follow: true },
}

/** 404 for URLs outside any route; renders the full site chrome. */
export default function GlobalNotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  )
}
