import { css } from 'styled-components'

const variables = css`

  --theme-text-default: var(--color-grayscale-1);
  --theme-text-muted: var(--color-grayscale-3);
  --theme-text-x-muted: var(--color-grayscale-4);
  --theme-text-difference: var(--color-grayscale-6);
  --theme-background-default: var(--color-grayscale-6);
  --theme-background-muted: var(--color-grayscale-7);
  --theme-background-strong: var(--color-grayscale-5);
  --theme-background-pattern: repeating-linear-gradient(
    -45deg,
    rgba(28, 28, 28, 0),
    rgba(28, 28, 28, 0) 3px,
    rgba(28, 28, 28, 0.05) 6px,
    rgba(28, 28, 28, 0.05) 6px
  );
  --theme-divider: #e2e2e2;
  --theme-button-background: var(--color-grayscale-1);
  --theme-textfield-background: var(--color-grayscale-7);
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
