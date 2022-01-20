import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { useHeaderIntersectionObserve } from '~/context/HeaderIntersectionOberve'
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver'
import { rotateClockwise } from '~/styles/settings/keyframes'
import { clamp } from '~/styles/tools/clamp'
import { BaseContainer } from './BaseContainer'
import { BaseLogo } from './BaseLogo'

const HomeVantaEffect = dynamic(() => import('~/components/HomeVantaEffect').then((module) => module.HomeVantaEffect), {
  ssr: false,
})

export const HomeHeroHeader: React.VFC = () => {
  const headerRef = useRef<HTMLElement>(null)
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

  return (
    <Root ref={headerRef}>
      <BaseContainer gutters={clamp(24, 40)}>
        <h1>
          <BaseLogo size={clamp(280, 560, true, 320, 1920)} />
        </h1>
        <Description lang="en">
          <p>Hello, I am a Japanese Web Creator living in Tokyo.</p>
          <p>My hobbies is to experiment with new technologies and I love HTML and CSS.</p>
        </Description>
      </BaseContainer>
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
  --this-radius: 52px;
  --this-offset: ${clamp(4, 32)};
  --this-scale: 0.7;

  bottom: calc(var(--this-radius) + var(--this-offset));
  position: absolute;
  right: calc(var(--this-radius) + var(--this-offset));
  transform: scale(var(--this-scale));

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
  display: inline-block;
  font-family: var(--font-designed);
  font-size: 10px;
  font-weight: bold;
  height: var(--this-radius);
  left: 0;
  line-height: 1;
  position: absolute;
  transform-origin: bottom center;
`
