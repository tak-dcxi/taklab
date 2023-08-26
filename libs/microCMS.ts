import { createClient } from 'microcms-js-sdk'
import { config } from '~/site.config'
import { CategoriesType, MicroCmsResponse, PostType, Queries } from '~/types/microCMS'

// ページごとの投稿数
export const PER_PAGE = 12
const DEFAULT_MAX_LIMIT = 50

// microCMSのクライアントを生成
export const client = createClient({
  serviceDomain: config.serviceId,
  apiKey: config.apiKey,
})

export const getContents = async (currentPage: number = 1, articleFilter?: string) => {
  const [{ posts, pager, totalCount }, categories] = await Promise.all([
    getBlogsByFilter(PER_PAGE, currentPage, articleFilter),
    getCategories(),
  ])

  return {
    posts: posts.contents,
    categories: categories.contents,
    pager,
    totalCount,
  }
}

// 指定されたlimitでの全てのブログを取得
export const getBlogs = async (limit: number = DEFAULT_MAX_LIMIT): Promise<MicroCmsResponse<PostType>> => {
  return client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries: { limit },
  })
}

export const getBlogsByKeyword = async (
  keyword: string,
  limit: number = DEFAULT_MAX_LIMIT
): Promise<MicroCmsResponse<PostType>> => {
  return client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries: {
      q: keyword,
      limit,
    },
  })
}

export const getBlogsByFilter = async (
  limit: number,
  currentPage: number,
  articleFilter?: string
): Promise<{ posts: MicroCmsResponse<PostType>; pager: number[]; totalCount: number }> => {
  const queries: Queries = {
    limit,
    filters: articleFilter,
    offset: (currentPage - 1) * limit,
  }

  const posts = await client.get<MicroCmsResponse<PostType>>({
    endpoint: 'blog',
    queries,
  })

  const pager = [...Array(Math.ceil(posts.totalCount / PER_PAGE)).keys()]

  return { posts, pager, totalCount: posts.totalCount }
}

// IDで特定のブログを取得
export const getBlogById = async (blogId: string): Promise<PostType> => {
  return client.get<PostType>({
    endpoint: 'blog',
    contentId: blogId,
    queries: { depth: 2 },
  })
}

// カテゴリを取得
export const getCategories = async (): Promise<MicroCmsResponse<CategoriesType>> => {
  return client.get<MicroCmsResponse<CategoriesType>>({ endpoint: 'blog-category' })
}

export const getPostsCountByCategory = async (categoryId: string): Promise<number> => {
  try {
    const response = await client.get({
      endpoint: 'blog', // これはあなたのエンドポイントに合わせて変更する必要があります
      queries: { filters: `category[equals]${categoryId}`, limit: 0 }, // カテゴリIDに基づいてフィルタリング
    })

    return response.totalCount // totalCountは、クエリ結果の総数を返すフィールドと仮定しています。
  } catch (error) {
    console.error('Failed to fetch post count by category', error)
    return 0
  }
}
