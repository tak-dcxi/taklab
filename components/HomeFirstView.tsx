import React, { useState, useEffect } from 'react'
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
  const [showBlurImage, setShowBlurImage] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = (): void => setShowBlurImage(window.matchMedia('(min-width: 1920px)').matches)

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <MyRoot>
      <MyHeadline>
        <BaseLogo size={`clamp(${280 / 16}rem, 14.6154rem + 12.8205vw, ${480 / 16}rem)`} />
      </MyHeadline>
      {showBlurImage && (
        <MyBlurImage aria-hidden="true">
          <Image
            src={image.url}
            alt=""
            layout="fill"
            decoding="async"
            loading="eager"
            priority
            objectFit="cover"
            role="presentation"
            quality={10}
          />
        </MyBlurImage>
      )}
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
    </MyRoot>
  )
}

const MyRoot = styled.header`
  background-color: var(--color-grayscale-2);
  display: grid;
  isolation: isolate;
  min-height: clamp(440px, 380px + 18.5185vw, 640px);
  overflow: hidden;
  place-items: center;
  position: relative;

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
  margin: auto;
  width: min(100%, 1920px);
`

const MyBlurImage = styled.div`
  filter: blur(40px);
  height: 100%;
  width: 100%;
`
