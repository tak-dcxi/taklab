import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type BlogArticlePageThumbnailPropsType = {
  src: string
}

export const BlogArticlePageThumbnail: React.VFC<BlogArticlePageThumbnailPropsType> = ({ src }) => {
  const image: string = `${src}?fit=crop&w=1200&h=440`
  const dummyImage: string = `${src}?fit=crop&w=1200&h=440&blend-mode=normal&blend=AA1C1C1C&blur=100`

  return (
    <Root>
      <ImageWrapper>
        <Image
          src={image}
          alt={''}
          layout="fill"
          decoding="async"
          loading="eager"
          priority
          objectFit="cover"
          quality={75}
        />
      </ImageWrapper>
      <div>
        <Image
          src={dummyImage}
          alt={''}
          layout="fill"
          decoding="async"
          loading="eager"
          priority
          role="presentation"
          objectFit="cover"
          quality={10}
        />
      </div>
    </Root>
  )
}

const Root = styled.div`
  background-color: var(--color-grayscale-3);
  display: grid;
  height: ${clamp(220, 440)};
  overflow: hidden;

  & > * {
    grid-area: 1 / -1;
    height: 100%;
    position: relative;
    width: 100%;
  }
`

const ImageWrapper = styled.div`
  box-shadow: 0 0 20px -6px rgba(0, 0, 0, 0.6);
  height: 100%;
  margin: auto;
  max-width: var(--max-width-default);
  z-index: 1;
`
