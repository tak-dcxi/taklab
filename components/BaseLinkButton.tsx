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
      <Button {...{ href, onClick }} {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        <BaseIcon type={'chevron-right'} size={`${18 / 16}rem`} />
      </Button>
    )
  }

  return (
    <LinkComponentButton
      passHref
      {...{ href, onClick }}
      {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      <BaseIcon type={'chevron-right'} size={`${18 / 16}rem`} />
    </LinkComponentButton>
  )
}

const Button = styled.a`
  ${buttonStyle}
`

const LinkComponentButton = styled(Link)`
  ${buttonStyle}
`
