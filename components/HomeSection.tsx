import React, { useRef } from 'react'
import styled from 'styled-components'
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver'
import { clamp } from '~/styles/tools/clamp'
import { AnimeFadeIn } from './AnimeFadeIn'
import { BaseCenter } from './BaseCenter'
import { BaseHeadingType1 } from './BaseHeadingType1'
import { BaseStack } from './BaseStack'

type HomeSectionPropsType = {
  children: React.ReactNode
  title: string
}

export const HomeSection: React.VFC<HomeSectionPropsType> = ({ children, title }) => {
  const rootRef = useRef<HTMLElement>(null)
  const intersecting = useIntersectionObserver(rootRef, { rootMargin: '0px 0px -200px', once: true })

  return (
    <Section ref={rootRef} intersecting={intersecting}>
      <BaseCenter>
        <AnimeFadeIn active={intersecting}>
          <BaseStack gap={clamp(40, 56)}>
            <BaseHeadingType1 lv={2}>{title}</BaseHeadingType1>
            {children}
          </BaseStack>
        </AnimeFadeIn>
      </BaseCenter>
    </Section>
  )
}

type SectionPropsType = {
  intersecting: boolean
}

const Section = styled.section<SectionPropsType>`
  isolation: isolate;
  padding: var(--padding-block-contents) 0;
  position: relative;
`

const Paragraph = styled.p``
