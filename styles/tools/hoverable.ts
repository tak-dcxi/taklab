export const hoverable = (styles: string): string => {
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
