import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import { client } from '~/libs/microCMS'
import { BlogArticleCard } from '~/components/BlogArticleCard'
import { SiteHelmet } from '~/components/SiteHelmet'
import { CategoriesType, PostType, SEOType } from '~/types/microCMS'
import { HomeHeroHeader } from '~/components/HomeHeroHeader'
import { HomeAboutSection } from '~/components/HomeAboutSection'
import { HomeLatestPostsSection } from '~/components/HomeLatestPostsSection'
import { HomeContactSection } from '~/components/HomeContactSection'

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
  categories: CategoriesType[]
}

const HomePage: NextPage<HomePropsType> = ({ home, posts, categories }) => {
  const perPage: number = 6

  const BlogArticleCards: JSX.Element[] = posts.slice(0, perPage).map((post) => {
    return <BlogArticleCard key={post.id} api={post} lv={3} />
  })

  return (
    <>
      <SiteHelmet title={home.title} image={home.seo.image.url} />
      <HomeHeroHeader />
      <SectionWrapper>
        <HomeLatestPostsSection appendButton={BlogArticleCards.length === perPage}>
          {BlogArticleCards}
        </HomeLatestPostsSection>
        <HomeAboutSection />
        <HomeContactSection />
      </SectionWrapper>
    </>
  )
}

const SectionWrapper = styled.div`
  background-color: var(--theme-background-default);
  isolation: isolate;
`

export const getStaticProps = async () => {
  const home = await client.get({ endpoint: 'pages', contentId: 'home' })

  const posts = await client.get({
    endpoint: 'blog',
    queries: { limit: 6, offset: 0 },
  })

  const categories = await client.get({ endpoint: 'blog-category' })

  return {
    props: {
      home: home,
      posts: posts.contents,
      categories: categories.contents,
    },
    revalidate: 1,
  }
}

export default HomePage
