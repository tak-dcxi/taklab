export const leadingTrim = (lineHeight: string): string => {
  return `
    &::before,
    &::after {
      content: "";
      display: block;
      height: 1px;
      width: 0;
    }

    &::before {
      margin-bottom: calc((1 - ${lineHeight}) * 0.5em);
    }

    &::after {
      margin-top: calc((1 - ${lineHeight}) * 0.5em);
    }
  `
}
