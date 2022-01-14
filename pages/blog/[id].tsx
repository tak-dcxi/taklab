import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import { client, PostType, CategoriesType } from '~/libs/microCMS'
import { BlogCommonTemplate } from '~/components/BlogCommonTemplate'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SiteBreadcrumbs, BreadcrumbsType } from '~/components/SiteBreadcrumbs'
import ErrorPage from '~/pages/_error'
import { GetStaticProps } from 'next'
import { generateOgImage } from '~/libs/generateOGP'
import { BlogDetailsThumbnail } from '~/components/BlogDetailsThumbnail'

type PostDetailsPagePropsType = {
  post: PostType
  categories: CategoriesType[]
}

const PostDetailsPage: React.VFC<PostDetailsPagePropsType> = ({ post, categories }) => {
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
      <BlogDetailsThumbnail src={thumbnail} alt={post.title} />
      <BlogCommonTemplate categories={categories}>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body,
          }}
        />
      </BlogCommonTemplate>
    </>
  )
}

export const getStaticPaths = async () => {
  const post = await client.get({ endpoint: 'blog' })
  const paths = post.contents.map((content: { id: string }) => `/blog/${content.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params?.id
  const post = await client.get({ endpoint: 'blog', contentId: id })
  const categories = await client.get({ endpoint: 'category' })

  return {
    props: {
      post: post,
      categories: categories.contents,
    },
    revalidate: 1,
  }
}

export default PostDetailsPage
