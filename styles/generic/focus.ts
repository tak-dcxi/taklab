import { css } from 'styled-components'

export const focus = css`
  :focus:not(:focus-visible) {
    outline: none;
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  [tabindex='-1']:focus {
    outline: none !important;
  }
`
