import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from 'next'
import styled from 'styled-components'
import { client, PostType, CategoriesType } from '~/libs/microCMS'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SubpageHeader } from '~/components/SubpageHeader'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { PostCard } from '~/components/PostCard'
import { PostPagination } from '~/components/PostPagination'
import { SiteShareButton } from '~/components/SiteShareButton'
import { BlogCommonTemplate } from '~/components/BlogCommonTemplate'
import { clamp } from '~/styles/tools/clamp'
import { toNumberID } from '~/utils/convertID'
import { PER_PAGE } from '~/constant/archive'
import { ParsedUrlQuery } from 'querystring'

type CategoryPagePropsType = {
  posts: PostType[]
  totalCounts: number
  currentPage: number
  categories: CategoriesType[]
  currentCategory: string
}

const CategoryPage: NextPage<CategoryPagePropsType> = ({
  posts,
  totalCounts,
  currentPage,
  categories,
  currentCategory,
}) => {
  const [offset, setOffset] = useState(0)
  const perPage: number = PER_PAGE

  const breadcrumbs: BreadcrumbsType[] = [
    {
      string: 'Blog',
    },
  ]

  const handlePageChange = (data: { [key: string]: number }): void => {
    const pageNumber: number = data['selected']
    setOffset(pageNumber * perPage)
  }

  return (
    <>
      <SiteHeadTags title={'Blog'} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <SubpageHeader headline={'Blog'} />
      <BlogCommonTemplate categories={categories}>
        <section>
          <h2 id="postsList" className="VisuallyHidden">
            記事一覧
          </h2>
          {posts.length ? (
            <MyPostsList>
              {posts.slice(offset, offset + perPage).map((post: PostType) => {
                return <PostCard key={post.id} api={post} lv={3} />
              })}
            </MyPostsList>
          ) : (
            <MyNoPosts>
              <p className="emoji" role="img" aria-label="ごめんなさい">
                🙇‍♂️
              </p>
              <p>まだ記事が存在しません</p>
            </MyNoPosts>
          )}
        </section>
        {posts.length > perPage && (
          <MyPagination>
            <PostPagination perPage={perPage} length={posts.length} onChange={handlePageChange} />
          </MyPagination>
        )}
        <MyShareButton>
          <SiteShareButton title={'Blog'} />
        </MyShareButton>
      </BlogCommonTemplate>
    </>
  )
}

const MyPostsList = styled.div`
  display: grid;
  gap: ${clamp(16, 24)};
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
`

const MyPagination = styled.div`
  margin-top: ${clamp(48, 64)};
`

const MyNoPosts = styled.div`
  text-align: center;

  & > * + * {
    margin-top: 2em;
  }

  & .emoji {
    font-family: var(--font-emoji);
    font-size: ${56 / 16}rem;
  }
`

const MyShareButton = styled.div`
  margin-top: 64px;
`

export const getAllCategoryPagePaths = async () => {
  const resCategory = await client.get({ endpoint: 'category' })

  const paths: string[] = await Promise.all(
    resCategory.contents.map((item) => {
      const result = client
        .get({
          endpoint: 'blog',
          queries: {
            filters: `category[equals]${item.id}`,
          },
        })
        .then(({ totalCount }) => {
          const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

          return range(1, Math.ceil(totalCount / PER_PAGE)).map((repo) => `/blog/${item.id}/page/${repo}`)
        })
      return result
    })
  )

  return paths.flat()
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = await getAllCategoryPagePaths()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const { params, previewData } = context

  if (!params?.category || !params?.id) throw new Error('Error: ID not found')

  const id: number = toNumberID(params.id)

  const data = await client.get({
    endpoint: 'blog',
    queries: {
      limit: PER_PAGE,
      offset: (id - 1) * PER_PAGE,
      filters: `category[equals]${params.category}`,
    },
  })

  const categories = await client.get({ endpoint: 'category' })

  return {
    props: {
      posts: data.contents,
      totalCounts: data.totalCount,
      currentPage: id,
      categories: categories.contents,
      currentCategory: params.category,
    },
  }
}

export default CategoryPage
