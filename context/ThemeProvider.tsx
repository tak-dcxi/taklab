import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// @see https://morimo7.hatenablog.com/entry/2019/07/13/155418
// @see https://zenn.dev/hrkmtsmt/articles/b4dbb052b61629

type themeKey = 'light' | 'dark'

type ThemeContextType = {
  colorMode: themeKey
  setColorMode: () => void
}

const defaultContext: ThemeContextType = {
  colorMode: 'light',
  setColorMode: () => {},
}

const ThemeContext: React.Context<ThemeContextType> = createContext<ThemeContextType>(defaultContext)

type ThemeProviderPropsType = {
  children: React.ReactNode
}

export const ThemeProvider: React.VFC<ThemeProviderPropsType> = ({ children }) => {
  const [colorMode, setColorMode] = useState<themeKey>('light')

  const applyVisited = (status: string): void => {
    sessionStorage.setItem('visited', status)
  }

  const applyTheme = useCallback((themeName: typeof colorMode): void => {
    setColorMode(themeName)
    sessionStorage.setItem('theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
  }, [])

  const initTheme = useCallback((): void => {
    const prefersColorSchemeDark = matchMedia('(prefers-color-scheme: dark)').matches
    prefersColorSchemeDark ? applyTheme('dark') : applyTheme('light')
  }, [applyTheme])

  const getStorageTheme = useCallback((): void => {
    const storageTheme = sessionStorage.getItem('theme')
    storageTheme === 'dark' ? applyTheme('dark') : applyTheme('light')
  }, [applyTheme])

  const discriminationTheme = useCallback((): void => {
    const getStrageVisited: string = sessionStorage.getItem('visited')
    if (getStrageVisited == 'visited') {
      getStorageTheme()
    } else {
      initTheme()
      applyVisited('visited')
    }
  }, [getStorageTheme, initTheme])

  const toggleColorMode = (): void => {
    applyTheme(colorMode === 'light' ? 'dark' : 'light')
  }

  useEffect(() => discriminationTheme(), [discriminationTheme])

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        setColorMode: toggleColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
