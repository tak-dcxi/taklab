import React from 'react'
import styled from 'styled-components'
import { PER_PAGE } from '~/constant/archive'
import { clamp } from '~/styles/tools/clamp'
import { CategoriesType, PostType } from '~/types/microCMS'
import { BaseGrid } from './BaseGrid'
import { BaseStack } from './BaseStack'
import { BlogArchivePagination } from './BlogArchivePagination'
import { BlogArticleCard } from './BlogArticleCard'
import { BlogPageCommonTemplate } from './BlogPageCommonTemplate'
import { BreadcrumbsType, SiteBreadcrumbs } from './SiteBreadcrumbs'
import { SiteHeadTags } from './SiteHeadTags'
import { SubpageHeader } from './SubpageHeader'

type BlogArchivePageTemplatePropsType = {
  posts: PostType[]
  totalCount: number
  categories: CategoriesType[]
  currentPage: number
  currentCategory?: CategoriesType
}

export const BlogArchivePageTemplate: React.VFC<BlogArchivePageTemplatePropsType> = ({
  posts,
  totalCount,
  categories,
  currentPage,
  currentCategory,
}) => {
  const categoryLabel = currentCategory ? currentCategory.name : 'Blog'

  const breadcrumbs: BreadcrumbsType[] = currentCategory
    ? [
        {
          string: 'Blog',
          path: '/blog',
        },
        {
          string: categoryLabel,
        },
      ]
    : [
        {
          string: 'Blog',
        },
      ]

  return (
    <>
      <SiteHeadTags title={categoryLabel} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <SubpageHeader headline={categoryLabel} />
      <BlogPageCommonTemplate categories={categories}>
        <BaseStack gap={clamp(48, 64)}>
          <section>
            <h2 id="postsList" className="VisuallyHidden">
              記事一覧
            </h2>
            {totalCount !== 0 ? (
              <BaseGrid gap={clamp(16, 32)} columnMin={'296px'} track={'fill'}>
                {posts.map((post: PostType) => {
                  return <BlogArticleCard key={post.id} api={post} lv={3} />
                })}
              </BaseGrid>
            ) : (
              <NoPosts>
                <p className="emoji" role="img" aria-label="ごめんなさい">
                  🙇‍♂️
                </p>
                <p>まだ記事が存在しません</p>
              </NoPosts>
            )}
          </section>
          {totalCount > PER_PAGE && (
            <BlogArchivePagination
              totalCount={totalCount}
              currentPage={currentPage}
              currentCategory={currentCategory}
            />
          )}
        </BaseStack>
      </BlogPageCommonTemplate>
    </>
  )
}

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
