import { css } from 'styled-components'

export const prefersReducedMotion = css`
  *,
  ::before,
  ::after {
    @media (prefers-reduced-motion: reduce) {
      animation: 1ms !important;
      scroll-behavior: auto !important;
      transition: 1ms !important;
    }
  }
`
