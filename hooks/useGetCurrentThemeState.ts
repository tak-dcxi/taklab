import React, { useState, useEffect } from 'react'

/**
 * 現在のテーマの状態を取得します
 * @return {'light' | 'dark'}
 */

type CurrentThemeType = 'light' | 'dark'

export const useGetCurrentThemeState = (): { currentTheme: CurrentThemeType; getCurrentThemeState: () => void } => {
  const [currentTheme, setCurrentTheme] = useState<CurrentThemeType>('light')

  const getCurrentThemeState = (): void => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as CurrentThemeType

    if (!currentTheme) setCurrentTheme('light')
    setCurrentTheme(currentTheme)
  }

  useEffect(() => {
    getCurrentThemeState()
  }, [currentTheme])

  return { currentTheme, getCurrentThemeState }
}
