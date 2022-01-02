import React from 'react'
import { ArticleCard } from '~/components/ArticleCard'

export type PostType = {
  slug: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  modified: string
  _embedded: {
    author: {
      name: string
    }
  }
}

type PostCardPropsType = {
  post: PostType
  featuredMedia: string
  lv: 2 | 3 | 4
}

export const PostCard: React.VFC<PostCardPropsType> = ({ post, featuredMedia, lv }) => {
  return (
    <ArticleCard
      title={post.title.rendered}
      lv={lv}
      description={post.excerpt.rendered}
      image={featuredMedia}
      author={post._embedded.author[0].name}
      date={post.modified}
      href={`/posts/${post.slug}`}
    />
  )
}
