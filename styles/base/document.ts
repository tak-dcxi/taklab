import { css } from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'

export const document = css`
  html {
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'BIZ UDPGothic', Meiryo,
      sans-serif;
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
    background-color: var(--theme-background-1);
    color: var(--theme-text-1);
    font-size: var(--fontsize-2);
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
