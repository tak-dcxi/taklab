import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { useHeaderIntersectionObserve } from '~/context/HeaderIntersectionOberve'
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver'
import { rotateClockwise } from '~/styles/settings/keyframes'
import { clamp } from '~/styles/tools/clamp'
import { AnimeFadeIn } from './AnimeFadeIn'
import { AnimeMaskSlide } from './AnimeMaskSlide'
import { BaseCenter } from './BaseCenter'
import { BaseLogo } from './BaseLogo'

const HomeVantaEffect = dynamic(() => import('~/components/HomeVantaEffect').then((module) => module.HomeVantaEffect), {
  ssr: false,
})

export const HomeHeroHeader: React.VFC = () => {
  const headerRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const { setIntersecting } = useHeaderIntersectionObserve()
  const intersecting = useIntersectionObserver(headerRef)

  const scrollSignText = 'SCROLL→SCROLL→'
  const scrollSignTextArray = []

  scrollSignText
    .replace(/\s+/g, '')
    .split('')
    .forEach((character: string) => scrollSignTextArray.push(character))

  useEffect(() => {
    setIntersecting(intersecting)
  }, [setIntersecting, headerRef, intersecting])

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoaded(true)
    } else {
      window.addEventListener('load', () => setLoaded(true), false)
    }
  }, [])

  return (
    <Root ref={headerRef}>
      <BaseCenter gutters={clamp(24, 40)}>
        <h1>
          <AnimeMaskSlide as={'span'} active={loaded}>
            <BaseLogo size={clamp(280, 560, true, 320, 1920)} />
          </AnimeMaskSlide>
        </h1>
        <Description lang="en">
          <AnimeFadeIn active={loaded} delay={800}>
            <p>Hello, I am a Japanese Web Creator living in Tokyo.</p>
            <p>My hobbies is to experiment with new technologies and I love HTML and CSS.</p>
          </AnimeFadeIn>
        </Description>
        <noscript>
          <p>このページでは JavaScriptを使用しています。</p>
          <p>お使いのWEBブラウザで JavaScriptを有効にしてからご覧ください。</p>
        </noscript>
      </BaseCenter>
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
      <HomeVantaEffect />
    </Root>
  )
}

const Root = styled.header`
  align-items: center;
  display: grid;
  height: max(480px, calc(var(--vh, 1vh) * 100));
  isolation: isolate;
  overflow: hidden;
  position: relative;
`

const Description = styled.div`
  font-family: var(--font-designed);
  font-size: ${clamp(12, 14, true)};
  letter-spacing: 0.02em;
  line-height: var(--leading-loose);
  margin-top: 2em;
  min-height: 0.01vw;
`

const ScrollSign = styled.div`
  --radius: 52px;
  --offset: ${clamp(4, 32)};
  --scale: 0.7;

  bottom: calc(var(--radius) + var(--offset));
  position: absolute;
  right: calc(var(--radius) + var(--offset));
  transform: scale(var(--scale));

  @media ${breakpoints.sm} {
    --scale: 0.85;
  }

  @media ${breakpoints.lg} {
    --scale: 1;
  }
`

const ScrollSignInner = styled.div`
  animation: ${rotateClockwise} 8s linear infinite;
`

const ScrollSignCharacter = styled.span`
  bottom: 0;
  display: inline-block;
  font-family: var(--font-designed);
  font-size: 10px;
  font-weight: bold;
  height: var(--radius);
  left: 0;
  line-height: 1;
  position: absolute;
  transform-origin: bottom center;
`
