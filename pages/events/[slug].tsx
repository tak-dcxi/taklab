import React from 'react'
import { useRouter } from 'next/router'
import { getEvent, getSlugs, getMedia, getFeaturedMedia } from '~/libs/wordpress'
import { SubpageLayout } from '~/components/SubpageLayout'
import ErrorPage from '~/pages/_error'

type EventPagePropsType = {
  event: {
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
    event: {}
    media: []
  }
  revalidate: number
}

const EventPage: React.VFC<EventPagePropsType> = ({ event, media }) => {
  const router = useRouter()

  if (!router.isFallback && !event?.id) return <ErrorPage statusCode={404} />

  const thumbnailId: number = event['featured_media']
  const thumbnail: string = getFeaturedMedia(media, thumbnailId)
  const breadcrumbs: { [key: string]: string }[] = [
    {
      string: 'トップページ',
      path: '/',
    },
    {
      string: 'イベント一覧',
      path: '/events/',
    },
    {
      string: event.title.rendered,
    },
  ]

  return (
    <SubpageLayout
      title={event.title.rendered}
      image={thumbnail ? thumbnail['media_details'].sizes.full['source_url'] : null}
      breadcrumbs={breadcrumbs}
    >
      {event.content.rendered}
    </SubpageLayout>
  )
}

export const getStaticPaths = async (): Promise<getStaticPathsType> => {
  const paths: { params: { [key: string]: string } }[] = await getSlugs('events')

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }): Promise<getStaticPropsType> => {
  const event: {} = await getEvent(params.slug)
  const media: [] = await getMedia()

  return {
    props: {
      event,
      media,
    },
    revalidate: 1,
  }
}

export default EventPage
