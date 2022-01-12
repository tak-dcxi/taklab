import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import { client, PostType, SEOType } from '~/libs/microCMS'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { HomeKeyVisual } from '~/components/HomeKeyVisual'
import { BaseSection } from '~/components/BaseSection'
import { PostGrid } from '~/components/PostGrid'
import { PostCard } from '~/components/PostCard'
import { SiteHeadTags } from '~/components/SiteHeadTags'

type HomeAPIType = {
  id: 'home'
  title: string
  seo: SEOType
  firstview: {
    fieldId: 'firstview'
    image: {
      url: string
      height: number
      width: number
    }
    image_alt: string
  }
}

type HomePropsType = {
  home: HomeAPIType
  posts: PostType[]
}

const HomePage: NextPage<HomePropsType> = ({ home, posts }) => {
  const perPage: number = 6

  const MyPostCards: JSX.Element[] = posts.slice(0, perPage).map((post) => {
    return <PostCard key={post.id} api={post} lv={3} />
  })

  return (
    <>
      <SiteHeadTags title={home.title} image={home.seo.image.url} />
      <HomeKeyVisual image={home.firstview.image} alt={home.firstview.image_alt} />
      <MySectionWrapper>
        <BaseSection title={'posts'}>
          <PostGrid>{MyPostCards}</PostGrid>
          {MyPostCards.length === perPage && (
            <MyButtonWrapper>
              <BaseLinkButton href={'/blog/'}>投稿をもっと見る</BaseLinkButton>
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
    /* background-color: var(--theme-background-strong); */
    background-image: var(--theme-background-pattern);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: calc(max(200px, min(176px + 7.4074vw, 280px)) * -1);
    width: max(50%, 296px);
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

export default HomePage
