import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { BaseIcon } from './BaseIcon'
import { PostType } from '~/types/microCMS'

type BlogArticleCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
}

export const BlogArticleCard: React.VFC<BlogArticleCardPropsType> = ({ api, lv }) => {
  const thumbnail: string = api.thumbnail ? api.thumbnail.url : api.category.image.url

  return (
    <article>
      <Link href={`/blog/[category]/[id]`} as={`/blog/${api.category.id}/${api.id}`} passHref>
        <Contents>
          {lv === 2 && <H2>{api.title}</H2>}
          {lv === 3 && <H3>{api.title}</H3>}
          {lv === 4 && <H4>{api.title}</H4>}
          <ImageWrapper>
            <Image
              src={thumbnail}
              layout={'responsive'}
              width={3}
              height={2}
              decoding={'async'}
              loading={'lazy'}
              alt={''}
              objectFit={'cover'}
              quality={75}
            />
          </ImageWrapper>
          <Category>
            <dt className="VisuallyHidden">カテゴリ</dt>
            <dd>
              <BaseIcon type={'hash'} size={`${14 / 16}rem`} />
              {api.category.name}
            </dd>
          </Category>
          <Date>
            <dt className="VisuallyHidden">投稿日</dt>
            <dd>
              <time dateTime={api.createdAt}>{getDate(api.createdAt, 'en')}</time>
            </dd>
          </Date>
        </Contents>
      </Link>
    </article>
  )
}

const Contents = styled.a`
  background-color: var(--theme-background-muted);
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

const ImageWrapper = styled.div`
  background-color: var(--color-grayscale-3);
  grid-area: card-image;
  margin: -24px -24px 0;
  order: -2;
  overflow: hidden;

  & > * {
    transition: transform 0.3s;
  }

  ${hoverable(
    `
    & > * {
      transform: scale(1.1);
    }
  `,
    Contents
  )}
`

const H2 = styled.h2`
  font-size: var(--fontsize-3);
  grid-area: card-title;
  letter-spacing: 0.02em;
  line-height: var(--leading-relaxed);
  margin-top: 4px;
`

const H3 = H2.withComponent('h3')
const H4 = H2.withComponent('h4')

const Category = styled.dl`
  color: var(--color-primary);
  letter-spacing: 0.02em;
  margin-top: 20px;
  order: -1;

  & > dd {
    align-items: center;
    display: inline-flex;
  }

  & .BaseIcon {
    margin-right: 0.25em;
  }
`

const Date = styled.dl`
  margin-top: auto;
  padding-top: 12px;

  & > dd {
    align-items: center;
    color: var(--theme-text-muted);
    display: inline-flex;
    font-family: var(--font-montserrat);
  }

  & .BaseIcon {
    margin-right: 0.5em;
  }
`
