import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { type NextRequest, NextResponse } from 'next/server'

type WebhookPayload = { _type?: string; slug?: string | null }

/**
 * Sanity webhook target (see README → Revalidation webhook). Invalidates the cache tag
 * for the published document's type, plus the project's own tag, so pages update on
 * their next visit.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true)
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Missing _type' }, { status: 400 })
    }

    const tags = [body._type]
    if (body._type === 'project' && body.slug) tags.push(`project:${body.slug}`)
    for (const tag of tags) revalidateTag(tag, 'max')

    return NextResponse.json({ revalidated: tags, now: Date.now() })
  } catch (error) {
    console.error('[revalidate]', error instanceof Error ? error.message : 'unknown error')
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
