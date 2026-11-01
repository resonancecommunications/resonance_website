import { Resend } from 'resend'
import type { Inquiry } from './validators/inquiry'

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
  )

export function isEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.INQUIRY_TO_EMAIL && process.env.INQUIRY_FROM_EMAIL,
  )
}

/** Sends the team a notification for a new inquiry. Reply-To is the sender. */
export async function sendInquiryEmail(inquiry: Inquiry, studioUrl?: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const rows: [string, string | undefined][] = [
    ['Full name', inquiry.fullName],
    ['Organization', inquiry.organization || undefined],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone || undefined],
    ['Service of interest', inquiry.service],
  ]
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]))

  const text = [
    'New inquiry from the Resonance Communications website',
    '',
    ...filled.map(([k, v]) => `${k}: ${v}`),
    '',
    'Project description:',
    inquiry.description,
    ...(studioUrl ? ['', `Open in Studio: ${studioUrl}`] : []),
  ].join('\n')

  const html = `<!doctype html><html><body style="margin:0;background:#F8F8F8;font-family:Arial,Helvetica,sans-serif;color:#010101">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff">
    <tr><td style="background:#010101;padding:20px 28px"><span style="display:inline-block;background:#01D2B2;color:#010101;font-weight:bold;font-size:12px;letter-spacing:2px;padding:6px 12px">NEW INQUIRY</span></td></tr>
    <tr><td style="padding:28px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5">
        ${filled
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 0;color:#55575B;width:170px;vertical-align:top">${escape(k)}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:24px 0 8px;color:#55575B;font-size:13px;letter-spacing:1px;text-transform:uppercase">Project description</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escape(inquiry.description)}</p>
      ${studioUrl ? `<p style="margin:28px 0 0"><a href="${escape(studioUrl)}" style="color:#010101">Open in Studio</a></p>` : ''}
    </td></tr>
  </table></td></tr></table></body></html>`

  const { error } = await resend.emails.send({
    from: process.env.INQUIRY_FROM_EMAIL as string,
    to: (process.env.INQUIRY_TO_EMAIL as string).split(',').map((s) => s.trim()),
    replyTo: inquiry.email,
    subject: `New inquiry: ${inquiry.service} (${inquiry.fullName})`,
    text,
    html,
  })
  if (error) throw new Error(`Resend: ${error.name}`)
}
