import React from 'react'
import { client, PostType } from '~/libs/microCMS'
import { PostCard } from '~/components/PostCard'
import { HomeLayout, HomeAPIType } from '~/components/HomeLayout'

type HomePropsType = {
  home: HomeAPIType
  posts: PostType[]
}

const Home: React.VFC<HomePropsType> = ({ home, posts }) => {
  const perPage: number = 6

  const MyPostCards = posts.slice(0, perPage).map((post) => {
    return <PostCard key={post.id} api={post} lv={3} />
  })

  return <HomeLayout api={home} perPage={perPage} postCards={MyPostCards} />
}

export const getStaticProps = async () => {
  const home = await client.get({ endpoint: 'pages', contentId: 'home' })
  const posts = await client.get({ endpoint: 'blog' })

  return {
    props: {
      home: home,
      posts: posts.contents,
    },
    revalidate: 1,
  }
}

export default Home
