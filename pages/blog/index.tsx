import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { client } from '~/libs/microCMS'
import { PER_PAGE } from '~/constant/archive'
import { BlogArchivePageTemplate } from '~/components/BlogArchivePageTemplate'
import { CategoriesType, PostType } from '~/types/microCMS'

type BlogArchivePagePropsType = {
  posts: PostType[]
  totalCount: number
  categories: CategoriesType[]
}

const BlogArchivePage: NextPage<BlogArchivePagePropsType> = ({ posts, totalCount, categories }) => {
  return <BlogArchivePageTemplate posts={posts} totalCount={totalCount} categories={categories} currentPage={1} />
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: 'blog',
    queries: { limit: PER_PAGE, offset: 0 },
  })

  const categories = await client.get({ endpoint: 'blog-category' })

  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
      categories: categories.contents,
    },
    revalidate: 1,
  }
}

export default BlogArchivePage
