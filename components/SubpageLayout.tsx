import React from 'react'
import styled from 'styled-components'
import { BaseGutenberg } from '~/components/BaseGutenberg'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseContainer } from '~/components/BaseContainer'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SiteFirstView } from '~/components/SiteFirstView'
import { SiteLayout } from '~/components/SiteLayout'

type SubpageLayoutPropsType = {
  children: string
  title: string
  image?: string
  breadcrumbs: Array<{ [key: string]: string }>
}

export const SubpageLayout: React.VFC<SubpageLayoutPropsType> = ({ children, title, image, breadcrumbs }) => {
  return (
    <SiteLayout>
      <SiteHeadTags title={title} />
      <SiteFirstView headline={title} image={image} />
      <BaseContainer>
        <MyContainer>
          <SiteBreadcrumbs lists={breadcrumbs} />
          <BaseGutenberg>{children}</BaseGutenberg>
          <MyButtonWrapper>
            <BaseLinkButton href="/">トップページへ戻る</BaseLinkButton>
          </MyButtonWrapper>
        </MyContainer>
      </BaseContainer>
    </SiteLayout>
  )
}

const MyContainer = styled.div`
  padding-bottom: 80px;

  & > * + * {
    margin-top: 80px;
  }
`

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`
