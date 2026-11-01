import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

const page = (title: string, href: string) => defineLocations({ locations: [{ title, href }] })

/** Maps documents to the routes that render them, for Presentation (live preview). */
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    { route: '/', filter: `_type == "homePage"` },
    { route: '/about', filter: `_type == "aboutPage"` },
    { route: '/services', filter: `_type == "servicesPage"` },
    { route: '/events', filter: `_type == "eventsPage"` },
    { route: '/media-communications', filter: `_type == "mediaPage"` },
    { route: '/our-work', filter: `_type == "ourWorkPage"` },
    { route: '/our-work/:slug', filter: `_type == "project" && slug.current == $slug` },
    { route: '/contact', filter: `_type == "contactPage"` },
  ]),
  locations: {
    homePage: page('Home', '/'),
    aboutPage: page('About Us', '/about'),
    servicesPage: page('Services', '/services'),
    service: page('Services', '/services'),
    eventsPage: page('Resonance Events', '/events'),
    eventService: page('Resonance Events', '/events'),
    mediaPage: page('Media & Communications', '/media-communications'),
    ourWorkPage: page('Our Work', '/our-work'),
    projectCategory: page('Our Work', '/our-work'),
    contactPage: page('Contact', '/contact'),
    project: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Project', href: `/our-work/${doc?.slug}` },
          { title: 'Our Work', href: '/our-work' },
        ],
      }),
    }),
  },
}
