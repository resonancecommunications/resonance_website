import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { readToken } from '@/sanity/lib/token'

/**
 * Enables Draft Mode for the Presentation tool. Sanity signs each preview URL and this
 * handler verifies it with the read token, then redirects to the previewed page.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
})
