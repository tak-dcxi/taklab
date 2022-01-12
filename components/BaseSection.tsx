import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseHeadingType1 } from '~/components/BaseHeadingType1'

type BaseSectionPropsType = {
  title: string
  children: React.ReactNode
}

export const BaseSection: React.VFC<BaseSectionPropsType> = ({ title, children }) => {
  return (
    <MySection>
      <BaseContainer>
        <BaseHeadingType1 id={`${title.toLowerCase().replace(/\s+/g, '_')}`} lv={2}>
          {title}
        </BaseHeadingType1>
        {children}
      </BaseContainer>
    </MySection>
  )
}

const MySection = styled.section`
  padding: var(--contents-block-padding); /* clamp() */

  & > * > * + * {
    margin-top: 56px;
  }

  & + & {
    border-top: 1px solid var(--theme-divider);
  }
`
