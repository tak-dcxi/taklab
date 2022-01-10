import { css } from 'styled-components'

const variables = css`

  --theme-text-default: var(--color-grayscale-7);
  --theme-text-weak: var(--color-grayscale-4);
  --theme-background-default: var(--color-grayscale-1);
  --theme-background-weak: var(--color-grayscale-2);
  --theme-background-strong: var(--color-grayscale-0);
  --theme-divider: #111;
  --theme-header-background: var(--color-grayscale-0);
  --theme-drawer-divider: var(--color-grayscale-2);
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
