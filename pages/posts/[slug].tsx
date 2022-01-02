import React from 'react'
import { useRouter } from 'next/router'
import { getPost, getSlugs, getMedia, getFeaturedMedia } from '~/libs/wordpress'
import { SubpageLayout } from '~/components/SubpageLayout'
import ErrorPage from '~/pages/_error'

type PostPagePropsType = {
  post: {
    title: { rendered: string }
    content: { rendered: string }
    id: number
  }
  media: []
}

type getStaticPathsType = {
  paths: { params: { [key: string]: string } }[]
  fallback: string
}

type getStaticPropsType = {
  props: {
    post: {}
    media: []
  }
  revalidate: number
}

const PostPage: React.VFC<PostPagePropsType> = ({ post, media }) => {
  const router = useRouter()

  if (!router.isFallback && !post?.id) return <ErrorPage statusCode={404} />

  const thumbnailId: number = post['featured_media']
  const thumbnail: string = getFeaturedMedia(media, thumbnailId)
  const breadcrumbs: { [key: string]: string }[] = [
    {
      string: 'トップページ',
      path: '/',
    },
    {
      string: '記事一覧',
      path: '/posts/',
    },
    {
      string: post.title.rendered,
    },
  ]

  return (
    <SubpageLayout
      title={post.title.rendered}
      image={thumbnail ? thumbnail['media_details'].sizes.full['source_url'] : null}
      breadcrumbs={breadcrumbs}
    >
      {post.content.rendered}
    </SubpageLayout>
  )
}

export const getStaticPaths = async (): Promise<getStaticPathsType> => {
  const paths = await getSlugs('posts')

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }): Promise<getStaticPropsType> => {
  const post: {} = await getPost(params.slug, 100)
  const media: [] = await getMedia()

  return {
    props: {
      post,
      media,
    },
    revalidate: 1,
  }
}

export default PostPage
