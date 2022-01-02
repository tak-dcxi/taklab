import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

type BaseImagePropsType = {
  src: string
  x?: number
  y?: number
  alt?: string
  lazyload?: boolean
  objectFit?: 'cover' | 'contain'
}

export const BaseImage: React.VFC<BaseImagePropsType> = ({
  src,
  x = 3,
  y = 2,
  alt = '',
  lazyload = true,
  objectFit = 'cover',
}) => {
  return (
    <MyWrapper>
      <Image
        src={src}
        layout="responsive"
        width={x}
        height={y}
        decoding="async"
        loading={lazyload ? 'lazy' : 'eager'}
        alt={alt}
        objectFit={objectFit}
        quality={75}
      />
    </MyWrapper>
  )
}

const MyWrapper = styled.span`
  background-color: var(--grayscale-1);
  display: block;
`
