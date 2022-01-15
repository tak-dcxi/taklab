import React from 'react'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

type BaseGutenbergPropsType = {
  children: string
}

export const WysiwygArea: React.VFC<BaseGutenbergPropsType> = ({ children }) => {
  return <Area dangerouslySetInnerHTML={{ __html: children }} />
}

const Area = styled.div`
  & > * + * {
    margin-top: ${24 / 16}rem;
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

  & h2:not([class]),
  & h3:not([class]),
  & h4:not([class]),
  & h5:not([class]),
  & h6:not([class]) {
    margin-top: ${48 / 16}rem;
  }

  & h2:not([class]) {
    font-size: var(--fontsize-6);
  }

  & h3:not([class]) {
    font-size: var(--fontsize-5);
  }

  & h4:not([class]) {
    font-size: var(--fontsize-4);
  }

  & h5:not([class]) {
    font-size: var(--fontsize-3);
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
    background-color: var(--color-grayscale-5);
    border: 1px solid var(--boundary-color-strong);
    padding: 2em;
  }

  & strong {
    background-image: linear-gradient(rgba(0, 0, 0, 0) 40%, var(--layout-color-accent) 40%);
  }

  & .wp-block-embed {
    background-color: var(--color-grayscale-5);
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
