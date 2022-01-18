import { css } from 'styled-components'

const variables = css`

  --theme-text-default: var(--color-grayscale-7);
  --theme-text-muted: var(--color-grayscale-4);
  --theme-text-x-muted: var(--color-grayscale-2);
  --theme-text-difference: var(--color-grayscale-1);
  --theme-background-default: var(--color-grayscale-1);
  --theme-background-muted: var(--color-grayscale-2);
  --theme-background-strong: var(--color-grayscale-0);
  --theme-background-pattern: repeating-linear-gradient(
    -45deg,
    rgba(244, 244, 244, 0),
    rgba(244, 244, 244, 0) 3px,
    rgba(244, 244, 244, 0.05) 6px,
    rgba(244, 244, 244, 0.05) 6px
  );
  --theme-divider: #111;
  --theme-button-background: var(--color-grayscale-2);
  --theme-textfield-background: var(--color-grayscale-0);
  --theme-header-background: var(--color-grayscale-0);
  --theme-drawer-divider: var(--color-grayscale-2);
  --theme-drawer-background: var(--color-grayscale-1);
  --theme-drawer-current: var(--color-grayscale-2);
  --theme-heroheader-background: rgba(0, 0, 0, 0.4);
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
