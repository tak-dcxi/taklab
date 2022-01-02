import React from 'react'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

type BaseGutenbergPropsType = {
  children: string
}

export const BaseGutenberg: React.VFC<BaseGutenbergPropsType> = ({ children }) => {
  return <MyRoot dangerouslySetInnerHTML={{ __html: children }} />
}

const MyRoot = styled.div`
  & > * {
    margin-bottom: 16px;
    margin-top: 16px;
  }

  & > :first-child {
    margin-top: 0 !important;
  }

  & > :last-child {
    margin-bottom: 0 !important;
  }

  & p:not([class]) {
    line-height: var(--leading-loose);
  }

  & *:is(h2, h3, h4, h5, h6):not([class]) {
    font-weight: bold;
    margin-top: 48px;
  }

  & h2:not([class]) {
    font-size: var(--fsize-6);
  }

  & h3:not([class]) {
    font-size: var(--fsize-5);
  }

  & h4:not([class]) {
    font-size: var(--fsize-4);
  }

  & h5:not([class]) {
    font-size: var(--fsize-3);
  }

  & *:is(ul, ol):not([class]) {
    & > li {
      list-style-position: inside;
      list-style-type: inherit;

      & > *:is(ul, ol) {
        padding-left: 1em;
      }
    }
  }

  & a:not([class]) {
    color: var(--text-color-link);
    text-decoration: revert;

    ${hoverable(`
      text-decoration: none;
    `)}
  }

  & blockquote {
    background-color: var(--grayscale-4);
    border: 1px solid var(--boundary-color-strong);
    padding: 2em;
  }

  & strong {
    background-image: linear-gradient(rgba(0, 0, 0, 0) 40%, var(--layout-color-accent) 40%);
  }

  & .wp-block-embed {
    background-color: var(--grayscale-4);
    width: fit-content;

    & blockquote {
      display: none;
    }

    & iframe {
      clip: auto !important;
      position: relative !important;
    }
  }
`
