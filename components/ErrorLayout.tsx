import React from 'react'
import styled from 'styled-components'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseContainer } from '~/components/BaseContainer'
import { SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SiteFirstView } from '~/components/SiteFirstView'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { SiteLayout } from '~/components/SiteLayout'

type ErrorLayoutPropsType = {
  statusCode: number
}

export const ErrorLayout: React.VFC<ErrorLayoutPropsType> = ({ statusCode }) => {
  const title = statusCode === 404 ? '404 Not Found' : '500 Internal Server Error'

  const breadcrumbs: { [key: string]: string }[] = [
    {
      string: 'トップページ',
      path: '/',
    },
    {
      string: title,
    },
  ]

  return (
    <SiteLayout>
      <SiteHeadTags title={title} noindex />
      <SiteFirstView headline={title} />
      <BaseContainer>
        <SiteBreadcrumbs lists={breadcrumbs} />
        <MyContents>
          {statusCode === 404 ? (
            <MyText>このページはすでに削除されているか、URLが間違っている可能性があります。</MyText>
          ) : (
            <MyText>アクセスしようとしたページは表示できませんでした。</MyText>
          )}
          <MyButtonWrapper>
            <BaseLinkButton href={'/'}>トップページへ戻る</BaseLinkButton>
          </MyButtonWrapper>
        </MyContents>
      </BaseContainer>
    </SiteLayout>
  )
}

const MyContents = styled.div`
  padding: 80px 0;

  & > * + * {
    margin-top: 80px;
  }
`

const MyText = styled.p`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`
