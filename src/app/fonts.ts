import localFont from 'next/font/local'

/*
 * Brand typefaces, self-hosted from the official brand package (brand-assets/fonts).
 * Latin files are variable WOFF2 subsets (see README → Fonts), so no request ever
 * leaves for a third-party font CDN.
 */

/** Primary typeface: headlines, titles, key messages, nav, buttons. */
export const bricolage = localFont({
  src: '../../brand-assets/fonts/BricolageGrotesque-Variable-latin.woff2',
  weight: '200 800',
  variable: '--font-bricolage',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial'],
  adjustFontFallback: 'Arial',
})

/** Secondary typeface: body copy, captions, forms, dense information. */
export const plex = localFont({
  src: '../../brand-assets/fonts/IBMPlexSans-Variable-latin.woff2',
  weight: '400 600',
  variable: '--font-plex',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial'],
  adjustFontFallback: 'Arial',
})

/**
 * Amharic typeface. Not preloaded: the browser only fetches it when text marked
 * `lang="am"` needs Ethiopic glyphs, so English pages pay nothing for it.
 */
export const nokiaPure = localFont({
  src: [
    { path: '../../brand-assets/fonts/NokiaPureHeadline-UltraLight-ethiopic.woff2', weight: '250' },
    { path: '../../brand-assets/fonts/NokiaPureHeadline-Bold-ethiopic.woff2', weight: '700' },
  ],
  variable: '--font-nokia',
  display: 'swap',
  preload: false,
  fallback: ['Noto Sans Ethiopic', 'Nyala', 'system-ui'],
})
