import { z } from 'zod'
import { strings } from '@/lib/strings'

const e = strings.form.errors

/** Inquiry form schema, shared by the client form and /api/inquiry. */
export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, e.fullName).max(120, e.tooLong),
  organization: z.string().trim().max(160, e.tooLong).optional().or(z.literal('')),
  email: z.string().trim().max(200, e.tooLong).pipe(z.email(e.email)),
  phone: z
    .string()
    .trim()
    .max(40, e.tooLong)
    .refine((v) => v === '' || /^\+?[\d\s().-]{7,}$/.test(v), e.phone)
    .optional(),
  service: z.string().trim().min(1, e.service).max(80, e.tooLong),
  description: z.string().trim().min(20, e.description).max(5000, e.tooLong),
  /** Honeypot: hidden from people, filled in by bots. Checked (silently) by the API. */
  website: z.string().max(500).optional(),
})

export type InquiryInput = z.input<typeof inquirySchema>
export type Inquiry = z.output<typeof inquirySchema>
