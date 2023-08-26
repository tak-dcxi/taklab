import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getBlogsByFilter } from '~/libs/microCMS'
import { BlogArchivePageTemplate } from '~/components/BlogArchivePageTemplate'
import { CategoriesType, PostType } from '~/types/microCMS'
import { PER_PAGE } from '~/constant/archive'

type SearchResultPageProps = {
  posts: PostType[]
  totalCount: number
  currentPage: number
  categories: CategoriesType[]
  pager: number[]
}

const BlogSearchResultPage: NextPage<SearchResultPageProps> = ({
  posts,
  totalCount,
  currentPage,
  categories,
  pager,
}) => {
  return (
    <BlogArchivePageTemplate posts={posts} totalCount={totalCount} categories={categories} currentPage={currentPage} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = context.query.keyword as string
  const currentPage = context.query.page ? parseInt(context.query.page as string) : 1
  const articleFilter = keyword ? `title[contains]${keyword}` : undefined

  const { posts, pager } = await getBlogsByFilter(PER_PAGE, currentPage, articleFilter)

  return {
    props: {
      posts: posts.contents,
      totalCount: posts.totalCount,
      currentPage,
      categories: [],
      pager,
    },
  }
}

export default BlogSearchResultPage
