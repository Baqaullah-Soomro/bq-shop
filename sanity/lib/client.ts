import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-30',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning: true
})

