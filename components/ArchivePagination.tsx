import React from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { BaseIcon } from '~/components/BaseIcon'

type ArchivePaginationPropsType = {
  perPage: number
  length: number
  onChange: (data: { [key: string]: number }) => void
}

export const ArchivePagination: React.VFC<ArchivePaginationPropsType> = ({ perPage, length, onChange }) => {
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

  & .pagination {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  & a {
    align-items: center;
    background-color: var(--color-grayscale-6);
    border: 1px solid var(--color-grayscale-3);
    display: inline-flex;
    height: 40px;
    justify-content: center;
    width: 40px;

    &.is-active {
      background-color: var(--color-grayscale-5);
    }

    &:not(.is-active) {
      cursor: pointer;
    }
  }

  /* 先頭での先頭に進むボタンおよびに最後尾での次に進むボタンを非表示にします */
  & .is-disabled {
    display: none;
  }
`
