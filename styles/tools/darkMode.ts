export const darkMode = (styles: string): string => {
  return `
  *:root[data-theme='dark'] & {
    ${styles}
  }

  @media (prefers-color-scheme: dark) {
    *:root:not([data-theme='light']) & {
      ${styles}
    }
  }
  `
}
