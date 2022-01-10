import React from 'react'
import styled from 'styled-components'
import { ArchivePagination } from '~/components/ArchivePagination'
import { BaseContainer } from '~/components/BaseContainer'
import { SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SiteFirstView } from '~/components/SiteFirstView'
import { SiteHeadTags } from '~/components/SiteHeadTags'

type ArchiveLayoutPropsType = {
  children: React.ReactNode
  title: string
  image?: string
  breadcrumbs: { [key: string]: string }[]
  perPage: number
  length: number
  onPageChange: (data: { [key: string]: number }) => void
}

export const ArchiveLayout: React.VFC<ArchiveLayoutPropsType> = ({
  children,
  title,
  image,
  breadcrumbs,
  perPage,
  length,
  onPageChange,
}) => {
  const focusRef = React.useRef(null)

  const handlePageChange = (data: { [key: string]: number }): void => {
    onPageChange(data)
    focusRef.current.focus()
  }

  return (
    <>
      <SiteHeadTags title={title} />
      <SiteFirstView headline={title} image={image} />
      <BaseContainer>
        <SiteBreadcrumbs lists={breadcrumbs} />
        <MyContents>
          <MyArticleList ref={focusRef} tabIndex={-1}>
            {children}
          </MyArticleList>
          {length > perPage && <ArchivePagination length={length} perPage={perPage} onChange={handlePageChange} />}
        </MyContents>
      </BaseContainer>
    </>
  )
}

const MyContents = styled.div`
  padding: 80px 0;

  & > * + * {
    margin-top: 80px;
  }
`

const MyArticleList = styled.div`
  & > * + * {
    margin-top: 16px;
  }
`
