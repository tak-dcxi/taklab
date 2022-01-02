import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseHeading1 } from '~/components/BaseHeading1'
import { HomeRequestForm } from '~/components/HomeRequestForm'
import { SiteFirstView } from '~/components/SiteFirstView'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SiteLayout } from '~/components/SiteLayout'

type HomePagePropsType = {
  title: string
  image: string
  perPage: number
  postCards: React.ReactNode[]
  eventCards: React.ReactNode[]
}

export const HomeLayout: React.VFC<HomePagePropsType> = ({ title, image, perPage, postCards, eventCards }) => {
  return (
    <SiteLayout>
      <SiteHeadTags />
      <SiteFirstView headline={title} image={image} />
      <BaseContainer>
        <MyContents>
          <MySection>
            <BaseHeading1 lv={2}>Our blog posts</BaseHeading1>
            <MyArticleList>{postCards}</MyArticleList>
            {postCards.length === perPage && (
              <MyButtonWrapper>
                <BaseLinkButton href="/posts/">投稿をもっと見る</BaseLinkButton>
              </MyButtonWrapper>
            )}
          </MySection>
          <MySection>
            <BaseHeading1 lv={2}>Our Events</BaseHeading1>
            <MyArticleList>{eventCards}</MyArticleList>
            {eventCards.length === perPage && (
              <MyButtonWrapper>
                <BaseLinkButton href="/events/">イベントをもっと見る</BaseLinkButton>
              </MyButtonWrapper>
            )}
          </MySection>
          <MySection>
            <BaseHeading1 lv={2}>Request</BaseHeading1>
            <HomeRequestForm />
          </MySection>
        </MyContents>
      </BaseContainer>
    </SiteLayout>
  )
}

const MyContents = styled.div`
  padding: 100px 0;

  & > * + * {
    margin-top: 100px;
  }
`

const MySection = styled.section`
  & > * + * {
    margin-top: 48px;
  }
`

const MyArticleList = styled.div`
  & > * + * {
    margin-top: 16px;
  }
`

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`
