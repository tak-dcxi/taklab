import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { BaseLogo } from '~/components/BaseLogo'
import { debounce } from 'lodash'

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
    let vw: number = window.innerWidth

    const setHeight = (): void => {
      if (!ref.current) return

      const vh: number = window.innerHeight
      ref.current.style.height = `calc(${vh}px - var(--height-header)`
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
          <MyScrollSign aria-hidden="true">
            <span>Scroll</span>
          </MyScrollSign>
        </MyImage>
      </MyFirstView>
    </MyRoot>
  )
}

const MyRoot = styled.header`
  height: calc(100vh - var(--height-header));
  max-height: 920px;
  min-height: 360px;
`

const MyFirstView = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  height: 100%;
  isolation: isolate;
  margin: auto;
  max-width: 1920px;
  padding: max(40px, min(35px + 1.4815vmin, 56px)) 0;
  position: relative;

  & > * {
    grid-row: 1;
  }
`

const MyTitle = styled.h1`
  align-self: center;
  color: var(--color-grayscale-7);
  grid-column: 2 / 13;
`

const MyCloneTitle = styled.div`
  align-self: center;
  grid-column: 2 / 3;
  overflow: hidden;
  z-index: 1;

  & > svg {
    max-width: initial;
  }

  @media ${breakpoints.lg} {
    grid-column: 2 / 4;
  }
`

const MyImage = styled.div`
  grid-column: 3 / 13;
  position: relative;
  z-index: -1;

  &::after {
    background: rgba(0, 0, 0, 0.3) radial-gradient(rgba(0, 0, 0, 0.5) 30%, transparent 0) center center / 4px 4px;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  @media ${breakpoints.lg} {
    grid-column: 4 / 13;
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
  bottom: 0;
  color: var(--color-grayscale-6);
  position: absolute;
  right: 0;
  z-index: 1;

  &::after {
    background-color: var(--color-grayscale-6);
    content: '';
    display: block;
    height: 48px;
    margin: auto;
    width: 2px;
  }

  &::after {
    animation: ${scrollSignAnimation} 1.4s ease-in-out infinite;
  }

  & > span {
    display: block;
    font-family: var(--font-montserrat);
    font-size: var(--fontsize-1);
    letter-spacing: 0.04em;
    margin-bottom: 2em;
    text-transform: uppercase;
    transform: rotate(90deg);
  }
`
