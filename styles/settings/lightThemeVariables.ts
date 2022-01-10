import { css } from 'styled-components'

const variables = css`

  --theme-text-default: var(--color-grayscale-1);
  --theme-text-weak: var(--color-grayscale-3);
  --theme-background-default: var(--color-grayscale-6);
  --theme-background-weak: var(--color-grayscale-7);
  --theme-background-strong: var(--color-grayscale-5);
  --theme-divider: #ddd;
  --theme-header-background: var(--color-grayscale-7);
  --theme-drawer-divider: var(--color-grayscale-5);
  --theme-drawer-background: var(--color-grayscale-7);
  --theme-drawer-current: var(--color-grayscale-6);
  --theme-postcard-hover: var(--color-grayscale-4);
`

export const lightThemeVariables = css`
  :root,
  [data-theme='light'] {
    ${variables}
  }
`
