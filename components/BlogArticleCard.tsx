import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { BaseIcon } from './BaseIcon'
import { PostType } from '~/types/microCMS'

type BlogArticleCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
}

export const BlogArticleCard: React.VFC<BlogArticleCardPropsType> = ({ api, lv }) => {
  const src: string = `${api.thumbnail ? api.thumbnail.url : api.category.image.url}?fit=crop&w=900&h=600`

  return (
    <article>
      <Link href={`/blog/[postId]`} as={`/blog/${api.id}`} passHref>
        <MyLink>
          {lv === 2 && <H2>{api.title}</H2>}
          {lv === 3 && <H3>{api.title}</H3>}
          {lv === 4 && <H4>{api.title}</H4>}
          <ImageWrapper>
            <Image
              src={src}
              layout={'responsive'}
              width={'3'}
              height={'2'}
              decoding={'async'}
              loading={'lazy'}
              alt={''}
              objectFit={'cover'}
              quality={75}
            />
          </ImageWrapper>
          <MetaWrapper>
            <Meta>
              <dt className="VisuallyHidden">投稿日</dt>
              <dd>
                <time dateTime={api.createdAt}>{getDate(api.createdAt, 'en')}</time>
              </dd>
              <dt className="VisuallyHidden">カテゴリ</dt>
              <dd>#{api.category.name}</dd>
            </Meta>
          </MetaWrapper>
        </MyLink>
      </Link>
    </article>
  )
}

const duration: string = '0.3s'

const MyLink = styled.a`
  display: grid;
`

const H2 = styled.h2`
  letter-spacing: 0.02em;
  line-height: var(--leading-relaxed);
  margin-top: ${4 / 16}rem;
  transition: color ${duration};

  ${hoverable(
    `
    color: var(--color-primary);
    `,
    MyLink
  )}
`

const H3 = H2.withComponent('h3')
const H4 = H2.withComponent('h4')

const ImageWrapper = styled.div`
  background-color: var(--color-grayscale-2);
  order: -2;
  overflow: hidden;
  position: relative;
  transition: opacity ${duration};

  & img {
    transition: transform ${duration};
  }

  ${hoverable(
    `
    opacity .9;

    & img {
      transform: scale(1.1);
    }
  `,
    MyLink
  )}
`

const MetaWrapper = styled.div`
  color: var(--theme-text-muted);
  font-family: var(--font-designed);
  margin-top: ${12 / 16}rem;
  order: -1;
  overflow: hidden;
`

const Meta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin: ${(6 / 16) * -1}rem;

  & > * {
    margin: ${6 / 16}rem;
  }
`
