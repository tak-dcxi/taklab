import { css } from 'styled-components'
import { breakpoints } from '~/utils/breakpoints'

export const page = css`
  html {
    font-family: YakuHanJP, 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    line-break: strict;
    min-height: 100vh;
    -webkit-overflow-scrolling: touch;
    overflow-wrap: break-word;
    -webkit-tap-highlight-color: transparent;
    text-align: start;
    text-underline-offset: 0.125em;
    width: 100%;

    &:lang(ja) {
      font-kerning: none;
    }
  }

  body {
    background-color: var(--layout-color-background);
    color: var(--text-color-default);
    font-size: var(--fsize-2);
    font-weight: var(--normal);
    line-height: var(--leading-normal);
    min-height: 100%;
    padding: 0;
    width: 100%;
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
`
