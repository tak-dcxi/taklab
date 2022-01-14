import { css } from 'styled-components'

export const formFieldStyle = css`
  appearance: none;
  background-color: var(--color-grayscale-7);
  border: 0;
  border-radius: 0;
  box-shadow: inset 0 0 0 2px var(--color-grayscale-5);
  font-size: max(1rem, 16px);
  height: calc(100% / 0.875);
  padding: 1em;
  transform: scale(0.875);
  transform-origin: top left;
  width: calc(100% / 0.875);

  &::-webkit-input-placeholder {
    color: var(--color-grayscale-3);
  }

  &::placeholder {
    color: var(--color-grayscale-3);
  }

  &[aria-invalid='true'] {
    box-shadow: inset 0 0 0 2px var(--color-accent-1);
  }

  &:focus {
    box-shadow: inset 0 0 0 2px var(--color-primary);
    outline: 0;
  }
`
