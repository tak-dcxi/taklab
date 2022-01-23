import React from 'react'
import styled from 'styled-components'
import { BaseLinkButton } from '~/components/BaseLinkButton'
import { BaseCenter } from '~/components/BaseCenter'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SubpageHeader } from '~/components/SubpageHeader'
import { SiteHelmet } from '~/components/SiteHelmet'

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
      <SiteHelmet title={title} isErrorPage />
      <SiteBreadcrumbs items={breadcrumbs} />
      <SubpageHeader headline={title} />
      <BaseCenter>
        <Contents>
          <Sentence>
            <p className="emoji" role="img" aria-label="ごめんなさい">
              🙇‍♂️
            </p>
            {statusCode === 404 ? (
              <p>このページはすでに削除されているか、URLが間違っている可能性があります。</p>
            ) : (
              <p>アクセスしようとしたページは表示できませんでした。</p>
            )}
          </Sentence>
          <ButtonWrapper>
            <BaseLinkButton href={'/'}>トップページへ進む</BaseLinkButton>
          </ButtonWrapper>
        </Contents>
      </BaseCenter>
    </>
  )
}

const Contents = styled.div`
  padding: var(--padding-block-contents) 0;

  & > * + * {
    margin-top: 48px;
  }
`

const Sentence = styled.div`
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

const ButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`
