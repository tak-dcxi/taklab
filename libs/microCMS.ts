import { createClient } from 'microcms-js-sdk'

export type PostType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  summary?: string
  thumbnail?: {
    url?: string
    height?: number
    width?: number
  }
  body: string
  category: string[]
}

export const client = createClient({
  serviceDomain: 'tak-dcxi',
  apiKey: process.env.API_KEY,
})
