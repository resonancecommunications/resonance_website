/**
 * Front-end content shapes. GROQ queries (src/sanity/lib/queries.ts) project Sanity
 * documents into exactly these shapes, and src/content/defaults.ts provides the
 * spec copy in the same shapes for seeding and for running without a CMS.
 */

export type CtaStyle = 'primary' | 'secondary'

export type Cta = {
  label: string
  href: string
  style?: CtaStyle
}

export type NavItem = {
  label: string
  href: string
}

export type ImageTreatment = 'blackAndWhite' | 'fullColor' | 'tealOverlay'

export type BrandImage = {
  asset: {
    _id: string
    url: string
    metadata?: {
      lqip?: string | null
      dimensions?: { width: number; height: number } | null
    } | null
  }
  crop?: { top: number; bottom: number; left: number; right: number } | null
  hotspot?: { x: number; y: number; width: number; height: number } | null
  alt: string
  caption?: string | null
  treatment?: ImageTreatment | null
  overlayOpacity?: number | null
}

export type GalleryVideo = {
  _type: 'galleryVideo'
  _key: string
  url: string
  title: string
  caption?: string | null
}

export type GalleryImage = BrandImage & { _type: 'brandImage'; _key: string }

export type GalleryItem = GalleryImage | GalleryVideo

export type Seo = {
  title?: string | null
  description?: string | null
  ogImage?: BrandImage | null
  noIndex?: boolean | null
}

export type TextSection = {
  eyebrow?: string | null
  headline: string
  body: string[]
  cta?: Cta | null
}

export type CtaBanner = {
  headline: string
  body?: string | null
  primaryCta: Cta
  secondaryCta?: Cta | null
}

export type CrossLink = {
  eyebrow: string
  title: string
  headline: string
  cta: Cta
}

/* ---------- Global ---------- */

export type SiteSettings = {
  siteName: string
  tagline: string
  description: string
  footerStatement: string
  brandLine: string
  brandLineOptions: string[]
  contactEmail: string
  phone?: string | null
  officeAddress?: string | null
  location: string
  social: {
    linkedin?: string | null
    facebook?: string | null
    instagram?: string | null
    tiktok?: string | null
  }
  socialHandle?: string | null
  seo: {
    titleTemplate: string
    description: string
    ogImage?: BrandImage | null
  }
  logos?: {
    horizontal?: string | null
    vertical?: string | null
    symbol?: string | null
    mini?: string | null
    bw?: string | null
    bwInverted?: string | null
  } | null
}

export type Navigation = {
  main: NavItem[]
  headerCta: Cta
  footer: {
    quickLinksHeading: string
    quickLinks: NavItem[]
    contactHeading: string
    socialHeading: string
  }
}

/* ---------- Pages ---------- */

export type Hero = {
  /** Short label shown in the hero Carrier (e.g. the page name). */
  eyebrow?: string | null
  headline: string
  alternativeHeadlines?: string[] | null
  supportingText?: string[] | null
  primaryCta?: Cta | null
  secondaryCta?: Cta | null
  image?: BrandImage | null
}

export type Division = {
  key: 'events' | 'media'
  number: string
  title: string
  headline: string
  body: string
  servicesLabel: string
  services: string[]
  cta: Cta
}

export type ProcessStep = {
  title: string
  description: string
}

export type SectorIcon = 'corporate' | 'finance' | 'government' | 'ngo' | 'growth'

export type SectorItem = {
  title: string
  description: string
  icon: SectorIcon
}

export type PartnerLogo = {
  _key: string
  name: string
  url?: string | null
  logo?: {
    asset: {
      url: string
      metadata?: { dimensions?: { width: number; height: number } | null } | null
    }
  } | null
}

export type ValueItem = {
  title: string
  description: string
}

export type HomePage = {
  hero: Hero
  intro: TextSection
  divisions: {
    eyebrow: string
    headline: string
    intro: string
    items: Division[]
  }
  approach: TextSection & {
    processLabel: string
    steps: ProcessStep[]
  }
  clients: {
    eyebrow: string
    headline: string
    body: string
    sectorsLabel: string
    sectors: SectorItem[]
  }
  partners: {
    eyebrow: string
    headline: string
    intro?: string | null
    logos: PartnerLogo[]
  }
  featuredWork: {
    eyebrow: string
    headline: string
    body: string
    cta: Cta
  }
  closingCta: CtaBanner
  seo?: Seo | null
}

export type AboutPage = {
  hero: Hero
  overview: TextSection
  vision: TextSection
  mission: TextSection
  philosophy: TextSection
  values: {
    eyebrow: string
    items: ValueItem[]
  }
  approach: TextSection
  seo?: Seo | null
}

export type Service = {
  _id: string
  title: string
  slug: string
  order: number
  summary: string
  listLabel: string
  items: string[]
  icon?: string | null
}

export type ServicesPage = {
  hero: Hero
  portfolio: { eyebrow: string; navLabel: string }
  closing: { statement: string; cta: Cta }
  seo?: Seo | null
}

export type EventService = {
  _id: string
  title: string
  order: number
  description: string
}

export type EventsPage = {
  hero: Hero
  whatWeDo: TextSection
  eventServices: { eyebrow: string }
  capabilities: { eyebrow: string; items: string[] }
  integrated: TextSection
  closingCta: CtaBanner
  crossLink: CrossLink
  seo?: Seo | null
}

export type CapabilitySection = {
  eyebrow: string
  headline: string
  body: string[]
  listLabel: string
  items: string[]
}

export type MediaPage = {
  hero: Hero
  sections: CapabilitySection[]
  closingCta: CtaBanner
  crossLink: CrossLink
  seo?: Seo | null
}

export type ProjectCategory = {
  _id: string
  title: string
  slug: string
}

export type ProjectSummary = {
  _id: string
  title: string
  slug: string
  client?: string | null
  category?: ProjectCategory | null
  coverImage?: BrandImage | null
  overview?: string | null
}

export type Project = ProjectSummary & {
  division?: 'events' | 'media' | 'integrated' | null
  date?: string | null
  objective?: string | null
  approach?: string | null
  contribution?: string | null
  outcome?: string | null
  gallery?: GalleryItem[] | null
  seo?: Seo | null
  previous?: { title: string; slug: string } | null
  next?: { title: string; slug: string } | null
}

export type OurWorkPage = {
  hero: Hero
  categoriesEyebrow: string
  allLabel: string
  emptyState: { headline: string; body: string }
  projectLabels: {
    client: string
    serviceCategory: string
    overview: string
    objective: string
    approach: string
    contribution: string
    outcome: string
    gallery: string
    previous: string
    next: string
    backToWork: string
  }
  closingCta: CtaBanner
  seo?: Seo | null
}

export type ContactPage = {
  hero: Hero
  info: {
    eyebrow: string
    generalInquiriesLabel: string
    phoneLabel: string
    officeAddressLabel: string
    locationLabel: string
  }
  form: {
    headline: string
    labels: {
      fullName: string
      organization: string
      email: string
      phone: string
      service: string
      description: string
    }
    servicePlaceholder: string
    serviceOptions: string[]
    submitLabel: string
    responseNote?: string | null
    successMessage: string
    errorMessage: string
  }
  closingStatement: string
  seo?: Seo | null
}
