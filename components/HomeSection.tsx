import React, { useRef } from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver'
import { clamp } from '~/styles/tools/clamp'
import { AnimeFadeIn } from './AnimeFadeIn'
import { BaseCenter } from './BaseCenter'
import { BaseHeadingType1 } from './BaseHeadingType1'
import { BaseStack } from './BaseStack'

type CommonPropsType = {
  background?: 'default' | 'strong'
}

type HomeSectionPropsType = {
  children: React.ReactNode
  title: string
} & CommonPropsType

export const HomeSection: React.VFC<HomeSectionPropsType> = ({ children, title, background = 'default' }) => {
  const rootRef = useRef<HTMLElement>(null)
  const intersecting = useIntersectionObserver(rootRef, { rootMargin: '0px 0px -200px', once: true })

  return (
    <Section ref={rootRef} intersecting={intersecting} {...{ background }}>
      <BaseCenter>
        <AnimeFadeIn active={intersecting}>
          <BaseStack gap={clamp(40, 56)}>
            <BaseHeadingType1 id={title} lv={2}>
              {title}
            </BaseHeadingType1>
            {children}
          </BaseStack>
        </AnimeFadeIn>
      </BaseCenter>
    </Section>
  )
}

type SectionPropsType = {
  intersecting: boolean
} & CommonPropsType

const Section = styled.section<SectionPropsType>`
  isolation: isolate;
  padding: var(--padding-block-contents) 0;
  position: relative;

  &::after {
    background-color: ${(props) =>
      props.background === 'strong' ? 'var(--theme-background-strong)' : 'var(--theme-background-default)'};
    bottom: 0;
    content: '';
    left: 0;
    opacity: ${(props) => (props.intersecting ? '1' : '0')};
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.8s linear;
    z-index: -1;
  }
`
