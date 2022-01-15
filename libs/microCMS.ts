import { createClient } from 'microcms-js-sdk'
import { config } from '~/site.config'
import { CategoriesType, MicroCmsResponse, PostType, Queries } from '~/types/microCMS'

export const PER_PAGE: number = 12

const limit: number = PER_PAGE
const defaultLimit: number = 10
const defaultMaxLimit: number = 50

export const client = createClient({
  serviceDomain: config.serviceId,
  apiKey: config.apiKey,
})

export const getContents = async (
  currentPage: number = 1,
  articleFilter?: string
): Promise<{
  posts: PostType[]
  categories: CategoriesType[]
  totalCount: number
}> => {
  const [{ posts, totalCount }, categories] = await Promise.all([
    getBlogsByFilter(limit, currentPage, articleFilter),
    getCategories(),
  ])
  return {
    posts: posts.contents,
    categories: categories.contents,
    totalCount,
  }
}

export const getAllBlogs = async (): Promise<MicroCmsResponse<PostType>> => {
  const response = await client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries: { limit: defaultMaxLimit },
  })
  return response
}

export const getBlogs = async (limit: number): Promise<MicroCmsResponse<PostType>> => {
  const response = await client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries: { limit: limit },
  })

  return response
}

export const getBlogsByFilter = async (
  limit: number,
  currentPage: number,
  articleFilter?: string
): Promise<{ posts: MicroCmsResponse<PostType>; totalCount: number }> => {
  const queries: Queries = {
    limit: limit,
    filters: articleFilter,
    offset: (currentPage - 1) * limit,
  }
  const posts = await client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries: queries,
  })

  const totalCount = posts.totalCount

  return { posts, totalCount }
}

export const getBlogById = async (blogId: string): Promise<PostType> => {
  const response = await client.get<PostType>({
    endpoint: 'blog',
    contentId: blogId,
    queries: { depth: 2 },
  })
  return response
}

export const getCategories = async (): Promise<MicroCmsResponse<CategoriesType>> => {
  const response = await client.get<MicroCmsResponse<CategoriesType>>({ endpoint: 'blog-category' })
  return response
}
