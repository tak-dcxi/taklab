import React from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { BaseIcon } from '~/components/BaseIcon'
import { hoverable } from '~/styles/tools/hoverable'

type PostPaginationPropsType = {
  perPage: number
  length: number
  onChange: (data: { [key: string]: number }) => void
}

export const PostPagination: React.VFC<PostPaginationPropsType> = ({ perPage, length, onChange }) => {
  const calculatePageCount = (): number => {
    return Math.ceil(length / perPage)
  }

  return (
    <MyRoot aria-label="ページ送り">
      <ReactPaginate
        pageCount={calculatePageCount()}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={onChange}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName={'is-active'}
        activeLinkClassName={'is-active'}
        previousLinkClassName={'previous-link'}
        nextLinkClassName={'next-link'}
        previousLabel={<BaseIcon type="chevron-left" />}
        nextLabel={<BaseIcon type="chevron-right" />}
        disabledClassName={'is-disabled'}
      />
    </MyRoot>
  )
}

const MyRoot = styled.nav`
  /* ReactPaginateで生成されるCSSを上書きします。 */
  overflow: hidden;

  & .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -2px;
  }

  & li {
    margin: 2px;
  }

  & a {
    align-items: center;
    background-color: var(--theme-button-background);
    color: var(--color-grayscale-7);
    display: inline-flex;
    height: 36px;
    justify-content: center;
    transition: background-color 0.3s;
    width: 36px;

    &.is-active {
      background-color: var(--color-grayscale-3);
    }

    &:not(.is-active) {
      cursor: pointer;

      ${hoverable(`
        background-color: var(--color-primary);
      `)}
    }
  }

  /* 先頭での先頭に進むボタンおよびに最後尾での次に進むボタンを非表示にします */
  & .is-disabled {
    display: none;
  }
`
