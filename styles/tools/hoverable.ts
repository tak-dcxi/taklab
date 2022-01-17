import { StyledComponent } from 'styled-components'

export const hoverable = (styles: string, root?: StyledComponent<'a', any, {}, never>) => {
  if (root) {
    return `
      ${root}:focus-visible & {
        ${styles}
      }

      ${root}.focus-visible & {
        ${styles}
      }

      @media (hover: hover) and (pointer: fine) {
        ${root}:hover & {
          ${styles}
        }
      }
    `
  }

  return `
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
