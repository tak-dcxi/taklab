import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { BaseIcon } from '~/components/BaseIcon'
import { hoverable } from '~/styles/tools/hoverable'
import { PER_PAGE } from '~/constant/archive'
import { CategoriesType } from '~/types/microCMS'

type BlogArchivePaginationPropsType = {
  totalCount: number
  currentPage: number
  currentCategory?: CategoriesType
}

export const BlogArchivePagination: React.VFC<BlogArchivePaginationPropsType> = ({
  totalCount,
  currentPage,
  currentCategory,
}) => {
  const range = (start: number, end: number): number[] =>
    [...[end - start + 1]].map((_: number, i: number) => start + i)

  const paginationPath: string = currentCategory ? `/blog/${currentCategory.id}/page` : '/blog/page'

  const lastPage: number = Math.ceil(totalCount / PER_PAGE)

  return (
    <Root aria-label="ページ送り">
      <List>
        {currentPage !== 1 && (
          <ListItem>
            <Link href={`${paginationPath}/${currentPage - 1}`} passHref>
              <Button aria-label="前のページに戻る">
                <BaseIcon type={'chevron-left'} size={'1rem'} />
              </Button>
            </Link>
          </ListItem>
        )}

        <ListItem key={1}>
          <Link href={`${paginationPath}/1`} passHref>
            <Button {...(currentPage === 1 && { 'aria-current': 'location' })}>1</Button>
          </Link>
        </ListItem>

        {range(2, lastPage - 1).map((number: number, index: number) => {
          return Math.abs(currentPage - number) < 3 ? (
            <ListItem key={index}>
              <Link href={`${paginationPath}/${number}`} passHref>
                <Button {...(currentPage === number && { 'aria-current': 'location' })}>{number}</Button>
              </Link>
            </ListItem>
          ) : (
            Math.abs(currentPage - number) === 3 && (
              <ListItem key={index}>
                <Period>...</Period>
              </ListItem>
            )
          )
        })}

        <ListItem key={lastPage}>
          <Link href={`${paginationPath}/${lastPage}`} passHref>
            <Button {...(currentPage === lastPage && { 'aria-current': 'location' })}>{lastPage}</Button>
          </Link>
        </ListItem>

        {currentPage !== lastPage && (
          <ListItem>
            <Link href={`${paginationPath}/${currentPage + 1}`} passHref>
              <Button aria-label="次のページへ進む">
                <BaseIcon type={'chevron-right'} size={'1rem'} />
              </Button>
            </Link>
          </ListItem>
        )}
      </List>
    </Root>
  )
}

const Root = styled.nav`
  overflow: hidden;
`

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -2px;
`

const ListItem = styled.li`
  margin: 2px;
`

const buttonStyle = css`
  align-items: center;
  background-color: var(--theme-button-background);
  color: var(--color-grayscale-7);
  display: inline-flex;
  height: ${36 / 16}rem;
  justify-content: center;
  transition: background-color 0.3s;
  width: ${36 / 16}rem;
`

const Button = styled.a`
  ${buttonStyle}

  &[aria-current] {
    background-color: var(--color-grayscale-3);
  }

  &:not([aria-current]) {
    ${hoverable(`
      background-color: var(--color-primary);
    `)}
  }
`

const Period = styled.span`
  ${buttonStyle}
`
