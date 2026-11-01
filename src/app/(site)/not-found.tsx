import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/sections/NotFoundContent'
import { strings } from '@/lib/strings'

export const metadata: Metadata = {
  title: strings.notFound.headline,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundContent />
}
