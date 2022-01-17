import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { BaseLogo } from '~/components/BaseLogo'
import { debounce } from 'lodash'
import { clamp } from '~/styles/tools/clamp'
import { rotateClockwise } from '~/styles/settings/keyframes'

type HomeFirstViewPropsType = {
  image: {
    url: string
    height: number
    width: number
  }
  alt: string
}

export const HomeFirstView: React.VFC<HomeFirstViewPropsType> = ({ image, alt }) => {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let vw: number = window.innerWidth

    const handleResize = (): void => {
      if (!headerRef.current) return

      const vh: number = window.innerHeight
      headerRef.current.style.setProperty('--this-height', `calc(${vh}px - var(--height-header)`)
    }

    window.addEventListener(
      'resize',
      debounce(() => {
        // 画面の横幅にサイズ変動がない場合は処理を終える
        if (vw === window.innerWidth) return

        // 画面の横幅のサイズ変動があった時場合hは高さを再計算する
        vw = window.innerWidth
        handleResize()
      }, 300)
    )

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [headerRef])

  const scrollSignText = 'SCROLL→SCROLL→'
  const scrollSignTextArray = []

  scrollSignText
    .replace(/\s+/g, '')
    .split('')
    .forEach((character: string) => scrollSignTextArray.push(character))

  return (
    <FirstView ref={headerRef}>
      <Title>
        <BaseLogo size={clamp(280, 560, true, 320, 1920)} />
      </Title>
      <CloneTitle>
        <BaseLogo size={clamp(280, 560, true, 320, 1920)} presentation />
      </CloneTitle>
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
        <ScrollSign>
          <ScrollSignInner>
            {scrollSignTextArray.map((character: string, index: number) => {
              return (
                <ScrollSignCharacter
                  key={index}
                  aria-hidden="true"
                  style={{ transform: `rotate(${index * (360 / scrollSignTextArray.length)}deg)` }}
                >
                  {character}
                </ScrollSignCharacter>
              )
            })}
          </ScrollSignInner>
        </ScrollSign>
      </MyImage>
    </FirstView>
  )
}

const FirstView = styled.header`
  --this-height: calc(100vh - var(--height-header));

  display: grid;
  grid-template-columns: 5% min(10%, 240px) 1fr;
  grid-template-rows: 1fr;
  height: max(480px, var(--this-height));
  isolation: isolate;
  padding: ${clamp(40, 56, false, 320, 1920)} 0;
  position: relative;

  & > * {
    grid-row: 1;
  }
`

const Title = styled.h1`
  align-self: center;
  color: var(--color-grayscale-7);
  grid-column: 2 / 4;
`

const CloneTitle = styled.div`
  align-self: center;
  grid-column: 2 / 3;
  overflow: hidden;
  z-index: 1;

  & > svg {
    max-width: initial;
  }
`

const MyImage = styled.div`
  grid-column: 3 / 4;
  position: relative;
  z-index: -1;

  &::after {
    background: rgba(0, 0, 0, 0.3) radial-gradient(rgba(0, 0, 0, 0.6) 30%, transparent 0) center center / 4px 4px;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`

const ScrollSign = styled.div`
  --this-radius: 52px;
  --this-offset: ${clamp(4, 32)};
  --this-scale: 0.7;

  bottom: calc(var(--this-radius) + var(--this-offset));
  position: absolute;
  right: calc(var(--this-radius) + var(--this-offset));
  transform: scale(var(--this-scale));
  z-index: 1;

  @media ${breakpoints.sm} {
    --this-scale: 0.85;
  }

  @media ${breakpoints.lg} {
    --this-scale: 1;
  }
`

const ScrollSignInner = styled.div`
  animation: ${rotateClockwise} 8s linear infinite;
`

const ScrollSignCharacter = styled.span`
  bottom: 0;
  color: var(--color-grayscale-7);
  display: inline-block;
  font-family: var(--font-montserrat);
  font-size: 10px;
  font-weight: bold;
  height: var(--this-radius);
  left: 0;
  line-height: 1;
  position: absolute;
  transform-origin: bottom center;
`
