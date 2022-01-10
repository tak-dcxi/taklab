import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { BaseLogo } from '~/components/BaseLogo'

type HomeFirstViewPropsType = {
  image: {
    url: string
    height: number
    width: number
  }
  alt: string
}

export const HomeFirstView: React.VFC<HomeFirstViewPropsType> = ({ image, alt }) => {
  return (
    <MyFirstView>
      <MyHeadline>
        <BaseLogo size={`max(${280 / 16}rem, min(14.6154rem + 12.8205vw, ${480 / 16}rem))`} />
      </MyHeadline>
      <MyImage>
        <Image
          src={image.url}
          alt={alt}
          layout="fill"
          decoding="async"
          loading="eager"
          priority
          objectFit="cover"
          quality={75}
        />
      </MyImage>
    </MyFirstView>
  )
}

const MyFirstView = styled.header`
  background-color: var(--color-grayscale-2);
  display: grid;
  isolation: isolate;
  margin: auto;
  min-height: max(440px, min(380px + 18.5185vw, 640px)); /* clamp() */
  overflow: hidden;
  place-items: center;
  position: relative;
  width: min(100%, 1920px);

  & > * {
    grid-area: 1 / -1;
    position: relative;
  }

  &::after {
    background: rgba(0, 0, 0, 0.4) radial-gradient(rgba(0, 0, 0, 0.6) 30%, transparent 0) center center / 4px 4px;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`

const MyHeadline = styled.h1`
  color: var(--color-grayscale-7);
  z-index: 1;
`

const MyImage = styled.div`
  height: 100%;
  width: 100%;
`
