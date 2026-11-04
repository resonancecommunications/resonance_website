/**
 * All website copy from docs/content-spec.pdf, verbatim, in front-end shapes.
 *
 * - `pnpm seed` writes this into Sanity (scripts/seed.ts).
 * - The site falls back to it only while no Sanity project is configured.
 *
 * Do not edit wording here to "improve" it: the spec is the source of truth.
 * Placeholders from the spec ([Phone], [Office Address], ...) are intentionally empty.
 */
import type {
  AboutPage,
  ContactPage,
  EventService,
  EventsPage,
  HomePage,
  MediaPage,
  Navigation,
  OurWorkPage,
  ProjectCategory,
  Service,
  ServicesPage,
  SiteSettings,
} from './types'

const CONTACT = '/contact'

export const siteSettings: SiteSettings = {
  siteName: 'Resonance Communications',
  tagline: 'Integrated Events, Media & Corporate Communications.',
  description:
    'We bring events, media, creativity, and technology together to help organizations communicate with purpose and create meaningful experiences.',
  footerStatement: 'Resonance Communications. Making Every Experience Resonate.',
  brandLine: 'Magic from the details',
  brandLineOptions: [
    'Magic from the details',
    'The idea is the starting point. Resonance is the force that moves it forward.',
    'Making Every Experience Resonate.',
  ],
  contactEmail: 'communicationsresonance@gmail.com',
  phone: null,
  officeAddress: null,
  location: 'Addis Ababa, Ethiopia',
  // TEMPORARY: network homepages until the real profile URLs are provided. Replace before launch.
  social: {
    linkedin: 'https://www.linkedin.com/',
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
  },
  socialHandle: null,
  seo: {
    titleTemplate: '%s | Resonance Communications',
    description:
      'Resonance Communications is an Ethiopian corporate communications company bringing together events, media production, creative services, and strategic communication. Magic from the details.',
    ogImage: null,
  },
  logos: null,
}

export const navigation: Navigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Contact', href: CONTACT },
  ],
  // Client request (Nov 2026): was "Start a Project" in the spec.
  headerCta: { label: 'Resonate With Us', href: CONTACT, style: 'primary' },
  footer: {
    quickLinksHeading: 'Quick Links',
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Our Work', href: '/our-work' },
      { label: 'Contact', href: CONTACT },
    ],
    contactHeading: 'Contact',
    socialHeading: 'Social Media',
  },
}

/* ---------------- PAGE 01: HOME ---------------- */

export const homePage: HomePage = {
  hero: {
    headline: 'Where Experiences Meet Communication.',
    alternativeHeadlines: [
      'Making Every Experience Resonate.',
      'One Vision. Multiple Experiences. Lasting Impact.',
      'Bringing Ideas, Experiences and Communication Together.',
    ],
    supportingText: [
      'We bring events, media, and strategic communications together to help organizations connect with people, communicate with purpose, and create experiences worth remembering.',
    ],
    primaryCta: { label: 'Explore Our Services', href: '/services', style: 'primary' },
    secondaryCta: { label: 'Start a Conversation', href: CONTACT, style: 'secondary' },
  },
  intro: {
    eyebrow: 'WHO WE ARE',
    headline: 'More Than a Service Provider. Your Integrated Experience Partner.',
    // Client feedback (Nov 2026): keep this short; the full story lives on About Us.
    body: [
      'Resonance Communications is an Ethiopian corporate communications company bringing together events, media production, creative services, and strategic communication.',
    ],
    cta: { label: 'Discover Resonance', href: '/about', style: 'secondary' },
  },
  divisions: {
    eyebrow: 'WHAT WE DO',
    headline: 'Two Divisions. One Integrated Vision.',
    intro:
      'Our work is organized around two complementary divisions, each with specialized capabilities and a shared commitment to quality, creativity, and professional execution.',
    items: [
      {
        key: 'media',
        number: '01',
        title: 'Resonance Media & Communications',
        headline: 'Communication That Connects and Inspires.',
        body: 'We help organizations communicate their identity, ideas, and activities through strategic communication, professional media production, and creative content.',
        servicesLabel: 'Services:',
        services: [
          'Corporate Communications',
          'Media Production',
          'Photography & Videography',
          'Animation & Motion Graphics',
          'Branding & Creative Campaigns',
          'Digital Content & Promotion',
          'Corporate Publications',
          'Creative Technology',
        ],
        cta: {
          label: 'Explore Media & Communications',
          href: '/media-communications',
          style: 'secondary',
        },
      },
      {
        key: 'events',
        number: '02',
        title: 'Resonance Events',
        headline: 'Experiences That Bring People Together.',
        body: 'We plan and produce corporate events that connect organizations with their audiences. From conferences and general assemblies to product launches and large-scale gatherings, we manage the creative and production process behind meaningful live experiences.',
        servicesLabel: 'Services:',
        services: [
          'Corporate Events & Conferences',
          'General Assemblies',
          'Product Launches',
          'Trade Fairs & Exhibitions',
          'Government & Institutional Events',
          'Event Planning & Production',
          'Stage, Venue & Event Branding',
          'Event Documentation',
        ],
        cta: { label: 'Explore Events', href: '/events', style: 'secondary' },
      },
    ],
  },
  approach: {
    eyebrow: 'THE RESONANCE APPROACH',
    headline: 'Everything Works Better When It Works Together.',
    body: [
      'A successful corporate experience extends beyond a single event, video, or campaign.',
      'Resonance connects strategy, creative development, media production, and live experiences to deliver coordinated solutions from the first idea to the final execution.',
      "Whether you are introducing a new product, hosting an annual general assembly, launching a corporate campaign, or strengthening your organization's communication, we bring the relevant capabilities together around your objectives.",
    ],
    processLabel: 'Our integrated process:',
    steps: [
      {
        title: 'Strategy & Planning',
        description: 'Understanding your objectives, audience, and communication needs.',
      },
      {
        title: 'Creative Development',
        description: 'Developing concepts, messaging, visual direction, and campaign ideas.',
      },
      {
        title: 'Media & Production',
        description: 'Producing the visual, audiovisual, and digital materials needed.',
      },
      {
        title: 'Experience & Activation',
        description: 'Bringing ideas to life through events and audience engagement.',
      },
      {
        title: 'Amplification',
        description: 'Extending the experience through digital content and communication.',
      },
      {
        title: 'Evaluation',
        description: 'Reviewing project outcomes and identifying opportunities for improvement.',
      },
    ],
    cta: { label: "Let's Build Something Together", href: CONTACT, style: 'primary' },
  },
  clients: {
    eyebrow: 'OUR CLIENTS',
    headline: 'Supporting Organizations That Move People and Ideas Forward.',
    body: 'We work with organizations across different sectors, delivering communication, media, creative, and event solutions aligned with their institutional goals.',
    sectorsLabel: 'Sectors:',
    // Titles from the spec; descriptions are draft copy added for client review (Nov 2026).
    sectors: [
      {
        title: 'Corporate & Private Sector',
        description:
          'Launches, corporate events and communication that reflect how a company wants to be seen.',
        icon: 'corporate',
      },
      {
        title: 'Financial Institutions & SACCOS',
        description:
          'General assemblies, member communication and campaigns built on clarity and trust.',
        icon: 'finance',
      },
      {
        title: 'Government Institutions',
        description: 'Formal and public-facing events and communication, delivered with care.',
        icon: 'government',
      },
      {
        title: 'Non-Governmental Organizations',
        description:
          'Campaigns, documentation and events that make programs and their impact visible.',
        icon: 'ngo',
      },
      {
        title: 'Growing Businesses & SMEs',
        description: 'Branding, content and launches that help growing organizations get noticed.',
        icon: 'growth',
      },
    ],
  },
  // Sister companies of the holding group. Hidden on the site until logos are added in Sanity.
  partners: {
    eyebrow: 'OUR GROUP',
    headline: 'Sister Companies',
    intro: null,
    logos: [],
  },
  featuredWork: {
    eyebrow: 'SELECTED PROJECTS',
    headline: 'Ideas Into Experiences. Vision Into Reality.',
    body: 'Explore selected projects demonstrating our approach to events, media production, creative development, and integrated communication.',
    cta: { label: 'View Our Work', href: '/our-work', style: 'secondary' },
  },
  closingCta: {
    headline: "Let's Make Your Next Project Resonate.",
    body: 'Whether you need a professional event, a creative media production, or an integrated communication solution, our team is ready to understand your vision and help bring it to life.',
    primaryCta: { label: 'Resonate With Us', href: CONTACT, style: 'primary' },
    secondaryCta: {
      label: 'Contact Us',
      href: `${CONTACT}#contact-information`,
      style: 'secondary',
    },
  },
}

/* ---------------- PAGE 02: ABOUT US ---------------- */

export const aboutPage: AboutPage = {
  hero: {
    eyebrow: 'About Us',
    headline: 'Communication With Purpose. Experiences With Meaning.',
    supportingText: [
      'We are Resonance Communications, an integrated corporate communications company bringing together events, media, creativity, and technology to help organizations communicate and connect more effectively.',
    ],
  },
  overview: {
    eyebrow: 'Company Overview',
    headline: 'One Company. Connected Capabilities.',
    body: [
      'Resonance Communications is an independent Ethiopian private limited company established with a vision to deliver integrated corporate communication and experience solutions.',
      'Our business brings together two principal divisions, Resonance Events and Resonance Media & Communications.',
      'Through these divisions, we provide organizations with access to professional event management, media production, corporate communication, creative development, and digital content services.',
      'Our integrated structure allows us to approach client needs from multiple perspectives, connecting the message, the medium, and the experience into a coordinated solution.',
    ],
  },
  vision: {
    eyebrow: 'Our Vision',
    headline: 'Building a Recognized Name in Corporate Experiences and Communications.',
    body: [
      'To become a highly respected Ethiopian company recognized for excellence in integrated events, media, and corporate communications, with a growing presence across selected African markets.',
    ],
  },
  mission: {
    eyebrow: 'Our Mission',
    headline: 'Making Organizational Communication More Meaningful.',
    body: [
      'To help organizations communicate effectively and create meaningful experiences by combining strategic thinking, creative excellence, professional production, and technology-driven solutions.',
    ],
  },
  philosophy: {
    eyebrow: 'Our Philosophy',
    headline: 'Connected Thinking. Consistent Execution.',
    body: [
      'We believe that effective communication requires more than individual creative outputs. Every event, campaign, publication, and media production contributes to how an organization is experienced and remembered.',
      "Our approach connects these elements through a shared understanding of the client's objectives, audience, and identity.",
      'We prioritize thoughtful planning, coordinated execution, and quality at every stage of our work.',
    ],
  },
  values: {
    eyebrow: 'Our Values',
    items: [
      {
        title: 'Purpose',
        description:
          'We approach every project with a clear understanding of its objectives and intended impact.',
      },
      {
        title: 'Creativity',
        description:
          'We bring fresh perspectives and thoughtful creative solutions to organizational challenges.',
      },
      {
        title: 'Professionalism',
        description: 'We value preparation, accountability, collaboration, and quality execution.',
      },
      {
        title: 'Innovation',
        description:
          'We embrace emerging technologies and creative methods to improve the way organizations communicate.',
      },
      {
        title: 'Collaboration',
        description:
          'We believe meaningful results come from strong partnerships with clients, creative professionals, and production specialists.',
      },
      {
        title: 'Excellence',
        description:
          'We are committed to delivering work that reflects the standards and ambitions of the organizations we serve.',
      },
    ],
  },
  approach: {
    eyebrow: 'Our Approach',
    headline: 'From Individual Services to Integrated Solutions.',
    body: [
      'Every organization has different communication needs. Some require a single event or production. Others need continuous communication support or multiple services working together.',
      'We begin by understanding the objective, then bring together the appropriate people, creative capabilities, and production resources to deliver a coordinated solution.',
    ],
    cta: { label: 'Explore Our Services', href: '/services', style: 'primary' },
  },
}

/* ---------------- PAGE 03: SERVICES ---------------- */

export const servicesPage: ServicesPage = {
  hero: {
    eyebrow: 'Services',
    headline: 'Everything Your Organization Needs to Communicate and Connect.',
    supportingText: [
      'From corporate events and media production to strategic communications and creative technology, Resonance offers connected capabilities designed to support organizations at every stage of their communication journey.',
    ],
  },
  portfolio: { eyebrow: 'Our Service Portfolio', navLabel: 'Our Service Portfolio' },
  closing: {
    statement: 'One objective. Multiple capabilities. A coordinated Resonance experience.',
    cta: { label: 'Discuss Your Project', href: CONTACT, style: 'primary' },
  },
}

const SERVICES_LIST_LABEL = 'Our services include:'

export const services: Omit<Service, '_id'>[] = [
  {
    order: 1,
    title: 'Corporate Events & Event Production',
    slug: 'corporate-events-and-event-production',
    summary:
      'We plan, coordinate, and produce professional corporate events that bring organizations, stakeholders, and audiences together.',
    listLabel: 'Our event services include:',
    items: [
      'Corporate conferences and summits',
      'Annual general assemblies',
      'Financial-sector events',
      'Government and NGO events',
      'Trade fairs and exhibitions',
      'Product and service launches',
      'National and international events',
      'Event production and coordination',
      'Stage and venue branding',
      'Event documentation',
    ],
  },
  {
    order: 2,
    title: 'Corporate Communications',
    slug: 'corporate-communications',
    summary:
      'We help organizations develop and maintain consistent communication through strategic planning, messaging, content development, and communication support.',
    listLabel: SERVICES_LIST_LABEL,
    items: [
      'Corporate communication planning',
      'Communication strategy and messaging',
      'Content calendars and planning',
      'Corporate communication materials',
      'Campaign planning and support',
      'Organizational announcements and publications',
      'Communication consultation',
      'Communication reporting',
    ],
  },
  {
    order: 3,
    title: 'Media Production',
    slug: 'media-production',
    summary:
      'We create professional audiovisual content that documents, communicates, and promotes organizational activities.',
    listLabel: SERVICES_LIST_LABEL,
    items: [
      'Corporate video production',
      'Promotional and advertising videos',
      'Corporate photography',
      'Event photography and videography',
      'Video editing and post-production',
      'Corporate documentaries',
      'Promotional content',
      'Media content libraries',
    ],
  },
  {
    order: 4,
    title: 'Animation & Creative Media',
    slug: 'animation-and-creative-media',
    summary:
      'We use animation and creative production techniques to communicate ideas, explain complex information, and create engaging visual content.',
    listLabel: SERVICES_LIST_LABEL,
    items: [
      '2D animation',
      '3D animation',
      'Motion graphics',
      'Explainer videos',
      'Animated promotional content',
      'AI-assisted creative production',
      'Technology-enabled creative projects',
    ],
  },
  {
    order: 5,
    title: 'Branding & Creative Campaigns',
    slug: 'branding-and-creative-campaigns',
    summary:
      'We develop creative concepts and visual communication materials that help organizations present their identity consistently across different platforms and experiences.',
    listLabel: SERVICES_LIST_LABEL,
    items: [
      'Campaign concept development',
      'Visual communication systems',
      'Graphic design',
      'Corporate and event branding',
      'Campaign design assets',
      'Promotional materials',
      'Creative direction',
    ],
  },
  {
    order: 6,
    title: 'Digital Content & Promotion',
    slug: 'digital-content-and-promotion',
    summary:
      'We develop digital communication materials designed to support organizational visibility, promotional activities, and audience engagement.',
    listLabel: SERVICES_LIST_LABEL,
    items: [
      'Short-form digital content',
      'Social media creative materials',
      'Digital promotional campaigns',
      'Corporate communication assets',
      'Post-event content',
      'Digital campaign materials',
    ],
  },
  {
    order: 7,
    title: 'Corporate Publications & Magazines',
    slug: 'corporate-publications-and-magazines',
    summary:
      'We support organizations in developing professional publications that communicate their activities, achievements, knowledge, and institutional identity.',
    listLabel: SERVICES_LIST_LABEL,
    items: [
      'Corporate magazine design',
      'Editorial layout and design',
      'Publication content development',
      'Publication production',
      'Institutional reports and communication materials',
    ],
  },
  {
    order: 8,
    title: 'Integrated Campaigns & Experiences',
    slug: 'integrated-campaigns-and-experiences',
    summary:
      'We bring multiple services together to develop coordinated campaigns and corporate experiences.',
    listLabel: 'Depending on project objectives, an integrated engagement may include:',
    items: [
      'Communication strategy',
      'Campaign concept and creative direction',
      'Branding and visual development',
      'Video and photography production',
      'Animation and digital content',
      'Event planning and production',
      'Live activation',
      'Post-event communication',
      'Campaign reporting',
    ],
  },
]

/* ---------------- PAGE 04: RESONANCE EVENTS ---------------- */

const EVENT_INQUIRY = `${CONTACT}?service=${encodeURIComponent('Corporate Events')}`

export const eventsPage: EventsPage = {
  hero: {
    eyebrow: 'Resonance Events',
    headline: 'Creating Experiences That Bring People Together.',
    supportingText: [
      'We plan and produce professional events that connect organizations with their audiences, communicate important ideas, and create meaningful shared experiences.',
      'From corporate conferences and institutional gatherings to product launches and exhibitions, Resonance Events brings planning, creativity, coordination, and production together.',
    ],
    primaryCta: { label: 'Plan Your Event With Us', href: EVENT_INQUIRY, style: 'primary' },
  },
  whatWeDo: {
    eyebrow: 'What We Do',
    headline: 'Every Detail. One Coordinated Experience.',
    body: [
      'Successful events require more than a venue and a program. They require thoughtful planning, clear coordination, creative direction, and professional execution.',
      'Our team approaches every event with attention to its objectives, audience, format, and production requirements.',
    ],
  },
  eventServices: { eyebrow: 'Event Services' },
  capabilities: {
    eyebrow: 'Event Production Capabilities',
    items: [
      'Event concept development',
      'Planning and coordination',
      'Program and production management',
      'Venue and stage arrangements',
      'Stage design and branding',
      'Audiovisual production coordination',
      'Event branding and visual materials',
      'Photography and videography',
      'Live event documentation',
      'Post-event media production',
    ],
  },
  integrated: {
    eyebrow: 'Integrated Event Experience',
    headline: 'The Event Is Only One Part of the Experience.',
    body: [
      'Through our connection with Resonance Media & Communications, we extend event projects beyond the live experience.',
      'From pre-event promotional campaigns and visual materials to live documentation and post-event content, we bring communication and production capabilities together throughout the event lifecycle.',
    ],
    cta: {
      label: 'Explore Integrated Solutions',
      href: '/services#integrated-campaigns-and-experiences',
      style: 'secondary',
    },
  },
  closingCta: {
    headline: 'Have an Event in Mind?',
    body: "Let's discuss your objectives, audience, and production requirements.",
    primaryCta: { label: 'Start Planning Your Event', href: EVENT_INQUIRY, style: 'primary' },
  },
  crossLink: {
    eyebrow: 'Our Divisions',
    title: 'Resonance Media & Communications',
    headline: 'Communication That Connects and Inspires.',
    cta: {
      label: 'Explore Media & Communications',
      href: '/media-communications',
      style: 'secondary',
    },
  },
}

export const eventServices: Omit<EventService, '_id'>[] = [
  {
    order: 1,
    title: 'Corporate Conferences & Summits',
    description:
      'Professional event planning and production for conferences, business forums, leadership gatherings, and institutional meetings.',
  },
  {
    order: 2,
    title: 'Annual General Assemblies',
    description:
      'Coordinated event solutions for annual assemblies, shareholder meetings, member gatherings, and institutional proceedings.',
  },
  {
    order: 3,
    title: 'Product & Service Launches',
    description:
      'Launch experiences designed to introduce products and services through coordinated communication, creative production, and live engagement.',
  },
  {
    order: 4,
    title: 'Trade Fairs & Exhibitions',
    description:
      'Planning and production support for exhibitions, trade events, industry showcases, and promotional experiences.',
  },
  {
    order: 5,
    title: 'Government & Institutional Events',
    description:
      'Event solutions supporting government institutions, NGOs, and organizations with formal and public-facing engagements.',
  },
  {
    order: 6,
    title: 'National & International Events',
    description:
      'Production and coordination support for events involving multiple stakeholders, partners, and audiences.',
  },
]

/* ---------------- PAGE 05: RESONANCE MEDIA & COMMUNICATIONS ---------------- */

export const mediaPage: MediaPage = {
  hero: {
    eyebrow: 'Resonance Media & Communications',
    headline: 'Stories, Ideas and Messages That Connect.',
    supportingText: [
      'We help organizations communicate their identity, share their stories, and connect with audiences through strategic communication, professional media production, and creative solutions.',
      'From corporate videos and photography to animation, branding, and digital campaigns, we bring communication ideas to life.',
    ],
    primaryCta: {
      label: 'Discuss Your Communication Needs',
      href: `${CONTACT}?service=${encodeURIComponent('Corporate Communications')}`,
      style: 'primary',
    },
  },
  sections: [
    {
      eyebrow: 'Corporate Communications',
      headline: 'Clear Communication. Consistent Identity.',
      body: [
        'We support organizations in planning and delivering effective communication across their institutional and corporate activities.',
        'Our work connects messaging, content, creative development, and communication planning to help organizations maintain a consistent voice.',
      ],
      listLabel: 'Services:',
      items: [
        'Communication planning',
        'Messaging development',
        'Corporate content calendars',
        'Institutional communication materials',
        'Campaign planning',
        'Communication consultation',
        'Performance and activity reporting',
      ],
    },
    {
      eyebrow: 'Media Production',
      headline: 'Turning Organizational Stories Into Visual Experiences.',
      body: [
        'We produce professional media content to document activities, communicate ideas, and promote organizational initiatives.',
      ],
      listLabel: 'Services:',
      items: [
        'Corporate video production',
        'Photography',
        'Videography',
        'Promotional videos',
        'Corporate documentaries',
        'Event documentation',
        'Video editing and post-production',
      ],
    },
    {
      eyebrow: 'Animation & Creative Media',
      headline: 'Communicating Ideas Beyond Words.',
      body: [
        'We combine storytelling, motion, and visual creativity to make information more engaging and accessible.',
      ],
      listLabel: 'Services:',
      items: [
        '2D animation',
        '3D animation',
        'Motion graphics',
        'Explainer animations',
        'Promotional animation',
        'AI-assisted visual production',
      ],
    },
    {
      eyebrow: 'Branding & Creative Campaigns',
      headline: 'Creative Direction With a Consistent Purpose.',
      body: [
        'We develop creative concepts and visual communication materials that support organizational identity, campaigns, and promotional activities.',
      ],
      listLabel: 'Services:',
      items: [
        'Campaign concepts',
        'Creative direction',
        'Graphic design',
        'Visual communication',
        'Event branding',
        'Campaign assets',
        'Promotional materials',
      ],
    },
    {
      eyebrow: 'Digital Content & Promotion',
      headline: 'Communication That Extends Beyond Traditional Media.',
      body: [
        'We develop digital content that helps organizations maintain visibility, communicate activities, and engage their audiences.',
      ],
      listLabel: 'Services:',
      items: [
        'Social media content',
        'Short-form videos',
        'Digital promotional materials',
        'Campaign content',
        'Post-event content',
        'Corporate digital assets',
      ],
    },
    {
      eyebrow: 'Corporate Publications',
      headline: 'Giving Organizational Stories a Lasting Format.',
      body: [
        'We support the development and production of corporate magazines and institutional publications that present organizational activities, milestones, insights, and achievements.',
      ],
      listLabel: 'Services:',
      items: [
        'Magazine design',
        'Editorial layout',
        'Publication design',
        'Content development',
        'Publication production',
      ],
    },
    {
      eyebrow: 'Creative Technology',
      headline: 'Where Creativity Meets Emerging Technology.',
      body: [
        'We explore the application of emerging technologies and modern production techniques to create more engaging, efficient, and innovative communication experiences.',
      ],
      listLabel: 'Our capabilities include:',
      items: [
        'AI-assisted creative production',
        '3D-enabled visual content',
        'Technology-driven animation',
        'Advanced digital creative production',
      ],
    },
  ],
  closingCta: {
    headline: "Let's Give Your Message the Attention It Deserves.",
    body: 'Whether you need a single production or ongoing communication support, we are ready to discuss your next project.',
    primaryCta: { label: 'Start a Conversation', href: CONTACT, style: 'primary' },
  },
  crossLink: {
    eyebrow: 'Our Divisions',
    title: 'Resonance Events',
    headline: 'Experiences That Bring People Together.',
    cta: { label: 'Explore Events', href: '/events', style: 'secondary' },
  },
}

/* ---------------- PAGE 06: OUR WORK ---------------- */

export const ourWorkPage: OurWorkPage = {
  hero: {
    eyebrow: 'Our Work',
    headline: 'The Work Speaks. The Experience Resonates.',
    supportingText: [
      'Every project starts with an objective and takes shape through collaboration, creativity, and execution.',
      'Explore selected work across our event, media, communication, and creative capabilities.',
    ],
  },
  categoriesEyebrow: 'Portfolio Categories',
  // UI microcopy (not in the spec): editable in Sanity.
  allLabel: 'All',
  emptyState: {
    headline: 'Selected projects coming soon.',
    body: 'We are preparing a curated selection of client-approved work. In the meantime, we would be glad to discuss your project.',
  },
  projectLabels: {
    client: 'Client',
    serviceCategory: 'Service Category',
    overview: 'Overview',
    objective: 'The Objective',
    approach: 'Our Approach',
    contribution: 'Our Contribution',
    outcome: 'The Outcome',
    gallery: 'Project Gallery',
    previous: 'Previous project',
    next: 'Next project',
    backToWork: 'All work',
  },
  // The spec gives Our Work no closing CTA; this reuses the Home closing CTA copy.
  closingCta: homePage.closingCta,
}

export const projectCategories: Omit<ProjectCategory, '_id'>[] = [
  { title: 'Events & Experiences', slug: 'events-and-experiences' },
  { title: 'Corporate Media Production', slug: 'corporate-media-production' },
  { title: 'Photography & Videography', slug: 'photography-and-videography' },
  { title: 'Animation & Motion Graphics', slug: 'animation-and-motion-graphics' },
  { title: 'Branding & Creative Campaigns', slug: 'branding-and-creative-campaigns' },
  { title: 'Digital Content', slug: 'digital-content' },
  { title: 'Corporate Publications', slug: 'corporate-publications' },
  { title: 'Integrated Campaigns', slug: 'integrated-campaigns' },
]

/* ---------------- PAGE 07: CONTACT ---------------- */

export const contactPage: ContactPage = {
  hero: {
    eyebrow: 'Contact',
    headline: 'Every Great Project Starts With a Conversation.',
    supportingText: [
      'Whether you are planning a corporate event, developing a communication campaign, producing media content, or looking for an integrated creative partner, we would like to hear from you.',
      "Tell us what you have in mind. Let's explore how we can work together.",
    ],
  },
  info: {
    eyebrow: 'Contact Information',
    generalInquiriesLabel: 'General Inquiries',
    phoneLabel: 'Phone',
    officeAddressLabel: 'Office Address',
    locationLabel: 'Location',
  },
  form: {
    headline: 'Tell Us About Your Project.',
    labels: {
      fullName: 'Full Name',
      organization: 'Organization',
      email: 'Email Address',
      phone: 'Phone Number',
      service: 'Service of Interest',
      description: 'Project Description',
    },
    servicePlaceholder: 'Select a service',
    serviceOptions: [
      'Corporate Events',
      'Media Production',
      'Corporate Communications',
      'Animation & Creative Media',
      'Branding & Creative Campaigns',
      'Digital Content & Promotion',
      'Corporate Publications',
      'Integrated Campaigns',
      'Other',
    ],
    submitLabel: 'Send Inquiry',
    responseNote: null,
    successMessage: "Thank you. We've received your inquiry and will be in touch.",
    errorMessage: 'Your inquiry could not be sent. Please try again, or email us directly.',
  },
  closingStatement: "Let's create something meaningful together.",
}
