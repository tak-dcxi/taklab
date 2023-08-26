import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { PostType } from '~/types/microCMS'

type CommonPropsType = {
  appendCategory?: boolean
}

type BlogArticleCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
} & CommonPropsType

export const BlogArticleCard: React.VFC<BlogArticleCardPropsType> = ({ api, lv, appendCategory = true }) => {
  const src: string = `${api.thumbnail ? api.thumbnail.url : api.category.image.url}?fit=crop&w=900&h=600`

  return (
    <Root {...{ appendCategory }}>
      <LinkToArticle href={`/blog/${api.id}`} passHref>
        <div>
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
          <PublishedAt>
            <dt className="VisuallyHidden">投稿日</dt>
            <dd>
              <time dateTime={api.createdAt}>{getDate(api.createdAt, 'en')}</time>
            </dd>
          </PublishedAt>
        </div>
      </LinkToArticle>

      {appendCategory && (
        <Category>
          <dt className="VisuallyHidden">カテゴリ</dt>
          <dd>
            <LinkToCategory href={`/blog/category/${api.category.id}/1`} passHref>
              [{api.category.name}]
            </LinkToCategory>
          </dd>
        </Category>
      )}
    </Root>
  )
}

const duration: string = '0.3s'

const Root = styled.article<CommonPropsType>`
  ${(props) =>
    props.appendCategory &&
    css`
      display: grid;
      gap: ${12 / 16}rem;
      grid-template-rows: auto 1fr;
    `}
`

const LinkToArticle = styled(Link)`
  & > div {
    display: grid;
  }
`

const H2 = styled.h2`
  letter-spacing: var(--letter-spacing-text);
  line-height: var(--leading-relaxed);
  margin-top: ${4 / 16}rem;
  transition: color ${duration};

  ${hoverable(
    `
    color: var(--color-primary);
  `,
    LinkToArticle
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
    LinkToArticle
  )}
`

const Category = styled.dl`
  align-self: end;
  color: var(--theme-text-muted);
  font-family: var(--font-designed);
`

const LinkToCategory = styled(Link)`
  position: relative;
  transition: color ${duration};

  &::after {
    background-color: var(--color-primary);
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
    transform-origin: left;
    transition: transform ${duration};
  }

  ${hoverable(`
    color: var(--color-primary);

    &::after {
      transform: scaleX(0);
    }
  `)}
`

const PublishedAt = styled.dl`
  color: var(--theme-text-muted);
  font-family: var(--font-designed);
  margin-top: ${12 / 16}rem;
  order: -1;
`
