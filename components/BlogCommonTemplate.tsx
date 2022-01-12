import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { CategoriesType } from '~/libs/microCMS'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseContainer } from './BaseContainer'
import { BaseHeadingType2 } from './BaseHeadingType2'
import { BaseIcon } from './BaseIcon'
import { SiteAdSence } from './SiteAdSence'

type BlogCommonTemplatePropsType = {
  children: React.ReactNode
  categories: CategoriesType[]
}

export const BlogCommonTemplate: React.VFC<BlogCommonTemplatePropsType> = ({ children, categories }) => {
  return (
    <BaseContainer>
      <MySidebarWrapper>
        <MySidebar>
          <MyMain>{children}</MyMain>
          <MyAside>
            <MyAsideSection>
              <BaseHeadingType2 lv={2}>Category</BaseHeadingType2>
              <MyCategoryList>
                {categories.map((category, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/blog/${category.id}`} passHref>
                        <MyCategoryLink>
                          {category.name}
                          <BaseIcon type={'chevron-right'} size={14} />
                        </MyCategoryLink>
                      </Link>
                    </li>
                  )
                })}
              </MyCategoryList>
            </MyAsideSection>
            <SiteAdSence />
          </MyAside>
        </MySidebar>
      </MySidebarWrapper>
    </BaseContainer>
  )
}

const size: { [key: string]: string } = {
  gap: 'max(7.5%, 64px)',
  aside: '280px',
}

const MySidebarWrapper = styled.div`
  padding: var(--contents-block-padding);
`

const MySidebar = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc((${size.gap} / 2) * -1);
`

const MyMain = styled.div`
  flex-basis: 0;
  flex-grow: 9999;
  margin: calc(${size.gap} / 2);
  min-width: calc(100% - ${size.gap});

  @media ${breakpoints.sm} {
    min-width: calc(480px - ${size.gap});
  }

  @media ${breakpoints.md} {
    min-width: calc(640px - ${size.gap});
  }
`

const MyAside = styled.div`
  flex-basis: ${size.aside};
  flex-grow: 1;
  margin: calc(${size.gap} / 2);

  & > * + * {
    margin-top: 48px;
  }
`

const MyAsideSection = styled.section`
  & > * + * {
    margin-top: 16px;
  }
`

const MyCategoryList = styled.ul`
  display: grid;
  gap: 0 16px;
  grid-template-columns: repeat(auto-fit, minmax(152px, 1fr));
`

const MyCategoryLink = styled.a`
  align-items: center;
  border-bottom: 1px dotted;
  display: flex;
  justify-content: space-between;
  padding: 12px 4px;
  position: relative;
  transition: color 0.3s;

  &::after {
    background-color: var(--color-primary);
    bottom: -1px;
    content: '';
    height: 2px;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    transition: opacity 0.3s;
  }

  ${hoverable(`
    color: var(--color-primary);

    &::after {
      opacity: 1;
    }
  `)}
`
