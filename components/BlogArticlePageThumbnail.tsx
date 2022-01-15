import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type BlogArticlePageThumbnailPropsType = {
  src: string
}

export const BlogArticlePageThumbnail: React.VFC<BlogArticlePageThumbnailPropsType> = ({ src }) => {
  const image: string = `${src}?fit=crop&w=1200&h=440`

  return (
    <Root>
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
    </Root>
  )
}

const Root = styled.div`
  background-color: var(--color-grayscale-3);
  height: ${clamp(220, 440)};
  margin: auto;
  max-width: var(--max-width-default);
  position: relative;
`
