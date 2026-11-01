'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import { ArrowGlyph } from '@/components/ui/CtaLink'
import type { ContactPage } from '@/content/types'
import { strings } from '@/lib/strings'
import { cn } from '@/lib/utils'
import { inquirySchema, type Inquiry, type InquiryInput } from '@/lib/validators/inquiry'

type Status = { type: 'idle' } | { type: 'success' } | { type: 'error'; message: string }

type FieldProps = {
  id: string
  label: string
  required?: boolean
  error?: FieldError
  children: ReactNode
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-sm font-medium">
        <span>{label}</span>
        <span className="text-xs font-normal text-muted-light">
          {required ? (
            <span aria-hidden="true">{strings.form.required}</span>
          ) : (
            strings.form.optional
          )}
        </span>
      </label>
      <div className="mt-2">{children}</div>
      {error?.message ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-sm text-ink">
          <span aria-hidden="true" className="inline-block size-1.5 shrink-0 rounded-full bg-ink" />
          {error.message}
        </p>
      ) : null}
    </div>
  )
}

const control =
  'block w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-muted-light hover:border-ink/40 focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-teal aria-[invalid=true]:border-ink aria-[invalid=true]:bg-teal-pale/40'

/** Inquiry form: client validation with the same zod schema the API uses. */
export function InquiryForm({ form }: { form: ContactPage['form'] }) {
  const uid = useId()
  const statusRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      service: '',
      description: '',
      website: '',
    },
    mode: 'onTouched',
  })

  // Preselect the service from links like /contact?service=Corporate%20Events.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('service')
    if (requested && form.serviceOptions.includes(requested)) setValue('service', requested)
  }, [form.serviceOptions, setValue])

  async function onSubmit(values: Inquiry) {
    setStatus({ type: 'idle' })
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        fields?: Partial<Record<keyof Inquiry, string[]>>
      }
      if (!res.ok) {
        for (const [name, messages] of Object.entries(data.fields ?? {})) {
          if (messages?.[0]) setError(name as keyof Inquiry, { message: messages[0] })
        }
        setStatus({ type: 'error', message: data.error || form.errorMessage })
      } else {
        reset()
        setStatus({ type: 'success' })
      }
    } catch {
      setStatus({ type: 'error', message: form.errorMessage })
    }
  }

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status.type !== 'idle') statusRef.current?.focus()
  }, [status])

  const id = (name: string) => `${uid}-${name}`
  const describe = (name: keyof Inquiry) => (errors[name] ? `${id(name)}-error` : undefined)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div
        ref={statusRef}
        tabIndex={-1}
        role={status.type === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className="outline-none empty:hidden"
      >
        {status.type === 'success' ? (
          <p className="flex items-start gap-3 rounded-xl bg-ink p-5 text-paper">
            <span aria-hidden="true" className="mt-2 h-0.5 w-4 shrink-0 bg-teal" />
            {form.successMessage}
          </p>
        ) : null}
        {status.type === 'error' ? (
          <p className="rounded-xl border border-ink p-5 text-ink">{status.message}</p>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('fullName')} label={form.labels.fullName} required error={errors.fullName}>
          <input
            id={id('fullName')}
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describe('fullName')}
            className={control}
            {...register('fullName')}
          />
        </Field>
        <Field id={id('organization')} label={form.labels.organization} error={errors.organization}>
          <input
            id={id('organization')}
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={describe('organization')}
            className={control}
            {...register('organization')}
          />
        </Field>
        <Field id={id('email')} label={form.labels.email} required error={errors.email}>
          <input
            id={id('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe('email')}
            className={control}
            {...register('email')}
          />
        </Field>
        <Field id={id('phone')} label={form.labels.phone} error={errors.phone}>
          <input
            id={id('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describe('phone')}
            className={control}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field id={id('service')} label={form.labels.service} required error={errors.service}>
        <div className="relative">
          <select
            id={id('service')}
            aria-required="true"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describe('service')}
            className={cn(control, 'appearance-none pr-12')}
            {...register('service')}
          >
            <option value="" disabled>
              {form.servicePlaceholder}
            </option>
            {form.serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className="pointer-events-none absolute top-1/2 right-4 h-2 w-3 -translate-y-1/2"
          >
            <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </Field>

      <Field
        id={id('description')}
        label={form.labels.description}
        required
        error={errors.description}
      >
        <textarea
          id={id('description')}
          rows={6}
          aria-required="true"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={describe('description')}
          className={cn(control, 'resize-y')}
          {...register('description')}
        />
      </Field>

      {/* Honeypot: visually hidden and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input
          id={id('website')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-ink px-8 font-display font-semibold text-paper transition-colors hover:bg-surface-raised disabled:cursor-wait disabled:opacity-70"
        >
          <span>{isSubmitting ? strings.form.sending : form.submitLabel}</span>
          <ArrowGlyph className="text-teal" />
        </button>
        {form.responseNote ? <p className="text-sm text-muted-light">{form.responseNote}</p> : null}
      </div>
    </form>
  )
}
