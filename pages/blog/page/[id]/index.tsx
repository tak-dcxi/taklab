import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { client } from '~/libs/microCMS'
import { BlogArchivePageTemplate } from '~/components/BlogArchivePageTemplate'
import { PER_PAGE } from '~/constant/archive'
import { toNumberID } from '~/utils/convertID'
import { CategoriesType, PostType } from '~/types/microCMS'

type CategoryPagePropsType = {
  posts: PostType[]
  totalCount: number
  currentPage: number
  categories: CategoriesType[]
}

const BlogArchivePaginatePage: NextPage<CategoryPagePropsType> = ({ posts, totalCount, currentPage, categories }) => {
  return (
    <BlogArchivePageTemplate posts={posts} totalCount={totalCount} categories={categories} currentPage={currentPage} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.get({ endpoint: 'blog' })

  const range = (start: number, end: number): number[] =>
    [...[end - start + 1]].map((_: number, i: number) => start + i)

  const paths: string[] = range(1, Math.ceil(response.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryPagePropsType> = async (context) => {
  const { params, previewData } = context

  if (!params?.id) throw new Error('Error: ID not found')

  const id: number = toNumberID(params.id)

  const data = await client.get({
    endpoint: 'blog',
    queries: { limit: PER_PAGE, offset: (id - 1) * PER_PAGE },
  })

  const categories = await client.get({ endpoint: 'blog-category' })

  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
      currentPage: id,
      categories: categories.contents,
    },
    revalidate: 1,
  }
}

export default BlogArchivePaginatePage
