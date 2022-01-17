import { createClient } from 'microcms-js-sdk'
import { config } from '~/site.config'
import { CategoriesType, MicroCmsResponse, PostType, Queries } from '~/types/microCMS'

export const PER_PAGE: number = 12

const limit: number = PER_PAGE
const defaultLimit: number = 12
const defaultMaxLimit: number = 50

export const client = createClient({
  serviceDomain: config.serviceId,
  apiKey: config.apiKey,
})

type GetContentsType = {
  posts: PostType[]
  categories: CategoriesType[]
  pager: number[]
  totalCount: number
}

export const getContents = async (currentPage: number = 1, articleFilter?: string): Promise<GetContentsType> => {
  const [{ posts, pager, totalCount }, categories] = await Promise.all([
    getBlogsByFilter(limit, currentPage, articleFilter),
    getCategories(),
  ])

  return {
    posts: posts.contents,
    categories: categories.contents,
    pager,
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

type GetBlogsByFilter = {
  posts: MicroCmsResponse<PostType>
  pager: number[]
  totalCount: number
}

export const getBlogsByFilter = async (
  limit: number,
  currentPage: number,
  articleFilter?: string
): Promise<GetBlogsByFilter> => {
  const queries: Queries = {
    limit: limit,
    filters: articleFilter,
    offset: (currentPage - 1) * limit,
  }
  const posts = await client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries: queries,
  })

  // @ts-ignore
  const pager = [...[Math.ceil(posts.totalCount / PER_PAGE)].keys()]

  const totalCount = posts.totalCount

  return { posts, pager, totalCount }
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
