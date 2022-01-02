import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BaseImage } from '~/components/BaseImage'
import { BaseNoimage } from '~/components/BaseNoimage'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'

type ArticleCardPropsType = {
  title: string
  lv: 2 | 3 | 4
  description: string
  image: string
  author?: string
  date?: string
  customfield?: string
  href: string
}

export const ArticleCard: React.VFC<ArticleCardPropsType> = ({
  title,
  lv,
  description,
  image,
  author,
  date,
  customfield,
  href,
}) => {
  return (
    <article>
      <Link href={href} passHref>
        <MyContents>
          {lv === 2 && <MyH2>{title}</MyH2>}
          {lv === 3 && <MyH3>{title}</MyH3>}
          {lv === 4 && <MyH4>{title}</MyH4>}
          <MyImageWrapper>
            {image ? (
              <BaseImage src={image['media_details'].sizes.medium['source_url']} lazyload={false} />
            ) : (
              <BaseNoimage />
            )}
          </MyImageWrapper>
          <MyDescription dangerouslySetInnerHTML={{ __html: description }}></MyDescription>
          <MyMeta>
            {author && date && (
              <p>
                Posted by {author} on <time dateTime={date}>{getDate(date)}</time>
              </p>
            )}
            {!author && date && (
              <p>
                Posted on <time dateTime={date}>{getDate(date)}</time>
              </p>
            )}
            {customfield && <p>{customfield}</p>}
          </MyMeta>
        </MyContents>
      </Link>
    </article>
  )
}

const MyContents = styled.a`
  background-color: var(--grayscale-6);
  border: 1px solid var(--boundary-color-muted);
  display: grid;
  gap: 12px 32px;
  grid-template-areas:
    'card-image card-headline'
    'card-image card-desc'
    'card-image card-date'
    'card-image .';
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto auto auto 1fr;
  padding: 24px;
  transition: background-color 0.3s;

  ${hoverable(`
    background-color: var(--grayscale-4);
  `)}
`

const MyImageWrapper = styled.div`
  grid-area: card-image;
`

const MyH2 = styled.h2`
  font-size: var(--fsize-5);
  grid-area: card-headline;
`

const MyH3 = MyH2.withComponent('h3')

const MyH4 = MyH2.withComponent('h4')

const MyDescription = styled.div`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  grid-area: card-desc;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const MyMeta = styled.div`
  grid-area: card-date;
`
