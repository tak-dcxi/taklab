import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import { getAllBlogs, getBlogById, getContents } from '~/libs/microCMS'
import { BlogPageCommonTemplate } from '~/components/BlogPageCommonTemplate'
import { SiteHelmet } from '~/components/SiteHelmet'
import { SiteBreadcrumbs, BreadcrumbsType } from '~/components/SiteBreadcrumbs'
import ErrorPage from '~/pages/_error'
import { GetStaticPropsContext } from 'next'
import { generateOgImage } from '~/libs/generateOGP'
import { BlogArticlePageThumbnail } from '~/components/BlogArticlePageThumbnail'
import { CategoriesType, PostType } from '~/types/microCMS'
import { BaseContainer } from '~/components/BaseContainer'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import { WysiwygArea } from '~/components/WysiwygArea'
import { HTMLParser } from '~/libs/HTMLParser'

type PostDetailsPagePropsType = {
  post: PostType
  body: string
  categories: CategoriesType[]
}

const BlogArticlePage: React.VFC<PostDetailsPagePropsType> = ({ post, body, categories }) => {
  const router: NextRouter = useRouter()

  if (!router.isFallback && !post?.id) return <ErrorPage statusCode={404} />

  const thumbnail: string = post.thumbnail ? post.thumbnail.url : post.category.image.url

  const ogImage: string = generateOgImage(thumbnail, post.title)

  const breadcrumbs: BreadcrumbsType[] = [
    {
      string: 'Blog',
      path: '/blog',
    },
    {
      string: post.title,
    },
  ]

  return (
    <>
      <SiteHelmet title={post.title} image={ogImage} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <BlogArticlePageThumbnail src={thumbnail} />
      <BlogPageCommonTemplate categories={categories}>
        <BaseContainer maxWidth={'var(--max-width-narrow)'}>
          <WysiwygArea>{body}</WysiwygArea>
        </BaseContainer>
      </BlogPageCommonTemplate>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getAllBlogs()
  const ids = posts.contents.map((post: PostType & MicroCMSContentId & MicroCMSDate) => {
    return { params: { postId: post.id } }
  })
  return {
    paths: ids,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params, previewData } = context

  if (!params?.postId) throw new Error('Error: ID not found')

  const id: any = params?.postId || '1'
  const post = await getBlogById(id)
  const body = HTMLParser(post.body)
  const { posts, categories } = await getContents()

  return {
    props: {
      post,
      posts,
      body,
      categories,
    },
    revalidate: 1,
  }
}

export default BlogArticlePage
