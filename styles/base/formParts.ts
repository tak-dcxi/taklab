import { css } from 'styled-components'

export const formParts = css`
  button {
    background-color: transparent;
    border: 0;
    border-radius: 0;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    padding: 0;
    text-align: inherit;
  }

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

  input,
  textarea,
  select {
    font: inherit;
  }
`
