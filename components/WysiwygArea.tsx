import React, { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'
import { hoverable } from '~/styles/tools/hoverable'
import 'highlight.js/styles/atom-one-dark.css'

declare global {
  interface Window {
    twttr: any
  }
}

type WysiwygAreaPropsType = {
  children?: string
}

export const WysiwygArea: React.VFC<WysiwygAreaPropsType> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    if (children) setHtml(DOMPurify().sanitize(children))
  }, [children])

  // Twitterのウィジェットを読み込む
  useEffect(() => {
    if (typeof window !== 'undefined' && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(rootRef.current)
    }
  }, [html])

  return <Area ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
}

const Area = styled.div`
  & > * + * {
    margin-bottom: ${14 / 16}rem;
    margin-top: ${14 / 16}rem;
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
    margin-bottom: 1em;
    margin-top: 2em;
  }

  & h2:not([class]) {
    font-size: ${clamp(20, 24, true)};
    margin-top: 3em;
  }

  & h3:not([class]) {
    font-size: ${clamp(18, 22, true)};
  }

  & h4:not([class]) {
    font-size: ${clamp(16, 20, true)};
  }

  & h5:not([class]) {
    font-size: ${clamp(14, 18, true)};
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
    color: var(--color-primary);
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

  & pre {
    border: 1px solid var(--theme-divider);
  }
`

function processNodes(children: any, transform: (node: any, index: any) => any): string {
  throw new Error('Function not implemented.')
}

function convertNodeToElement(node: any, index: any, transform: (node: any, index: any) => any) {
  throw new Error('Function not implemented.')
}
