import Script from 'next/script'

/**
 * Optional, cookie-free analytics (e.g. Plausible or Umami). Off unless
 * NEXT_PUBLIC_ANALYTICS_SCRIPT_URL is set. No other tracking is loaded.
 */
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL
  const siteId = process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID
  if (!src) return null
  return (
    <Script src={src} strategy="afterInteractive" data-domain={siteId} data-website-id={siteId} />
  )
}
