import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseHeadingType1 } from '~/components/BaseHeadingType1'
import { BaseStack } from './BaseStack'

type BaseSectionPropsType = {
  title: string
  children: React.ReactNode
}

export const BaseSection: React.VFC<BaseSectionPropsType> = ({ title, children }) => {
  return (
    <Section>
      <BaseContainer>
        <BaseStack gap={'56px'}>
          <BaseHeadingType1 id={`${title.toLowerCase().replace(/\s+/g, '_')}`} lv={2}>
            {title}
          </BaseHeadingType1>
          {children}
        </BaseStack>
      </BaseContainer>
    </Section>
  )
}

const Section = styled.section`
  padding: var(--padding-block-contents) 0;
`
