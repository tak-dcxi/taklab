import React, { useState } from 'react'
import { getMedia, getPosts, getPage, getFeaturedMedia } from '~/libs/wordpress'
import { ArchiveLayout } from '~/components/ArchiveLayout'
import { PostCard, PostType } from '~/components/PostCard'

type EventArchivePagePropsType = {
  posts: []
  page: { acf?: { firstview_headline: string; firstview_image: { url: string } } }
  media: []
}

const EventArchivePage: React.VFC<EventArchivePagePropsType> = ({ posts, media, page }) => {
  const [offset, setOffset] = useState(0)
  const perPage: number = 5
  const length: number = posts.length

  const breadcrumbs: { [key: string]: string }[] = [
    {
      string: 'トップページ',
      path: '/',
    },
    {
      string: '記事一覧',
    },
  ]

  const MyPosts = posts.slice(offset, offset + perPage).map((post: PostType & { id: number }): JSX.Element => {
    const featuredMediaId: number = post['featured_media']
    const featuredMedia: string = getFeaturedMedia(media, featuredMediaId)
    return (
      <div key={post.id}>
        <PostCard post={post} featuredMedia={featuredMedia} lv={2} />
      </div>
    )
  })

  const handlePageChange = (data: { [key: string]: number }): void => {
    const pageNumber: number = data['selected']
    setOffset(pageNumber * perPage)
  }

  return (
    <ArchiveLayout
      title={page.acf.firstview_headline}
      image={page.acf.firstview_image.url}
      breadcrumbs={breadcrumbs}
      length={length}
      perPage={perPage}
      onPageChange={handlePageChange}
    >
      {MyPosts}
    </ArchiveLayout>
  )
}

export const getStaticProps = async ({
  params,
}): Promise<{
  props: EventArchivePagePropsType
  revalidate: number
}> => {
  const posts: [] = await getPosts()
  const page: {} = await getPage('posts-page')
  const media: [] = await getMedia()

  return {
    props: {
      posts,
      page,
      media,
    },
    revalidate: 1,
  }
}

export default EventArchivePage
