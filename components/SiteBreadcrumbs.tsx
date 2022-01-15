import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseContainer } from '~/components/BaseContainer'
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
      <BaseContainer>
        <List itemScope itemType="http://schema.org/BreadcrumbList">
          <ListItem itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <Link href={'/'} passHref>
              <MyLink itemProp="item">
                <BaseIcon type={'home'} size={`${14 / 16}rem`} />
                <span itemProp="name">Home</span>
              </MyLink>
            </Link>
            <Chevron aria-hidden="true">&gt;</Chevron>
            <meta itemProp="position" content="1" />
          </ListItem>
          {items.map(({ string, path }, index: number) => (
            <ListItem key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              {items.length - 1 !== index ? (
                <>
                  <Link href={path} passHref>
                    <MyLink itemProp="item">
                      <span itemProp="name">{string}</span>
                    </MyLink>
                  </Link>
                  <Chevron aria-hidden="true">&gt;</Chevron>
                  <meta itemProp="position" content={`${index - 1 + 1}`} />
                </>
              ) : (
                <>
                  <span itemProp="item" aria-current="location">
                    <span itemProp="name">{string}</span>
                  </span>
                  <meta itemProp="position" content={`${index - 1 + 1}`} />
                </>
              )}
            </ListItem>
          ))}
        </List>
      </BaseContainer>
    </Root>
  )
}

const Root = styled.nav`
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

const Chevron = styled.span`
  margin-left: 0.75em;
`

const MyLink = styled.a`
  align-items: baseline;
  border-bottom: 1px solid var(--color-primary);
  display: inline-flex;
  transition: color 0.3s;

  & > svg {
    margin-right: 0.25em;
    position: relative;
    top: ${2 / 16}rem;
  }

  ${hoverable(`
    color: var(--color-primary);
  `)}
`
