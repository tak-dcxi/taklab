import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

type BaseIconPropsType = {
  color?: string
  size?: number
  label?: string
  type:
    | 'chevron-up'
    | 'chevron-right'
    | 'chevron-down'
    | 'chevron-left'
    | 'enter'
    | 'cross'
    | 'menu'
    | 'search'
    | 'sun'
    | 'moon'
}

export const BaseIcon: React.VFC<BaseIconPropsType> = ({ color = 'currentColor', size = 16, label, type }) => {
  const randomID: string = uuidv4()

  return (
    <MySVGtag
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...(label ? { role: 'img', 'aria-labelledby': randomID } : { 'aria-hidden': 'true' })}
    >
      {label && <title id={randomID}>{label}</title>}
      {type === 'chevron-up' && <path d="M18 15l-6-6-6 6" />}
      {type === 'chevron-right' && <path d="M9 18l6-6-6-6" />}
      {type === 'chevron-down' && <path d="M6 9l6 6 6-6" />}
      {type === 'chevron-left' && <path d="M15 18l-6-6 6-6" />}
      {type === 'enter' && (
        <>
          <path d="M10 9l-6 6 6 6" />
          <path d="M20 4v7a4 4 0 0 1-4 4H5" />
        </>
      )}
      {type === 'cross' && (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      )}
      {type === 'menu' && (
        <>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
      {type === 'search' && (
        <>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </>
      )}
      {type === 'sun' && (
        <>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </>
      )}
      {type === 'moon' && <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />}
    </MySVGtag>
  )
}

type MySVGTagPropsType = {
  width: number
  height: number
}

const MySVGtag = styled.svg<MySVGTagPropsType>`
  height: ${(props) => props.height / 16}rem;
  width: ${(props) => props.width / 16}rem;
`
