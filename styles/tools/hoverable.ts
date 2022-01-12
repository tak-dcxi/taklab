import { css, FlattenSimpleInterpolation } from 'styled-components'

export const hoverable = (styles: string): FlattenSimpleInterpolation => {
  return css`
    &:focus-visible {
      ${styles}
    }

    &.focus-visible {
      ${styles}
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        ${styles}
      }
    }
  `
}
