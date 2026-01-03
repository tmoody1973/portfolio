import { createClient, type SanityClient } from 'next-sanity'

// Lazy-initialized client to avoid issues during build time
let _client: SanityClient | null = null

export function getClient(): SanityClient {
  if (!_client) {
    const envProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const envDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

    _client = createClient({
      projectId: envProjectId && envProjectId.length > 0 ? envProjectId : 'zb08xdlz',
      dataset: envDataset && envDataset.length > 0 ? envDataset : 'production',
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  }
  return _client
}

// For backwards compatibility
export const client = {
  fetch: <T>(query: string, params?: Record<string, unknown>, options?: Parameters<SanityClient['fetch']>[2]) =>
    getClient().fetch<T>(query, params, options)
}

// Helper for fetching data with caching
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  })
}
