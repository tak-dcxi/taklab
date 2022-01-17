import React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from 'next'
import { getContents } from '~/libs/microCMS'
import { ParsedUrlQuery } from 'querystring'
import { BlogArchivePageTemplate } from '~/components/BlogArchivePageTemplate'
import ErrorPage from '~/pages/_error'
import { NextRouter, useRouter } from 'next/router'
import { CategoriesType, PostType } from '~/types/microCMS'

type CategoryPagePropsType = {
  posts: PostType[]
  currentPage: number
  categories: CategoriesType[]
  totalCount: number
  currentCategory: CategoriesType
}

const CategoryArchivePagingPage: NextPage<CategoryPagePropsType> = ({
  posts,
  currentPage,
  categories,
  totalCount,
  currentCategory,
}) => {
  const router: NextRouter = useRouter()

  if (!router.isFallback && !currentCategory?.id) return <ErrorPage statusCode={404} />

  return (
    <BlogArchivePageTemplate
      posts={posts}
      totalCount={totalCount}
      categories={categories}
      currentPage={currentPage}
      currentCategory={currentCategory}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const { params, previewData } = context

  if (!params?.category || !params?.id) throw new Error('Error: ID not found')

  const page: any = params?.id || '1'
  const category = params?.category
  const articleFilter = category !== undefined ? `category[equals]${category}` : undefined

  const { posts, totalCount, categories } = await getContents(page, articleFilter)
  const currentCategory = category !== undefined ? categories.find((content) => content.id === category) : undefined

  return {
    props: {
      currentPage: parseInt(page),
      posts,
      categories,
      totalCount,
      currentCategory,
    },
    revalidate: 1,
  }
}

export default CategoryArchivePagingPage
