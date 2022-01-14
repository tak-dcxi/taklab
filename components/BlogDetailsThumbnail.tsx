import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'

type BlogDetailsThumbnailPropsType = {
  src: string
  alt: string
}

export const BlogDetailsThumbnail: React.VFC<BlogDetailsThumbnailPropsType> = ({ src, alt }) => {
  const generateThumbnail = (url: string): string => {
    return `${url}?fit=crop&w=1200&h=440`
  }

  const thumbnail: string = generateThumbnail(src)

  return (
    <MyRoot>
      <Image
        src={thumbnail}
        alt={`【サムネイル】${alt}`}
        layout="fill"
        decoding="async"
        loading="eager"
        priority
        objectFit="cover"
        quality={75}
      />
    </MyRoot>
  )
}

const MyRoot = styled.div`
  background-color: var(--color-grayscale-3);
  height: ${clamp(220, 440)};
  margin: auto;
  max-width: var(--max-width-default);
  position: relative;
`
