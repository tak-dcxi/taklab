import { css } from 'styled-components'

export const formFieldStyle = css`
  appearance: none;
  background-color: var(--color-grayscale-7);
  border: 1px solid var(--color-grayscale-5);
  border-radius: 0;
  font: inherit;
  font-size: max(var(--fontsize-3), 16px);
  padding: 12px;
  width: 100%;

  &::-webkit-input-placeholder {
    color: var(--color-grayscale-3);
  }

  &::placeholder {
    color: var(--color-grayscale-3);
  }
`
