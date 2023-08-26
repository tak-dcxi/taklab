import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseCenter } from '~/components/BaseCenter'
import { BaseIcon } from './BaseIcon'

export type BreadcrumbsType = {
  string: string
  path?: string
}

type SiteBreadcrumbsPropsType = {
  items: BreadcrumbsType[]
}

export const SiteBreadcrumbs: React.VFC<SiteBreadcrumbsPropsType> = ({ items }) => {
  return (
    <Root aria-label="現在位置">
      <BaseCenter>
        <List itemScope itemType="http://schema.org/BreadcrumbList">
          <ListItem itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <MyLink href={'/'} passHref itemProp="item">
              <BaseIcon type={'home'} size={`${14 / 16}rem`} />
              <span itemProp="name">HOME</span>
            </MyLink>
            <Slash aria-hidden="true">/</Slash>
            <meta itemProp="position" content="1" />
          </ListItem>
          {items.map(({ string, path }, index: number) => (
            <ListItem key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              {items.length - 1 !== index ? (
                <>
                  <MyLink href={path} passHref itemProp="item">
                    <span itemProp="name">{string}</span>
                  </MyLink>
                  <Slash aria-hidden="true">&gt;</Slash>
                  <meta itemProp="position" content={`${index + 2}`} />
                </>
              ) : (
                <>
                  <span itemProp="item" aria-current="location">
                    <span itemProp="name">{string}</span>
                  </span>
                  <meta itemProp="position" content={`${index + 2}`} />
                </>
              )}
            </ListItem>
          ))}
        </List>
      </BaseCenter>
    </Root>
  )
}

const Root = styled.nav`
  font-family: var(--font-designed);
  font-size: var(--fontsize-1);
  padding: 1em 0;
`

const List = styled.ol`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: -0.1em -0.375em;
`

const ListItem = styled.li`
  margin: 0.1em 0.375em;
`

const Slash = styled.span`
  margin-left: 0.75em;
`

const MyLink = styled(Link)`
  border-bottom: 1px solid var(--color-primary);
  transition: color 0.3s;

  & > svg {
    margin-right: 0.25em;
    vertical-align: -0.125em;
  }

  ${hoverable(`
    color: var(--color-primary);
  `)}
`
