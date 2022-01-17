import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk'

export type MicroCmsResponse<T> = MicroCMSListResponse<T>

export type Queries = MicroCMSQueries

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
    image: {
      url: string
      height: number
      width: number
    }
  }
}

export type CategoriesType = {
  id: string
  name: string
  image: {
    url: string
    height: number
    width: number
  }
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

export type DraftResponseType = {
  post: PostType
  toc: {
    text: string
    id: string
    name: string
  }
  body: string
}
