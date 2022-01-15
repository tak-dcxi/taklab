import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BaseIcon } from '~/components/BaseIcon'
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
      <Button href={href} onClick={onClick} {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        <BaseIcon type={'chevron-right'} size={18} />
      </Button>
    )
  }

  return (
    <Link href={href} passHref>
      <Button onClick={onClick} {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        <BaseIcon type={'chevron-right'} size={18} />
      </Button>
    </Link>
  )
}

const Button = styled.a`
  ${buttonStyle}
`
