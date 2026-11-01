/**
 * Interface microcopy that is not part of the content spec.
 * Kept in one place so an Amharic dictionary can be added alongside it later.
 * Voice: clear, quiet, confident, precise.
 */
export const strings = {
  skipToContent: 'Skip to content',
  mainNavigation: 'Main navigation',
  footerNavigation: 'Footer',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  home: 'Resonance Communications, home',
  copyright: (year: number, name: string) => `© ${year} ${name}. All Rights Reserved.`,
  social: {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    instagram: 'Instagram',
    youtube: 'YouTube',
  },
  form: {
    required: 'Required',
    optional: 'Optional',
    sending: 'Sending',
    errors: {
      fullName: 'Please enter your full name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      service: 'Please select a service.',
      description: 'Please describe your project in a few sentences.',
      tooLong: 'This is longer than we can accept.',
      rateLimited: 'Too many submissions. Please wait a few minutes and try again.',
    },
  },
  gallery: {
    open: (label: string) => `Open image: ${label}`,
    close: 'Close',
    previous: 'Previous image',
    next: 'Next image',
    counter: (current: number, total: number) => `${current} of ${total}`,
    watch: (title: string) => `Watch video: ${title}`,
  },
  work: {
    filterLabel: 'Filter projects by category',
    showing: (count: number) => (count === 1 ? '1 project' : `${count} projects`),
    noneInCategory: 'No projects in this category yet.',
  },
  notFound: {
    eyebrow: 'Error 404',
    headline: 'This page could not be found.',
    body: 'The link may be outdated, or the page may have moved.',
    cta: 'Return home',
  },
  preview: {
    banner: 'Draft preview',
    exit: 'Exit preview',
  },
} as const
