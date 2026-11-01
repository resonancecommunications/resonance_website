import type { Metadata, Viewport } from 'next'
import { bricolage, nokiaPure, plex } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export const viewport: Viewport = {
  themeColor: '#010101',
  colorScheme: 'light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plex.variable} ${nokiaPure.variable}`}>
      <body>{children}</body>
    </html>
  )
}
