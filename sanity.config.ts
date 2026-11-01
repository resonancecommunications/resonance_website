'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, studioBasePath, studioProjectId } from './src/sanity/env'
import { resolve } from './src/sanity/presentation'
import { SINGLETON_TYPES, schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

const singletons = new Set<string>(SINGLETON_TYPES)
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'resonance',
  title: 'Resonance Communications',
  basePath: studioBasePath,
  projectId: studioProjectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    // Singletons cannot be deleted, duplicated or unpublished.
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : schemaType === 'inquiry'
          ? actions.filter(({ action }) => action !== 'duplicate')
          : actions,
    newDocumentOptions: (items) =>
      items.filter(({ templateId }) => !singletons.has(templateId) && templateId !== 'inquiry'),
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: '/api/draft' } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
