const applyVisited = (status: string): void => {
  status = ''
  sessionStorage.setItem('status', status)
}

const applyTheme = (themeName: string): void => {
  sessionStorage.setItem('theme', themeName)
  document.documentElement.setAttribute('data-theme', themeName)
}

const initialTheme = (): void => {
  const prefersColorSchemeDark: boolean = matchMedia('(prefers-color-scheme: dark)').matches

  prefersColorSchemeDark ? applyTheme('dark') : applyTheme('light')
}

const getStorageTheme = (): void => {
  const storageTheme: string = sessionStorage.getItem('theme')

  if (storageTheme === 'dark') applyTheme('dark')
  if (storageTheme === 'light') applyTheme('light')
}

export const switchTheme = (): void => {
  const storageTheme: string = sessionStorage.getItem('theme')
  storageTheme !== 'dark' ? applyTheme('dark') : applyTheme('light')
}

export const discriminationTheme = (): void => {
  const getStrageVisited: string = sessionStorage.getItem('status')

  if (getStrageVisited) {
    getStorageTheme()
    return
  }

  initialTheme()
  applyVisited('visted')
}

export const currentTheme = (): string => {
  const storageTheme: string = sessionStorage.getItem('theme')
  return storageTheme
}
