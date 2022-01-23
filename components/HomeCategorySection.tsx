import React from 'react'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'
import { CategoriesType } from '~/types/microCMS'
import { BaseGrid } from './BaseGrid'
import { BlogCategoryCard } from './BlogCategoryCard'
import { HomeSection } from './HomeSection'

type HomeCategorySectionPropsType = {
  categories: CategoriesType[]
}

export const HomeCategorySection: React.VFC<HomeCategorySectionPropsType> = ({ categories }) => {
  return (
    <HomeSection title={'Category'}>
      <BaseGrid as={'ul'} gap={'4px'} columnMin={clamp(148, 240)} track={'fill'}>
        {categories.map((category: CategoriesType, index: number) => {
          return (
            <li key={index}>
              <BlogCategoryCard id={category.id} name={category.name} image={category.image.url} />
            </li>
          )
        })}
      </BaseGrid>
    </HomeSection>
  )
}
