import React from 'react'
import Image from 'next/image'
import { PostType } from '~/libs/microCMS'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { getDate } from '~/utils/getDate'

type PostCardPropsType = {
  api: PostType
  lv: 2 | 3 | 4
}

export const PostCard: React.VFC<PostCardPropsType> = ({ api, lv }) => {
  const thumbnail: string = api.thumbnail ? api.thumbnail.url : api.category.image.url

  return (
    <article>
      <Link href={`/blog/[id]`} as={`/blog/${api.id}`} passHref>
        <MyContents>
          {lv === 2 && <MyH2>{api.title}</MyH2>}
          {lv === 3 && <MyH3>{api.title}</MyH3>}
          {lv === 4 && <MyH4>{api.title}</MyH4>}
          <MyImageWrapper>
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
          </MyImageWrapper>
          <MyCategory>
            <dt className="VisuallyHidden">カテゴリ</dt>
            <dd>{api.category.name}</dd>
          </MyCategory>
          <MyDate>
            <dt className="VisuallyHidden">投稿日</dt>
            <dd>
              <time dateTime={api.createdAt}>{getDate(api.createdAt, 'en')}</time>
            </dd>
          </MyDate>
        </MyContents>
      </Link>
    </article>
  )
}

const MyContents = styled.a`
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

const MyImageWrapper = styled.div`
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
    MyContents
  )}
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
    color: var(--theme-text-muted);
    display: inline-flex;
    font-family: var(--font-montserrat);
  }

  & svg {
    margin-right: 0.5em;
  }
`
