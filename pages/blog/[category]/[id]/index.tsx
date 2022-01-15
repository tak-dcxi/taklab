import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import { client } from '~/libs/microCMS'
import { BlogPageCommonTemplate } from '~/components/BlogPageCommonTemplate'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SiteBreadcrumbs, BreadcrumbsType } from '~/components/SiteBreadcrumbs'
import ErrorPage from '~/pages/_error'
import { GetStaticPaths, GetStaticProps } from 'next'
import { generateOgImage } from '~/libs/generateOGP'
import { BlogArticlePageThumbnail } from '~/components/BlogArticlePageThumbnail'
import { toStringID } from '~/utils/convertID'
import { CategoriesType, PostType } from '~/types/microCMS'

type PostDetailsPagePropsType = {
  post: PostType
  categories: CategoriesType[]
  currentCategory: string
}

const BlogDetailsPage: React.VFC<PostDetailsPagePropsType> = ({ post, categories }) => {
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
      <SiteHeadTags title={post.title} image={ogImage} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <BlogArticlePageThumbnail src={thumbnail} />
      <BlogPageCommonTemplate categories={categories}>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body,
          }}
        />
      </BlogPageCommonTemplate>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context

  if (!params?.category || !params?.id) throw new Error('Error: ID not found')

  try {
    const id: string = toStringID(params.id)
    const data = await client.get({ endpoint: 'blog', contentId: id })
    const category = await client.get({ endpoint: 'blog-category' })

    return {
      props: {
        post: data,
        categories: category.contents,
        currentCategory: toStringID(params.category),
      },
    }
  } catch (error) {
    return { notFound: true }
  }
}

export default BlogDetailsPage
