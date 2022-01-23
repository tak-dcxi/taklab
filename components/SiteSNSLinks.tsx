import React from 'react'
import styled from 'styled-components'
import { social } from '~/constant/social'
import { BaseSocialIcon } from '~/components/BaseSocialIcon'
import { hoverable } from '~/styles/tools/hoverable'

export const SiteSNSLinks: React.VFC = () => {
  return (
    <Root>
      <List aria-label="Follow Me">
        <li>
          <MyLink href={social.twitter.url}>
            <BaseSocialIcon size={20} type="twitter" />
          </MyLink>
        </li>
        <li>
          <MyLink href={social.zenn.url}>
            <BaseSocialIcon size={20} type="zenn" />
          </MyLink>
        </li>
        <li>
          <MyLink href={social.note.url}>
            <BaseSocialIcon size={20} type="note" />
          </MyLink>
        </li>
        <li>
          <MyLink href={social.rss.url}>
            <BaseSocialIcon size={20} type="rss" />
          </MyLink>
        </li>
      </List>
    </Root>
  )
}

const Root = styled.div`
  overflow: hidden;
`

const List = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: -6px;

  & > li {
    margin: 6px;
  }
`

const MyLink = styled.a`
  display: inline-block;
  isolation: isolate;
  outline-offset: -2px;
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
