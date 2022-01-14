import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
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

type BlogArchivePagePropsType = {
  posts: PostType[]
  totalCounts: number
  categories: CategoriesType[]
}

const BlogArchivePage: NextPage<BlogArchivePagePropsType> = ({ posts, totalCounts, categories }) => {
  const [offset, setOffset] = useState(0)
  const perPage: number = 12

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
            <PostsList>
              {posts.slice(offset, offset + perPage).map((post: PostType) => {
                return <PostCard key={post.id} api={post} lv={3} />
              })}
            </PostsList>
          ) : (
            <NoPosts>
              <p className="emoji" role="img" aria-label="ごめんなさい">
                🙇‍♂️
              </p>
              <p>まだ記事が存在しません</p>
            </NoPosts>
          )}
        </section>
        {posts.length > perPage && (
          <Pagination>
            <PostPagination perPage={perPage} length={posts.length} onChange={handlePageChange} />
          </Pagination>
        )}
        <ShareButton>
          <SiteShareButton title={'Blog'} />
        </ShareButton>
      </BlogCommonTemplate>
    </>
  )
}

const PostsList = styled.div`
  display: grid;
  gap: ${clamp(16, 24)};
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
`

const Pagination = styled.div`
  margin-top: ${clamp(48, 64)};
`

const NoPosts = styled.div`
  text-align: center;

  & > * + * {
    margin-top: 2em;
  }

  & .emoji {
    font-family: var(--font-emoji);
    font-size: ${56 / 16}rem;
  }
`

const ShareButton = styled.div`
  margin-top: 64px;
`

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: 'blog',
    queries: { limit: 12, offset: 0 },
  })

  const categories = await client.get({
    endpoint: 'category',
  })

  return {
    props: {
      posts: data.contents,
      totalCounts: data.totalCount,
      categories: categories.contents,
    },
    revalidate: 1,
  }
}

export default BlogArchivePage
