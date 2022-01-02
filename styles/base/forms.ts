import { css } from 'styled-components'

export const forms = css`
  button:not(:disabled, [aria-disabled='true' i]) {
    cursor: pointer;
  }

  [aria-disabled='true'],
  [disabled] {
    cursor: not-allowed;
  }

  textarea {
    resize: vertical;
  }
`
