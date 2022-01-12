import React, { useEffect } from 'react'

export const useToggleTheme = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  return toggleTheme
}
