import React from 'react'
import styled from 'styled-components'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { HomeSection } from '~/components/HomeSection'
import { HomeFirstView } from '~/components/HomeFirstView'
import { PostGrid } from '~/components/PostGrid'
import { SiteHeadTags } from '~/components/SiteHeadTags'

export type HomeAPIType = {
  id: 'home'
  title: string
  image: {
    url: string
    height: number
    width: number
  }
  image_alt: string
}

type HomePagePropsType = {
  api: HomeAPIType
  perPage: number
  postCards: React.ReactNode[]
}

export const HomeLayout: React.VFC<HomePagePropsType> = ({ api, perPage, postCards }) => {
  return (
    <>
      <SiteHeadTags />
      <HomeFirstView image={api.image} alt={api.image_alt} />
      <HomeSection title={'posts'}>
        <PostGrid>{postCards}</PostGrid>
        {postCards.length === perPage && (
          <MyButtonWrapper>
            <BaseLinkButton href={'/posts/'}>投稿をもっと見る</BaseLinkButton>
          </MyButtonWrapper>
        )}
      </HomeSection>
      <HomeSection title={'Popular Posts'}>
        <div></div>
      </HomeSection>
    </>
  )
}

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`
