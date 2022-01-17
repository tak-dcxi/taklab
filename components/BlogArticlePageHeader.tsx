import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { BaseIcon } from './BaseIcon'
import { clamp } from '~/styles/tools/clamp'

type BlogArticlePageHeaderPropsType = {
  title: string
  category: {
    id: string
    name: string
  }
  publishedAt: string
  updatedAt: string
  image: {
    url: string
    height: number
    width: number
  }
}

export const BlogArticlePageHeader: React.VFC<BlogArticlePageHeaderPropsType> = ({
  title,
  category,
  publishedAt,
  updatedAt,
  image,
}) => {
  return (
    <Root>
      <Description>
        <Headline>{title}</Headline>
        <DateWrapper>
          <Date>
            <dt className="VisuallyHidden">公開日</dt>
            <dd>
              <BaseIcon type={'clock'} />
              <time
                itemProp="datePublished"
                // @ts-ignore
                content={publishedAt}
                dateTime={publishedAt}
              >
                {getDate(publishedAt, 'en')}
              </time>
            </dd>
            <dt className="VisuallyHidden">最終更新日</dt>
            <dd>
              <BaseIcon type={'refresh'} />
              <time
                itemProp="dateModified"
                // @ts-ignore
                content={updatedAt}
                dateTime={updatedAt}
              >
                {getDate(updatedAt, 'en')}
              </time>
            </dd>
          </Date>
        </DateWrapper>
        <dl>
          <dt className="VisuallyHidden">カテゴリ</dt>
          <dd>
            <Link href={`/blog/${category.id}`} passHref>
              <Category>{category.name}</Category>
            </Link>
          </dd>
        </dl>
      </Description>
      <MyImageWrapper>
        <Image
          src={image.url}
          alt=""
          layout="fill"
          decoding="async"
          loading="eager"
          priority
          objectFit="cover"
          quality={75}
        />
      </MyImageWrapper>
    </Root>
  )
}

const Root = styled.header`
  background-image: var(--theme-background-pattern);
  border-bottom: 1px solid var(--theme-divider);
  border-top: 1px solid var(--theme-divider);
  display: grid;
  isolation: isolate;
  min-height: ${clamp(220, 440)};
  place-items: center;

  & > * {
    grid-area: 1 / -1;
  }
`

const Description = styled.div`
  align-items: center;
  color: var(--color-grayscale-7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px ${clamp(16, 32)};

  & > * + * {
    margin-top: 16px;
  }
`

const Headline = styled.h1`
  font-size: clamp(1.125rem, 1.0139rem + 0.5556vw, 1.5rem);
  line-height: var(--leading-relaxed);
  margin-bottom: 24px;
`

const Category = styled.a`
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  display: inline-block;
  line-height: 1;
  padding: 4px 8px;
  transition: background-color 0.3s, color 0.3s;

  ${hoverable(`
    background-color: var(--color-primary);
    color: var(--color-grayscale-7);
  `)}
`

const DateWrapper = styled.div`
  overflow: hidden;
`

const Date = styled.dl`
  display: flex;
  flex-wrap: wrap;
  font-family: var(--font-montserrat);
  margin: -8px;

  & > dd {
    align-items: center;
    display: inline-flex;
    flex-shrink: 0;
    margin: 8px;
  }

  & svg {
    margin-right: 0.5em;
  }
`

const MyImageWrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  z-index: -1;

  &::after {
    background: rgba(0, 0, 0, 0.5) radial-gradient(rgba(0, 0, 0, 0.75) 30%, transparent 0) center center / 4px 4px;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`
