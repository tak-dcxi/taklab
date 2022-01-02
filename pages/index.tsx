import React from 'react'
import { getEvents, getMedia, getPosts, getPage, getFeaturedMedia } from '~/libs/wordpress'
import { EventCard, EventType } from '~/components/EventCard'
import { PostCard, PostType } from '~/components/PostCard'
import { HomeLayout } from '~/components/HomeLayout'

type HomePropsType = {
  posts: []
  home: { acf?: { firstview_headline: string; firstview_image: { url: string } } }
  events: []
  media: []
}

const Home: React.VFC<HomePropsType> = ({ posts, events, media, home }) => {
  const perPage: number = 3

  const MyPostCards = posts.slice(0, perPage).map((post: PostType & { id: number }) => {
    const featuredMediaId: number = post['featured_media']
    const featuredMedia: string = getFeaturedMedia(media, featuredMediaId)
    return (
      <div key={post.id}>
        <PostCard post={post} featuredMedia={featuredMedia} lv={3} />
      </div>
    )
  })

  const MyEventCards = events.slice(0, perPage).map((event: EventType & { id: number }) => {
    const featuredMediaId: number = event['featured_media']
    const featuredMedia: string = getFeaturedMedia(media, featuredMediaId)
    return (
      <div key={event.id}>
        <EventCard event={event} featuredMedia={featuredMedia} lv={3} />
      </div>
    )
  })

  return (
    <HomeLayout
      title={home.acf.firstview_headline}
      image={home.acf.firstview_image.url}
      perPage={perPage}
      postCards={MyPostCards}
      eventCards={MyEventCards}
    />
  )
}

export const getStaticProps = async ({
  params,
}): Promise<{
  props: HomePropsType
  revalidate: number
}> => {
  const posts: [] = await getPosts(3)
  const home: {} = await getPage('home')
  const events: [] = await getEvents()
  const media: [] = await getMedia()

  return {
    props: {
      posts,
      home,
      events,
      media,
    },
    revalidate: 1,
  }
}

export default Home
