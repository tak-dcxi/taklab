import React from 'react'
import { NextPage } from 'next'
import { client } from '~/libs/microCMS'
import { SubpageTemplate } from '~/components/SubpageTemplate'
import { BaseContainer } from '~/components/BaseContainer'
import { SEOType } from '~/types/microCMS'

type AboutAPIType = {
  id: 'about'
  title: string
  seo: SEOType
}

type AboutPagePropsType = {
  page: AboutAPIType
}

const AboutPage: NextPage<AboutPagePropsType> = ({ page }) => {
  return (
    <SubpageTemplate title={page.title} description={page.seo.description} image={page.seo.image.url}>
      <BaseContainer>作成中</BaseContainer>
    </SubpageTemplate>
  )
}

export const getStaticProps = async () => {
  const page = await client.get({ endpoint: 'pages', contentId: 'about' })

  return {
    props: {
      page: page,
    },
    revalidate: 1,
  }
}

export default AboutPage
