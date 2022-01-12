import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const SiteNavbar: React.VFC = () => {
  return (
    <nav aria-label="サイト内メニュー">
      <MyList>
        <li>
          <Link href="/" passHref>
            <MyLink>Home</MyLink>
          </Link>
        </li>
        <li>
          <Link href="/blog" passHref>
            <MyLink>Posts</MyLink>
          </Link>
        </li>
        <li>
          <Link href="/events" passHref>
            <MyLink>Events</MyLink>
          </Link>
        </li>
      </MyList>
    </nav>
  )
}

const MyList = styled.ul`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  & > * + * {
    margin-left: 20px;
  }
`

const MyLink = styled.a`
  display: inline-block;
  font-weight: bold;
  position: relative;
  text-transform: uppercase;

  &[aria-current] {
    color: var(--text-color-link);

    &::before {
      background-color: currentColor;
      border-radius: 50%;
      bottom: calc(100% + 4px);
      content: '';
      height: 4px;
      left: 0;
      margin: 0 auto;
      position: absolute;
      right: 0;
      width: 4px;
    }
  }
`
