import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import { client } from '~/libs/microCMS'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseSection } from '~/components/BaseSection'
import { BlogArticleCard } from '~/components/BlogArticleCard'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { clamp } from '~/styles/tools/clamp'
import { SiteMarqueeBlock } from '~/components/SiteMarqueeBlock'
import { BaseGrid } from '~/components/BaseGrid'
import { PostType, SEOType } from '~/types/microCMS'
import { HomeHeroHeader } from '~/components/HomeHeroHeader'

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

  const BlogArticleCards: JSX.Element[] = posts.slice(0, perPage).map((post) => {
    return <BlogArticleCard key={post.id} api={post} lv={3} />
  })

  return (
    <>
      <SiteHeadTags title={home.title} image={home.seo.image.url} />
      <HomeHeroHeader />
      <SectionWrapper>
        <BaseSection title={'Posts'}>
          <BaseGrid gap={clamp(16, 32)} columnMin={'280px'} track={'fill'}>
            {BlogArticleCards}
          </BaseGrid>
          {BlogArticleCards.length === perPage && (
            <ButtonWrapper>
              <BaseLinkButton href={'/blog/'}>投稿をもっと見る</BaseLinkButton>
            </ButtonWrapper>
          )}
        </BaseSection>
        <SiteMarqueeBlock />
        <BaseSection title={'Categories'}>
          <div></div>
        </BaseSection>
      </SectionWrapper>
    </>
  )
}

const SectionWrapper = styled.div`
  background-color: var(--theme-background-default);
  isolation: isolate;
  position: relative;

  &::after {
    background-image: var(--theme-background-pattern);
    bottom: ${clamp(200, 280)};
    left: 0;
    position: absolute;
    top: ${`calc(${clamp(200, 280)} * -1) `};
    width: max(50%, 296px);
    z-index: -1;
  }
`

const ButtonWrapper = styled.p`
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
