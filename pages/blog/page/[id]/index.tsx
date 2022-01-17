import React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { client, getBlogsByFilter, getContents } from '~/libs/microCMS'
import { BlogArchivePageTemplate } from '~/components/BlogArchivePageTemplate'
import { PER_PAGE } from '~/constant/archive'
import { toNumberID } from '~/utils/convertID'
import { CategoriesType, PostType } from '~/types/microCMS'

type CategoryPagePropsType = {
  posts: PostType[]
  totalCount: number
  currentPage: number
  categories: CategoriesType[]
  pager: number[]
}

const BlogArchivePaginatePage: NextPage<CategoryPagePropsType> = ({
  posts,
  totalCount,
  currentPage,
  categories,
  pager,
}) => {
  console.log(pager)
  return (
    <BlogArchivePageTemplate posts={posts} totalCount={totalCount} categories={categories} currentPage={currentPage} />
  )
}

export const getStaticPaths = async () => {
  const limit: number = 12
  const { pager } = await getBlogsByFilter(limit, 1)
  const paths = pager.map((page) => {
    return { params: { id: (page + 1).toString() } }
  })

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const page: any = context.params?.id || '1'
  const { posts, pager, categories } = await getContents(page)

  return {
    props: {
      currentPage: parseInt(page),
      posts,
      categories,
      pager,
    },
    revalidate: 1,
  }
}

export default BlogArchivePaginatePage
