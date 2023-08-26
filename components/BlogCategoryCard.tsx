import React, { useRef } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'
import { hoverable } from '~/styles/tools/hoverable'
import { BaseGrid } from './BaseGrid'
import { getCategories } from '~/libs/microCMS'
import { CategoriesType } from '~/types/microCMS'

const fetchCategories = async (): Promise<CategoriesType[]> => {
  const response = await getCategories()
  return response.contents
}

export const BlogCategoryCard: React.VFC = () => {
  const { data: categories, error } = useSWR('blog-category', fetchCategories)

  if (error) return <p>カテゴリを取得できませんでした</p>
  if (!categories) return <p>Loading...</p>

  return (
    <BaseGrid as={'ul'} gap={'8px'} columnMin={clamp(148, 240)} track={'fill'}>
      {categories.map((category: CategoriesType, index: number) => {
        return (
          <li key={index}>
            <MyLink href={`/blog/category/${category.id}/1`} passHref>
              {category.name}
              <ImageWrapper>
                <Image
                  src={`${category.image.url}?fit=crop&w=375&h=95`}
                  alt={''}
                  layout="fill"
                  decoding="async"
                  loading="lazy"
                  objectFit="cover"
                  quality={80}
                />
              </ImageWrapper>
            </MyLink>
          </li>
        )
      })}
    </BaseGrid>
  )
}

const MyLink = styled(Link)`
  border-radius: 4px;
  color: var(--color-grayscale-7);
  display: grid;
  font-family: var(--font-designed);
  font-size: ${clamp(14, 20, true)};
  isolation: isolate;
  letter-spacing: var(--letter-spacing-headline);
  min-height: 120px;
  overflow: hidden;
  padding: 16px;
  place-items: center;
  position: relative;
`

const ImageWrapper = styled.span`
  position: absolute;
  inset: 0;
  z-index: -1;

  &::after {
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
  }

  & img {
    transition: transform 0.3s;
  }

  ${hoverable(
    `
    &::after {
      opacity: 0.5;
    }

    & img {
      transform: scale(1.1);
    }
  `,
    MyLink
  )}
`
