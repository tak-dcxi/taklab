import { css } from 'styled-components'

export const formFieldStyle = css`
  appearance: none;
  background-color: var(--grayscale-6);
  border: 1px solid var(--grayscale-4);
  border-radius: 0;
  font: inherit;
  font-size: max(var(--fsize-3), 16px);
  padding: 12px;
  width: 100%;

  &::-webkit-input-placeholder {
    color: var(--grayscale-3);
  }

  &::placeholder {
    color: var(--grayscale-3);
  }
`
