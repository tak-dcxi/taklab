import { css } from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

export const buttonStyle = css`
  align-items: center;
  background-color: var(--theme-button-background);
  color: var(--color-grayscale-7);
  display: inline-flex;
  justify-content: center;
  min-height: 52px;
  padding: 1em 2em;
  position: relative;
  transition: background-color 0.3s;
  width: min(100%, 280px);

  & > svg {
    bottom: 0;
    margin: auto 0;
    position: absolute;
    right: 12px;
    top: 0;
    transition: transform 0.3s;
  }

  ${hoverable(`
    background-color: var(--color-primary);

    & > svg {
      transform: translateX(4px);
    }
`)}
`
