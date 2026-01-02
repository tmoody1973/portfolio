/**
 * Zod schemas for external API response validation
 * These ensure type safety at runtime when fetching from external services
 */

import { z } from 'zod'

// ============================================
// Spinitron API Schema
// ============================================

export const SpinitronsSpinSchema = z.object({
  id: z.number(),
  artist: z.string(),
  song: z.string(),
  album: z.string().optional(),
  label: z.string().optional(),
  start: z.string(),
  duration: z.number().optional(),
  image: z.string().url().optional(),
})

export const SpinitronsResponseSchema = z.object({
  items: z.array(SpinitronsSpinSchema),
})

export type SpinitronsSpinValidated = z.infer<typeof SpinitronsSpinSchema>
export type SpinitronsResponseValidated = z.infer<typeof SpinitronsResponseSchema>

// ============================================
// Mixcloud API Schema
// ============================================

export const MixcloudPicturesSchema = z.object({
  medium: z.string().url(),
  large: z.string().url(),
  extra_large: z.string().url(),
})

export const MixcloudTagSchema = z.object({
  key: z.string(),
  name: z.string(),
  url: z.string().url(),
})

export const MixcloudShowSchema = z.object({
  key: z.string(),
  name: z.string(),
  url: z.string().url(),
  created_time: z.string(),
  audio_length: z.number(),
  play_count: z.number(),
  pictures: MixcloudPicturesSchema,
  tags: z.array(MixcloudTagSchema),
})

export const MixcloudPagingSchema = z.object({
  next: z.string().url().optional(),
  previous: z.string().url().optional(),
})

export const MixcloudResponseSchema = z.object({
  data: z.array(MixcloudShowSchema),
  paging: MixcloudPagingSchema.optional(),
})

export type MixcloudShowValidated = z.infer<typeof MixcloudShowSchema>
export type MixcloudResponseValidated = z.infer<typeof MixcloudResponseSchema>

// ============================================
// Validation Helpers
// ============================================

/**
 * Safely parse Spinitron API response
 */
export function parseSpinitronsResponse(data: unknown): SpinitronsResponseValidated | null {
  const result = SpinitronsResponseSchema.safeParse(data)
  if (result.success) {
    return result.data
  }
  console.error('Spinitron API validation failed:', result.error)
  return null
}

/**
 * Safely parse Mixcloud API response
 */
export function parseMixcloudResponse(data: unknown): MixcloudResponseValidated | null {
  const result = MixcloudResponseSchema.safeParse(data)
  if (result.success) {
    return result.data
  }
  console.error('Mixcloud API validation failed:', result.error)
  return null
}
