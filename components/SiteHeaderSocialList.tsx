import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { social } from '~/constant/social'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'
import { hoverable } from '~/styles/tools/hoverable'
import { clamp } from '~/styles/tools/clamp'

export const SiteHeaderSocialList: React.VFC = () => {
  return (
    <Root>
      <dt className="VisuallyHidden">Follow Me</dt>
      <dd>
        <MyLink href={social.twitter.url}>
          <BaseSocialIcon size={20} type="twitter" />
        </MyLink>
      </dd>
      <dd>
        <MyLink href={social.zenn.url}>
          <BaseSocialIcon size={20} type="zenn" />
        </MyLink>
      </dd>
      <dd>
        <MyLink href={social.note.url}>
          <BaseSocialIcon size={20} type="note" />
        </MyLink>
      </dd>
      <dd>
        <MyLink href={social.rss.url}>
          <BaseSocialIcon size={20} type="rss" />
        </MyLink>
      </dd>
    </Root>
  )
}

const Root = styled.dl`
  align-items: center;
  display: flex;
  grid-area: header-social;
  justify-self: end;
  padding: 0 ${clamp(16, 32, false, 320, 1920)};

  & > dd + dd {
    margin-left: 12px;
  }

  @media ${breakpoints.lgUntil} {
    display: none;
  }
`

const MyLink = styled.a`
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
