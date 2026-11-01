import type { StructureBuilder, StructureResolver } from 'sanity/structure'

function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

function ordered(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.documentTypeList(type)
        .title(title)
        .defaultOrdering([{ field: 'order', direction: 'asc' }]),
    )
}

/** Studio sidebar: settings, pages, then collections, with singletons opened directly. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Site settings'),
      singleton(S, 'navigation', 'Navigation'),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'homePage', 'Home'),
              singleton(S, 'aboutPage', 'About Us'),
              singleton(S, 'servicesPage', 'Services'),
              singleton(S, 'eventsPage', 'Resonance Events'),
              singleton(S, 'mediaPage', 'Media & Communications'),
              singleton(S, 'ourWorkPage', 'Our Work'),
              singleton(S, 'contactPage', 'Contact'),
            ]),
        ),
      S.divider(),
      ordered(S, 'service', 'Services'),
      ordered(S, 'eventService', 'Event services'),
      S.divider(),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: 'date', direction: 'desc' }]),
        ),
      ordered(S, 'projectCategory', 'Project categories'),
      S.divider(),
      S.listItem()
        .title('Inquiries')
        .schemaType('inquiry')
        .child(
          S.list()
            .title('Inquiries')
            .items(
              (['new', 'contacted', 'closed'] as const).map((status) =>
                S.listItem()
                  .title(status[0].toUpperCase() + status.slice(1))
                  .id(`inquiries-${status}`)
                  .child(
                    S.documentList()
                      .title(`${status[0].toUpperCase() + status.slice(1)} inquiries`)
                      .schemaType('inquiry')
                      .apiVersion('2026-11-01')
                      .filter('_type == "inquiry" && coalesce(status, "new") == $status')
                      .params({ status })
                      .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
                  ),
              ),
            ),
        ),
    ])
