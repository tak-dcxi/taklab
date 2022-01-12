import React from 'react'
import styled from 'styled-components'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseContainer } from '~/components/BaseContainer'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SubpageHeader } from '~/components/SubpageHeader'
import { SiteHeadTags } from '~/components/SiteHeadTags'
import { BaseTweetEmbed } from './BaseTweetEmbed'

type ErrorPageTemplatePropsType = {
  statusCode: number
}

export const ErrorPageTemplate: React.VFC<ErrorPageTemplatePropsType> = ({ statusCode }) => {
  const title = statusCode === 404 ? '404 Not Found' : '500 Internal Server Error'

  const breadcrumbs: BreadcrumbsType[] = [
    {
      string: title,
    },
  ]

  return (
    <>
      <SiteHeadTags title={title} isErrorPage />
      <SubpageHeader headline={title} />
      <SiteBreadcrumbs items={breadcrumbs} />
      <BaseContainer>
        <MyContents>
          <MySentence>
            <p className="emoji" role="img" aria-label="ごめんなさい">
              🙇‍♂️
            </p>
            {statusCode === 404 ? (
              <p>このページはすでに削除されているか、URLが間違っている可能性があります。</p>
            ) : (
              <p>アクセスしようとしたページは表示できませんでした。</p>
            )}
            <BaseTweetEmbed id={'1265338592584327169'} />
            <p>過去にこんなツイートがバズりました。</p>
          </MySentence>
          <MyButtonWrapper>
            <BaseLinkButton href={'/'}>トップページへ進む</BaseLinkButton>
          </MyButtonWrapper>
        </MyContents>
      </BaseContainer>
    </>
  )
}

const MyContents = styled.div`
  padding: var(--contents-block-padding);

  & > * + * {
    margin-top: 48px;
  }
`

const MySentence = styled.div`
  line-height: var(--leading-loose);
  text-align: center;

  & > * {
    margin-left: auto;
    margin-right: auto;
  }

  & > * + * {
    margin-top: 2em;
  }

  & .emoji {
    font-family: var(--font-emoji);
    font-size: ${56 / 16}rem;
    line-height: 1;
  }
`

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`
