import React from 'react'
import styled, { css } from 'styled-components'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseHeading1 } from '~/components/BaseHeading1'

type HomeSectionPropsType = {
  title: string
  children: React.ReactNode
}

export const HomeSection: React.VFC<HomeSectionPropsType> = ({ title, children }) => {
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
  padding: clamp(64px, 56px + 2.3077vw, 100px) 0;

  & > * > * + * {
    margin-top: 56px;
  }

  & + & {
    border-top: 1px solid var(--theme-border-divider);
  }

  &:nth-of-type(2n) {
    background-color: var(--theme-background-strong);
  }
`
