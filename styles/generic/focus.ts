import { css } from 'styled-components'

export const focus = css`
  :focus:not(:focus-visible) {
    outline: 0;
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: 0;
  }

  [tabindex='-1']:focus {
    outline: 0 !important;
  }
`
