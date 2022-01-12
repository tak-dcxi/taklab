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
  category: {
    id: string
    name: string
  }
}

export type CategoriesType = {
  id: string
  name: string
}

export type SEOType = {
  fieldId: string
  description?: string
  image: {
    url?: string
    height?: number
    width?: number
  }
}

export const client = createClient({
  serviceDomain: 'tak-dcxi',
  apiKey: process.env.API_KEY,
})
