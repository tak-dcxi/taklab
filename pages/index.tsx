import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { client, PostType } from '~/libs/microCMS'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { HomeKeyVisual } from '~/components/HomeKeyVisual'
import { BaseSection } from '~/components/BaseSection'
import { PostGrid } from '~/components/PostGrid'
import { PostCard } from '~/components/PostCard'
import { SiteHeadTags } from '~/components/SiteHeadTags'

type HomeAPIType = {
  id: 'home'
  title: string
  image: {
    url: string
    height: number
    width: number
  }
  image_alt: string
}

type HomePropsType = {
  home: HomeAPIType
  posts: PostType[]
}

const Home: React.VFC<HomePropsType> = ({ home, posts }) => {
  const perPage: number = 6

  const MyPostCards: JSX.Element[] = posts.slice(0, perPage).map((post) => {
    return <PostCard key={post.id} api={post} lv={3} />
  })

  return (
    <>
      <SiteHeadTags path={useRouter().pathname} type="website" />
      <HomeKeyVisual image={home.image} alt={home.image_alt} />
      <MySectionWrapper>
        <BaseSection title={'posts'}>
          <PostGrid>{MyPostCards}</PostGrid>
          {MyPostCards.length === perPage && (
            <MyButtonWrapper>
              <BaseLinkButton href={'/posts/'}>投稿をもっと見る</BaseLinkButton>
            </MyButtonWrapper>
          )}
        </BaseSection>
      </MySectionWrapper>
    </>
  )
}

const MySectionWrapper = styled.div`
  position: relative;

  &::after {
    background-color: var(--theme-background-strong);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: calc(max(200px, min(176px + 7.4074vw, 280px)) * -1);
    width: 50%;
    z-index: -1;
  }
`

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`

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
