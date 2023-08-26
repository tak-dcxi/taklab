import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { hoverable } from '~/styles/tools/hoverable'
import { CategoriesType } from '~/types/microCMS'
import { BaseCenter } from './BaseCenter'
import { BaseHeadingType2 } from './BaseHeadingType2'
import { BaseIcon } from './BaseIcon'

type BlogPageCommonTemplatePropsType = {
  children: React.ReactNode
  categories: CategoriesType[]
}

export const BlogPageCommonTemplate: React.VFC<BlogPageCommonTemplatePropsType> = ({ children, categories }) => {
  return (
    <Root>
      {children}
      <BaseCenter>
        <Aside>
          <BaseHeadingType2 lv={2}>Category</BaseHeadingType2>
          <CategoryList>
            {categories.map((category, index) => {
              return (
                <li key={index}>
                  <CategoryLink href={`/blog/category/${category.id}/1`} passHref>
                    {category.name}
                    <BaseIcon type={'chevron-right'} size={`${14 / 16}rem`} />
                  </CategoryLink>
                </li>
              )
            })}
          </CategoryList>
        </Aside>
      </BaseCenter>
    </Root>
  )
}

const Root = styled.div`
  padding: var(--padding-block-contents) 0;
`

const Aside = styled.div`
  margin-top: 64px;

  & > * + * {
    margin-top: 48px;
  }
`

const CategoryList = styled.ul`
  display: grid;
  gap: 0 16px;
  grid-template-columns: repeat(auto-fit, minmax(152px, 1fr));
`

const CategoryLink = styled(Link)`
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
