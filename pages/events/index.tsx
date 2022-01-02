import React, { useState } from 'react'
import { getEvents, getMedia, getPage, getFeaturedMedia } from '~/libs/wordpress'
import { ArchiveLayout } from '~/components/ArchiveLayout'
import { EventCard, EventType } from '~/components/EventCard'

type EventArchivePagePropsType = {
  page: { acf?: { firstview_headline: string; firstview_image: { url: string } } }
  events: []
  media: []
}

const EventArchivePage: React.VFC<EventArchivePagePropsType> = ({ events, media, page }) => {
  const [offset, setOffset] = useState(0)
  const perPage: number = 5
  const length: number = events.length

  const breadcrumbs: { [key: string]: string }[] = [
    {
      string: 'トップページ',
      path: '/',
    },
    {
      string: 'イベント一覧',
    },
  ]

  const MyEvents = events.slice(offset, offset + perPage).map((event: EventType & { id: number }): JSX.Element => {
    const featuredMediaId: number = event['featured_media']
    const featuredMedia: string = getFeaturedMedia(media, featuredMediaId)
    return (
      <div key={event.id}>
        <EventCard event={event} featuredMedia={featuredMedia} lv={2} />
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
      {MyEvents}
    </ArchiveLayout>
  )
}

export const getStaticProps = async ({
  params,
}): Promise<{
  props: EventArchivePagePropsType
  revalidate: number
}> => {
  const page: {} = await getPage('events-page')
  const events: [] = await getEvents()
  const media: [] = await getMedia()

  return {
    props: {
      page,
      events,
      media,
    },
    revalidate: 1,
  }
}

export default EventArchivePage
