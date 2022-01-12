import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseIcon } from '~/components/BaseIcon'

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
        <BaseIcon type={'chevron-right'} size={18} />
      </MyButton>
    )
  }

  return (
    <Link href={href} passHref>
      <MyButton onClick={onClick} {...(blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        <BaseIcon type={'chevron-right'} size={18} />
      </MyButton>
    </Link>
  )
}

const MyButton = styled.a`
  align-items: center;
  background-color: var(--theme-button-background);
  color: var(--color-grayscale-7);
  display: inline-flex;
  justify-content: center;
  min-height: 52px;
  padding: 1em 2em;
  position: relative;
  transition: background-color 0.3s;
  width: min(100%, 280px);

  & > svg {
    bottom: 0;
    margin: auto 0;
    position: absolute;
    right: 12px;
    top: 0;
    transition: transform 0.3s;
  }

  ${hoverable(`
    background-color: var(--color-primary);

    & > svg {
      transform: translateX(4px);
    }
`)}
`
