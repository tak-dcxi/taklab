import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '~/constant/breakpoints'
import { hoverable } from '~/styles/tools/hoverable'
import { CategoriesType } from '~/types/microCMS'
import { BaseContainer } from './BaseContainer'
import { BaseHeadingType2 } from './BaseHeadingType2'
import { BaseIcon } from './BaseIcon'
import { SiteAdSence } from './SiteAdSence'

type BlogPageCommonTemplatePropsType = {
  children: React.ReactNode
  categories: CategoriesType[]
}

export const BlogPageCommonTemplate: React.VFC<BlogPageCommonTemplatePropsType> = ({ children, categories }) => {
  return (
    <BaseContainer>
      <SidebarWrapper>
        <Sidebar>
          <Main>{children}</Main>
          <Aside>
            <AsideSection>
              <BaseHeadingType2 lv={2}>Category</BaseHeadingType2>
              <CategoryList>
                {categories.map((category, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/blog/${category.id}`} passHref>
                        <CategoryLink>
                          {category.name}
                          <BaseIcon type={'chevron-right'} size={`${14 / 16}rem`} />
                        </CategoryLink>
                      </Link>
                    </li>
                  )
                })}
              </CategoryList>
            </AsideSection>
            <SiteAdSence />
          </Aside>
        </Sidebar>
      </SidebarWrapper>
    </BaseContainer>
  )
}

const size: { [key: string]: string } = {
  gap: 'max(7.5%, 64px)',
  aside: '280px',
}

const SidebarWrapper = styled.div`
  padding: var(--padding-block-contents) 0;
`

const Sidebar = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc((${size.gap} / 2) * -1);
`

const Main = styled.div`
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

const Aside = styled.div`
  flex-basis: ${size.aside};
  flex-grow: 1;
  margin: calc(${size.gap} / 2);

  & > * + * {
    margin-top: 48px;
  }
`

const AsideSection = styled.section`
  & > * + * {
    margin-top: 16px;
  }
`

const CategoryList = styled.ul`
  display: grid;
  gap: 0 16px;
  grid-template-columns: repeat(auto-fit, minmax(152px, 1fr));
`

const CategoryLink = styled.a`
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
