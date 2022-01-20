import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import { client } from '~/libs/microCMS'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseSection } from '~/components/BaseSection'
import { BlogArticleCard } from '~/components/BlogArticleCard'
import { SiteHelmet } from '~/components/SiteHelmet'
import { clamp } from '~/styles/tools/clamp'
import { BaseGrid } from '~/components/BaseGrid'
import { PostType, SEOType } from '~/types/microCMS'
import { HomeHeroHeader } from '~/components/HomeHeroHeader'
import { breakpoints } from '~/constant/breakpoints'
import { AboutProfile } from '~/components/AboutProfile'
import { HomeAboutSection } from '~/components/HomeAboutSection'

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
      <SiteHelmet title={home.title} image={home.seo.image.url} />
      <HomeHeroHeader />
      <SectionWrapper>
        <HomeAboutSection />
        <BaseSection title={'Latest Posts'}>
          <BaseGrid gap={clamp(24, 32)} columnMin={clamp(212, 280)} track={'fill'}>
            {BlogArticleCards}
          </BaseGrid>
          {BlogArticleCards.length === perPage && (
            <ButtonWrapper>
              <BaseLinkButton href={'/blog/'}>投稿をもっと見る</BaseLinkButton>
            </ButtonWrapper>
          )}
        </BaseSection>
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
