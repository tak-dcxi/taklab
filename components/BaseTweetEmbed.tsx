import React from 'react'
import styled from 'styled-components'
import { Tweet } from 'react-twitter-widgets'
import { useTheme } from '~/context/ThemeProvider'

type BaseTweetEmbeddedPropsType = {
  id: string
}

export const BaseTweetEmbed: React.VFC<BaseTweetEmbeddedPropsType> = ({ id }) => {
  const { colorMode } = useTheme()

  return (
    <MyWrapper>
      {colorMode === 'dark' ? <Tweet tweetId={id} options={{ theme: 'dark' }} /> : <Tweet tweetId={id} />}
    </MyWrapper>
  )
}

const MyWrapper = styled.blockquote`
  & > div {
    background-color: var(--theme-background-strong);
    border: 1px solid var(--theme-divider);
    margin-left: auto;
    margin-right: auto;
    max-width: ${360 / 16}rem;
    padding: 12px;
  }

  & .twitter-tweet {
    margin: 0 !important;
  }
`
