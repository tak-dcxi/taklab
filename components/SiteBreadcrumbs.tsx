import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'

type SiteBreadcrumbsPropsType = {
  lists: { [key: string]: string }[]
}

export const SiteBreadcrumbs: React.VFC<SiteBreadcrumbsPropsType> = ({ lists }) => {
  return (
    <MyRoot aria-label="現在位置">
      <MyList itemScope itemType="http://schema.org/BreadcrumbList">
        {lists.map(({ string, path }, index: number) => (
          <MyListItem key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            {lists.length - 1 !== index ? (
              <>
                <Link href={path} passHref>
                  <MyLink itemProp="item">
                    <span itemProp="name">{string}</span>
                  </MyLink>
                </Link>
                <MyIcon role="img" aria-hidden="true">
                  &gt;
                </MyIcon>
                <meta itemProp="position" content={`${index + 1}`} />
              </>
            ) : (
              <>
                <span itemProp="item" aria-current="location">
                  <span itemProp="name">{string}</span>
                </span>
                <meta itemProp="position" content={`${index + 1}`} />
              </>
            )}
          </MyListItem>
        ))}
      </MyList>
    </MyRoot>
  )
}

const MyRoot = styled.nav`
  border-bottom: 1px dotted var(--boundary-color-strong);
  color: var(--theme-text-1);
  font-size: var(--fontsize-2);
  padding-bottom: 16px;
  padding-top: 16px;
`

const MyList = styled.ol`
  & > * + * {
    margin-left: 1em;
  }
`

const MyListItem = styled.li`
  display: inline;
`

const MyIcon = styled.span`
  margin-left: 1em;
`

const MyLink = styled.a`
  ${hoverable(`
    color: var(--text-color-link);
    text-decoration: underline;
  `)}
`
