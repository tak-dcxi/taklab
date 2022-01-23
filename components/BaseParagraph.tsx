import React from 'react'
import styled from 'styled-components'

type BaseParagraphPropsType = {
  children: React.ReactNode
}

export const BaseParagraph: React.VFC<BaseParagraphPropsType> = ({ children }) => {
  return <Root>{children}</Root>
}

const Root = styled.div`
  letter-spacing: var(--letter-spacing-text);
  line-height: var(--leading-loose);

  & .HasMargin {
    margin-top: 1.5em;
  }
`
