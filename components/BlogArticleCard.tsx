import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { BaseIcon } from './BaseIcon'
import { PostType } from '~/types/microCMS'
import debounce from 'lodash/debounce'

type BlogArticleCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
}

export const BlogArticleCard: React.VFC<BlogArticleCardPropsType> = ({ api, lv }) => {
  const src: string = `${api.thumbnail ? api.thumbnail.url : api.category.image.url}?fit=crop&w=900&h=600`

  return (
    <article>
      <Link href={`/blog/[postId]`} as={`/blog/${api.id}`} passHref>
        <Container>
          <Description>
            {lv === 2 && <H2>{api.title}</H2>}
            {lv === 3 && <H3>{api.title}</H3>}
            {lv === 4 && <H4>{api.title}</H4>}
            <Meta>
              <dt className="VisuallyHidden">カテゴリ</dt>
              <Category>
                <BaseIcon type={'hash'} size={`${14 / 16}rem`} />
                {api.category.name}
              </Category>
              <dt className="VisuallyHidden">投稿日</dt>
              <Date>
                <time dateTime={api.createdAt}>{getDate(api.createdAt, 'en')}</time>
              </Date>
            </Meta>
          </Description>
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
        </Container>
      </Link>
    </article>
  )
}

const Container = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ImageWrapper = styled.div`
  background-color: var(--color-grayscale-3);
  order: -1;
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
    Container
  )}
`

const Description = styled.div`
  background-color: var(--theme-background-muted);
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: min(7.5%, 20px);
  position: relative;
  transition: background-color 0.3s;
  z-index: 1;

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

  ${hoverable(
    `
    background-color: var(--theme-postcard-hover);
  `,
    Container
  )}
`

const H2 = styled.h2`
  flex: 1;
  letter-spacing: 0.02em;
  line-height: var(--leading-relaxed);
`

const H3 = H2.withComponent('h3')
const H4 = H2.withComponent('h4')

const Meta = styled.dl`
  margin-top: 16px;
`

const Date = styled.dd`
  align-items: center;
  color: var(--theme-text-muted);
  font-family: var(--font-montserrat);
  margin-top: ${4 / 16}em;
`

const Category = styled.dd`
  align-items: center;
  color: var(--color-primary);
  letter-spacing: 0.02em;

  & .BaseIcon {
    margin-right: 0.25em;
  }
`
