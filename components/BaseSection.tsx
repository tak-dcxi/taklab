import React from 'react'
import styled from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseHeading1 } from '~/components/BaseHeading1'

type BaseSectionPropsType = {
  title: string
  children: React.ReactNode
}

export const BaseSection: React.VFC<BaseSectionPropsType> = ({ title, children }) => {
  return (
    <MySection>
      <BaseContainer>
        <BaseHeading1 id={`${title.toLowerCase().replace(/\s+/g, '_')}`} lv={2}>
          {title}
        </BaseHeading1>
        {children}
      </BaseContainer>
    </MySection>
  )
}

const MySection = styled.section`
  padding: max(64px, min(56px + 2.3077vw, 100px)) 0; /* clamp() */

  & > * > * + * {
    margin-top: 56px;
  }

  & + & {
    border-top: 1px solid var(--theme-divider);
  }
`
