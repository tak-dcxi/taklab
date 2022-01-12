import React from 'react'
import { PostType } from '~/libs/microCMS'
import Link from 'next/link'
import styled from 'styled-components'
import { BaseNoimage } from '~/components/BaseNoimage'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { BaseIcon } from './BaseIcon'

type PostCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
}

export const PostCard: React.VFC<PostCardPropsType> = ({ api, lv }) => {
  return (
    <article>
      <Link href={`/blog/${api.id}`} passHref>
        <MyContents>
          {lv === 2 && <MyH2>{api.title}</MyH2>}
          {lv === 3 && <MyH3>{api.title}</MyH3>}
          {lv === 4 && <MyH4>{api.title}</MyH4>}
          <MyImageWrapper>
            <BaseNoimage />
          </MyImageWrapper>
          <MyCategory>
            <dt className="VisuallyHidden">カテゴリ</dt>
            <dd>{api.category.name}</dd>
          </MyCategory>
          <MyDate>
            <dt className="VisuallyHidden">投稿日</dt>
            <dd>
              <BaseIcon type={'calendar'} />
              <time dateTime={api.createdAt}>{getDate(api.createdAt, 'en')}</time>
            </dd>
          </MyDate>
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
  padding: 24px;
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
  margin: -24px -24px 0;
  order: -2;
`

const MyH2 = styled.h2`
  font-size: var(--fontsize-3);
  grid-area: card-title;
  letter-spacing: 0.02em;
  line-height: var(--leading-relaxed);
  margin-top: 4px;
`

const MyH3 = MyH2.withComponent('h3')
const MyH4 = MyH2.withComponent('h4')

const MyCategory = styled.dl`
  margin-top: 20px;
  order: -1;

  & > dd {
    color: var(--color-primary);
    letter-spacing: 0.02em;
  }
`

const MyDate = styled.dl`
  margin-top: auto;
  padding-top: 12px;

  & > dd {
    align-items: center;
    color: var(--theme-text-weak);
    display: inline-flex;
    font-family: var(--font-montserrat);
  }

  & svg {
    margin-right: 0.5em;
  }
`
