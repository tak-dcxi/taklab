import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { social } from '~/constant/social'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'
import { hoverable } from '~/styles/tools/hoverable'

export const SiteDesktopSocialList: React.VFC = () => {
  return (
    <MyRoot>
      <li>
        <MySocialLink href={social.twitter.url}>
          <BaseSocialIcon size={20} type="twitter" />
        </MySocialLink>
      </li>
      <li>
        <MySocialLink href={social.zenn.url}>
          <BaseSocialIcon size={20} type="zenn" />
        </MySocialLink>
      </li>
      <li>
        <MySocialLink href={social.note.url}>
          <BaseSocialIcon size={20} type="note" />
        </MySocialLink>
      </li>
      <li>
        <MySocialLink href={social.rss.url}>
          <BaseSocialIcon size={20} type="rss" />
        </MySocialLink>
      </li>
    </MyRoot>
  )
}

const MyRoot = styled.ul`
  align-items: center;
  display: flex;
  grid-area: header-social;
  justify-self: end;
  padding: 0 max(16px, min(11px + 1.4815vw, 32px));

  & > li + li {
    margin-left: 12px;
  }

  @media ${breakpoints.lgUntil} {
    display: none;
  }
`

const MySocialLink = styled.a`
  display: inline-block;
  padding: 4px;
  position: relative;

  &::after {
    background-color: var(--color-grayscale-3);
    border-radius: 4px;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  ${hoverable(`
    &::after {
      opacity: 0.5;
    }
  `)}
`
