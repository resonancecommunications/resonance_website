import type { QueryParams } from 'next-sanity'
import { cacheTag } from 'next/cache'
import { draftMode } from 'next/headers'
import { isSanityConfigured } from '../env'
import { client } from './client'
import { readToken } from './token'

type FetchOptions = {
  query: string
  params?: QueryParams
  /** Cache tags, usually document types. /api/revalidate invalidates them on publish. */
  tags: string[]
}

/**
 * Cached Sanity fetch. Results are cached until a webhook revalidates their tags.
 * In Draft Mode Next.js bypasses the cache and this returns draft content with stega
 * encoding for click-to-edit overlays. Returns null when Sanity is not configured.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: FetchOptions): Promise<T | null> {
  'use cache'
  cacheTag(...tags)

  if (!isSanityConfigured) return null

  const { isEnabled: isDraft } = await draftMode()
  if (isDraft && readToken) {
    return client.fetch<T>(query, params, {
      perspective: 'drafts',
      token: readToken,
      stega: true,
    })
  }
  return client.fetch<T>(query, params, { stega: false })
}
