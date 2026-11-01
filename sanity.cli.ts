import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'not-configured'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './src/sanity/extract.json',
    generates: './src/sanity/types.ts',
    overloadClientMethods: false,
  },
})
