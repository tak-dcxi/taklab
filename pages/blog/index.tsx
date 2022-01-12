import React, { useState } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import { client, PostType, CategoriesType } from '~/libs/microCMS'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SubpageHeader } from '~/components/SubpageHeader'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { PostCard } from '~/components/PostCard'
import { PostPagination } from '~/components/PostPagination'
import { SiteShareButton } from '~/components/SiteShareButton'
import { BlogCommonTemplate } from '~/components/BlogCommonTemplate'

type PostsPagePropsType = {
  posts: PostType[]
  categories: CategoriesType[]
}

const PostsPage: NextPage<PostsPagePropsType> = ({ posts, categories }) => {
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
  gap: max(16px, min(0.8519rem + 0.7407vw, 24px));
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
`

const MyPagination = styled.div`
  margin-top: max(48px, min(2.7037rem + 1.4815vw, 64px));
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

export const getStaticProps = async () => {
  const posts = await client.get({ endpoint: 'blog' })
  const categories = await client.get({ endpoint: 'category' })

  return {
    props: {
      posts: posts.contents,
      categories: categories.contents,
    },
    revalidate: 1,
  }
}

export default PostsPage
