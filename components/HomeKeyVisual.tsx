import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { BaseLogo } from '~/components/BaseLogo'
import { debounce } from '~/utils/debounce'

type HomeKeyVisualPropsType = {
  image: {
    url: string
    height: number
    width: number
  }
  alt: string
}

export const HomeKeyVisual: React.VFC<HomeKeyVisualPropsType> = ({ image, alt }) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    let vw: number = window.innerWidth

    const setHeight = (): void => {
      const vh: number = window.innerHeight
      ref.current.style.setProperty('--this-height', `calc(${vh}px - var(--height-header)`)
    }

    window.addEventListener(
      'resize',
      debounce(() => {
        // 画面の横幅にサイズ変動がない場合は処理を終える
        if (vw === window.innerWidth) return

        // 画面の横幅のサイズ変動があった時場合hは高さを再計算する
        vw = window.innerWidth
        setHeight()
      })
    )

    setHeight()
  }, [ref])

  return (
    <MyRoot ref={ref}>
      <MyFirstView>
        <MyTitle>
          <BaseLogo size={`max(${280 / 16}rem, min(14.6154rem + 12.8205vw, ${480 / 16}rem))`} />
        </MyTitle>
        <MyCloneTitle>
          <BaseLogo size={`max(${280 / 16}rem, min(14.6154rem + 12.8205vw, ${480 / 16}rem))`} presentation />
        </MyCloneTitle>
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
      <MyScrollSign />
    </MyRoot>
  )
}

const spacer: string = 'max(48px, min(28px + 1.9608vw, 56px))'

const MyRoot = styled.header`

  --this-height: calc(100vh - var(--height-header));

  height: max(320px, var(--this-height));
  max-height: 920px;
  position: relative;
`

const MyFirstView = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: ${spacer} 1fr ${spacer};
  height: 100%;
  isolation: isolate;
  margin: auto;
  max-width: 1920px;
`

const MyTitle = styled.h1`
  align-self: center;
  color: var(--color-grayscale-7);
  grid-column: 2 / 13;
  grid-row: 2 / 3;
  position: relative;
  z-index: 1;

  @media ${breakpoints.lgUntil} {
    grid-column: 1 / 13;
    justify-self: center;
  }
`

const MyCloneTitle = styled.div`
  align-self: center;
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  overflow: hidden;
  z-index: -1;

  & > svg {
    max-width: initial;
  }

  @media ${breakpoints.lg} {
    z-index: 2;
  }
`

const MyImage = styled.div`
  grid-column: 1 / 13;
  grid-row: 1 / 4;
  position: relative;
  z-index: 0;

  &::after {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABAQMAAADO7O3JAAAAA3NCSVQICAjb4U/gAAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlP/AOW3MEoAAAAJcEhZcwAAAuwAAALsAe0ztPoAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDQvMTMvMTGrW0T6AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M1cbXjNgAAAApJREFUCJljcAAAAEIAQZXpNDgAAAAASUVORK5CYII=)
      rgba(0, 0, 0, 0.3);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  @media ${breakpoints.lg} {
    grid-column: 4 / 13;
    grid-row: 2 / 3;
  }

  @media (min-width: 1920px) {
    margin-right: calc(50% - 50vw);
  }
`

const scrollSignAnimation = keyframes`
  0% {
    transform: scaleY(1);
    transform-origin: bottom;
  }

  50% {
    transform: scaleY(0);
    transform-origin: bottom;
  }

  51% {
    transform: scaleY(0);
    transform-origin: top;
  }

  100% {
    transform: scaleY(1);
    transform-origin: top;
  }
`

const MyScrollSign = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  height: 60px;
  position: absolute;
  right: max(24px, min(22px + 0.7407vw, 32px));
  width: 2px;

  &::after {
    background-color: var(--color-grayscale-6);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &::after {
    animation: ${scrollSignAnimation} 1.8s ease-in-out infinite;
  }

  @media ${breakpoints.lg} {
    bottom: ${spacer};
  }
`
