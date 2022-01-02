import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BaseIconChevron } from '~/components/BaseIcon'
import { buttonStyle } from '~/styles/object/buttonStyle'

type BaseLinkButtonPropsType = {
  children: string
  href: string
  blank?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const BaseLinkButton: React.VFC<BaseLinkButtonPropsType> = ({ children, href, blank, onClick }) => {
  if (/^http/.test(href)) {
    return (
      <MyButton href={href} onClick={onClick} {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        <BaseIconChevron type="right" size={18} />
      </MyButton>
    )
  }

  return (
    <Link href={href} passHref>
      <MyButton onClick={onClick} {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        <BaseIconChevron type="right" size={18} />
      </MyButton>
    </Link>
  )
}

const MyButton = styled.a`
  ${buttonStyle}

  position: relative;

  & > svg {
    bottom: 0;
    margin: auto 0;
    position: absolute;
    right: 12px;
    top: 0;
  }
`
