import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getContactPage } from '@/lib/content'
import { isEmailConfigured, sendInquiryEmail } from '@/lib/email'
import { isRateLimited } from '@/lib/rate-limit'
import { absoluteUrl } from '@/lib/site'
import { strings } from '@/lib/strings'
import { inquirySchema } from '@/lib/validators/inquiry'
import { isSanityConfigured } from '@/sanity/env'
import { writeToken } from '@/sanity/lib/token'
import { writeClient } from '@/sanity/lib/write-client'

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

/**
 * Receives contact form submissions: validates, rate-limits, stores an `inquiry`
 * document in Sanity and emails the team. Personal data is never logged.
 */
export async function POST(request: Request) {
  if (await isRateLimited(clientIp(request))) {
    return NextResponse.json({ error: strings.form.errors.rateLimited }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the highlighted fields.',
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    )
  }
  const inquiry = parsed.data

  // Honeypot filled: pretend success so bots learn nothing.
  if (inquiry.website) return NextResponse.json({ ok: true })

  const { form } = await getContactPage()
  if (!form.serviceOptions.includes(inquiry.service)) {
    return NextResponse.json(
      {
        error: 'Please check the highlighted fields.',
        fields: { service: [strings.form.errors.service] },
      },
      { status: 422 },
    )
  }

  const canStore = isSanityConfigured && Boolean(writeToken)
  const canEmail = isEmailConfigured()
  if (!canStore && !canEmail) {
    console.error('[inquiry] Neither Sanity write token nor Resend is configured.')
    return NextResponse.json({ error: form.errorMessage }, { status: 503 })
  }

  let stored: { _id: string } | null = null
  let emailed = false

  if (canStore) {
    try {
      stored = await writeClient.create({
        _type: 'inquiry',
        status: 'new',
        fullName: inquiry.fullName,
        organization: inquiry.organization || undefined,
        email: inquiry.email,
        phone: inquiry.phone || undefined,
        service: inquiry.service,
        description: inquiry.description,
        submittedAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error(
        '[inquiry] Failed to store in Sanity:',
        error instanceof Error ? error.name : 'unknown',
      )
    }
  }

  if (canEmail) {
    try {
      const studioUrl = stored
        ? absoluteUrl(`/studio/intent/edit/id=${stored._id};type=inquiry`)
        : undefined
      await sendInquiryEmail(inquiry, studioUrl)
      emailed = true
    } catch (error) {
      console.error(
        '[inquiry] Failed to send email:',
        error instanceof Error ? error.message : 'unknown',
      )
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json({ error: form.errorMessage }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
