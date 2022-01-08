import { css } from 'styled-components'

const variables = css`

  --theme-text-1: var(--color-grayscale-7);
  --theme-text-2: var(--color-grayscale-4);
  --theme-background-1: var(--color-grayscale-1);
  --theme-background-weak: var(--color-grayscale-2);
  --theme-background-strong: var(--color-grayscale-2);
  --theme-border-1: var(--color-grayscale-2);
  --theme-border-divider: #555;
  --theme-drawer-background: var(--color-grayscale-1);
  --theme-drawer-current: var(--color-grayscale-2);
  --theme-postcard-hover: var(--color-grayscale-3);
`

export const darkThemeVariables = css`
  [data-theme='dark'] {
    ${variables}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      ${variables}
    }
  }
`
