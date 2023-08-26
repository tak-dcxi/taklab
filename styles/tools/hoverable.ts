import { StyledComponent } from 'styled-components'

export const hoverable = (
  styles: string,
  root?: StyledComponent<'a', any, {}, never> | StyledComponent<'button', any, {}, never>
): string => {
  if (root) {
    return `
      ${root}:focus-visible & {
        ${styles}
      }

      ${root}.focus-visible & {
        ${styles}
      }

      @media (hover: hover) and (pointer: fine) {
        ${root}:hover &:where(:any-link, :enabled, summary) {
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
      &:where(:any-link, :enabled, summary):hover {
        ${styles}
      }
    }
  `
}
