import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

/** Leaves Draft Mode and returns to the page the editor was on. */
export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirect') || '/'
  // Only allow same-site relative redirects.
  const safe = redirectTo.startsWith('/') && !redirectTo.startsWith('//') ? redirectTo : '/'
  return NextResponse.redirect(new URL(safe, url.origin))
}
