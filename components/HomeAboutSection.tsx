import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseHeadingType1 } from '~/components/BaseHeadingType1'
import { clamp } from '~/styles/tools/clamp'
import { AboutProfile } from './AboutProfile'
import { BaseStack } from './BaseStack'

export const HomeAboutSection: React.VFC = () => {
  return (
    <Section>
      <BaseContainer maxWidth={'var(--max-width-wide)'} gutters="0">
        <BaseStack gap={'56px'}>
          <BaseHeadingType1 id={'home-about'} lv={2}>
            About Me
          </BaseHeadingType1>
          <AboutProfile />
        </BaseStack>
      </BaseContainer>
    </Section>
  )
}

const Section = styled.section`
  padding: var(--padding-block-contents) 0;
`
