import React from 'react'
import { PostType } from '~/libs/microCMS'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { BaseImage } from '~/components/BaseImage'
import { BaseNoimage } from '~/components/BaseNoimage'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'

type PostCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
}

export const PostCard: React.VFC<PostCardPropsType> = ({ api, lv }) => {
  return (
    <article>
      <Link href={`/posts/${api.id}`} passHref>
        <MyContents>
          {lv === 2 && <MyH2>{api.title}</MyH2>}
          {lv === 3 && <MyH3>{api.title}</MyH3>}
          {lv === 4 && <MyH4>{api.title}</MyH4>}
          <MyImageWrapper>
            <BaseNoimage />
          </MyImageWrapper>
          <MyCategory>
            <dt className="VisuallyHidden">カテゴリ</dt>
            {api.category.map((item, index) => {
              return <dd key={index}>{item}</dd>
            })}
          </MyCategory>
          <MyDate>
            <dt className="VisuallyHidden">投稿日</dt>
            <dd>
              <time dateTime={api.createdAt}>{getDate(api.createdAt)}</time>
            </dd>
          </MyDate>
          <MyTags>
            <dt className="VisuallyHidden">タグ</dt>
            {api.category.map((item, index) => {
              return <dd key={index}>#{item}</dd>
            })}
          </MyTags>
        </MyContents>
      </Link>
    </article>
  )
}

const MyContents = styled.a`
  background-color: var(--theme-background-weak);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  position: relative;
  transition: background-color 0.3s;

  &::after {
    background-color: var(--color-primary);
    bottom: 0;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    content: '';
    height: 12px;
    position: absolute;
    right: 0;
    width: 12px;
  }

  ${hoverable(`
    background-color: var(--theme-postcard-hover);
  `)}
`

const MyImageWrapper = styled.div`
  grid-area: card-image;
  margin: -20px -20px 0;
  order: -2;
`

const MyH2 = styled.h2`
  font-size: var(--fontsize-3);
  font-weight: bold;
  grid-area: card-title;
  letter-spacing: 0.02em;
  line-height: var(--leading-relaxed);
  margin-top: 8px;
`

const MyH3 = MyH2.withComponent('h3')
const MyH4 = MyH2.withComponent('h4')

const MyCategory = styled.dl`
  margin-top: 20px;
  order: -1;

  & > dd {
    color: var(--color-primary);
    display: inline-block;
    font-family: var(--font-montserrat);
    font-size: var(--fontsize-2);
    letter-spacing: 0.02em;
    line-height: var(--leading-x-tight);
  }
`

const MyDate = styled.dl`
  margin-top: auto;
  padding-top: 16px;

  & > dd {
    color: var(--theme-text-2);
    font-family: var(--font-montserrat);
    font-size: var(--fontsize-2);
    line-height: var(--leading-x-tight);
  }
`

const MyTags = styled.dl`
  display: flex;
  margin: 4px -4px -4px;

  & > dd {
    color: var(--theme-text-2);
    font-size: var(--fontsize-2);
    line-height: var(--leading-x-tight);
    margin: 4px;
  }
`
