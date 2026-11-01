import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { isSanityConfigured } from '@/sanity/env'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-ink p-8 text-paper">
        <div className="max-w-lg space-y-4">
          <p className="eyebrow text-teal">Sanity Studio</p>
          <h1 className="font-display text-3xl font-light">Not connected yet</h1>
          <p className="text-muted-dark">
            Set NEXT_PUBLIC_SANITY_PROJECT_ID (and the other Sanity variables in .env.example), then
            restart the server. See README → &ldquo;Create the Sanity project&rdquo;.
          </p>
        </div>
      </main>
    )
  }
  return <NextStudio config={config} />
}
