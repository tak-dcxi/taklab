import React, { useState } from 'react'
import styled from 'styled-components'
import { switchTheme } from '~/libs/theme'

export const SiteThemeToggler: React.VFC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('')

  const handleClick = () => {
    switchTheme()

    const currentTheme: string = document.documentElement.getAttribute('data-theme')
    setCurrentTheme(currentTheme)
  }

  return (
    <MyToggler type="button" aria-label="テーマ切り替え" onClick={handleClick}>
      {currentTheme === 'dark' ? (
        <svg
          role="img"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          role="img"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )}
    </MyToggler>
  )
}

const MyToggler = styled.button`
  align-items: center;
  display: inline-flex;
  justify-content: center;
`
