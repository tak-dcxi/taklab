import { css } from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

export const buttonStyle = css`
  align-items: center;
  appearance: none;
  background-color: var(--color-grayscale-1);
  border: 0;
  border-radius: 0;
  color: var(--text-color-lighten);
  display: inline-flex;
  font-size: var(--fontsize-2);
  justify-content: center;
  max-width: 256px;
  min-height: 52px;
  padding: 1em 2em;
  transition: background-color 0.3s;
  width: 100%;

  ${hoverable(`
    background-color: var(--color-grayscale-2);
`)}
`
