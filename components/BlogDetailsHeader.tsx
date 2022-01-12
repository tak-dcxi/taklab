import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'
import { BaseIcon } from './BaseIcon'

type BlogDetailsHeaderPropsType = {
  title: string
  category: {
    id: string
    name: string
  }
  publishedAt: string
  updatedAt: string
}

export const BlogDetailsHeader: React.VFC<BlogDetailsHeaderPropsType> = ({
  title,
  category,
  publishedAt,
  updatedAt,
}) => {
  return (
    <MyRoot>
      <MyHeadline>{title}</MyHeadline>
      <MyDateWrapper>
        <MyDate>
          <dt className="VisuallyHidden">公開日</dt>
          <dd>
            <BaseIcon type={'calendar'} />
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
        </MyDate>
      </MyDateWrapper>
      <dl>
        <dt className="VisuallyHidden">カテゴリ</dt>
        <dd>
          <Link href={`/blog/${category.id}`} passHref>
            <MyCategory>{category.name}</MyCategory>
          </Link>
        </dd>
      </dl>
    </MyRoot>
  )
}

const MyRoot = styled.header`
  align-items: center;
  background-image: var(--theme-background-pattern);
  border-bottom: 1px solid var(--theme-divider);
  border-top: 1px solid var(--theme-divider);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: max(220px, min(8.0556rem + 22.2222vw, 440px));
  padding: 48px max(16px, min(11px + 1.4815vw, 32px));

  & > * + * {
    margin-top: 16px;
  }
`

const MyHeadline = styled.h1`
  font-size: clamp(1.125rem, 1.0139rem + 0.5556vw, 1.5rem);
  line-height: var(--leading-relaxed);
`

const MyCategory = styled.a`
  background-color: var(--theme-background-default);
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

const MyDateWrapper = styled.div`
  overflow: hidden;
`

const MyDate = styled.dl`
  color: var(--theme-text-weak);
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
