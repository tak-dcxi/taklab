import React from 'react'
import styled from 'styled-components'

type SubpageHeaderPropsType = {
  headline: string
}

export const SubpageHeader: React.VFC<SubpageHeaderPropsType> = ({ headline }) => {
  return (
    <MyRoot>
      <MyHeadline>{headline}</MyHeadline>
    </MyRoot>
  )
}

const MyRoot = styled.header`
  background-image: var(--theme-background-pattern);
  border-bottom: 1px solid var(--theme-divider);
  border-top: 1px solid var(--theme-divider);
  display: grid;
  font-family: var(--font-montserrat);
  min-height: max(220px, min(8.0556rem + 22.2222vw, 440px));
  place-items: center;
`

const MyHeadline = styled.h1`
  font-size: max(1.75rem, min(1.4537rem + 1.4815vw, 2.75rem));
  font-weight: bold;
  padding: 32px;
  text-transform: uppercase;
`
