import React from 'react'
import { ArticleCard } from '~/components/ArticleCard'
import { getDate } from '~/utils/getDate'

export type EventType = {
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf: {
    date: string
  }
}

type EventCardPropsType = {
  event: EventType
  featuredMedia: string
  lv: 2 | 3 | 4
}

export const EventCard: React.VFC<EventCardPropsType> = ({ event, featuredMedia, lv }) => {
  return (
    <ArticleCard
      title={event.title.rendered}
      lv={lv}
      description={event.content.rendered}
      image={featuredMedia}
      customfield={`開催日 : ${getDate(event.acf.date)}`}
      href={`/events/${event.slug}`}
    />
  )
}
