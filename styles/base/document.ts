import { css } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { clamp } from '../tools/clamp'

export const document = css`
  html {
    font-family: var(--font-default);
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    height: 100%;
    line-break: strict;
    -webkit-overflow-scrolling: touch;
    overflow-wrap: break-word;
    -webkit-tap-highlight-color: transparent;
    text-align: start;
    text-underline-offset: 0.125em;

    &:lang(ja) {
      font-kerning: none;
    }
  }

  body {
    background-color: var(--theme-background-default);
    color: var(--theme-text-default);
    font-size: ${14 / 16}rem;
    font-weight: normal;
    height: 100%;
    line-height: var(--leading-normal);
    padding: 0;
  }

  i,
  cite,
  em,
  address,
  dfn {
    :lang(ja) & {
      font-style: normal;
    }
  }

  [id='__next'] {
    height: 100%;
    isolation: isolate;
  }
`
