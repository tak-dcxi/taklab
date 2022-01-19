import React from 'react'
import styled from 'styled-components'
import { SiteHelmet } from '~/components/SiteHelmet'
import { BreadcrumbsType, SiteBreadcrumbs } from '~/components/SiteBreadcrumbs'
import { SubpageHeader } from '~/components/SubpageHeader'

type SubpageLayoutPropsType = {
  title: string
  description?: string
  image?: string
  children: React.ReactNode
}

export const SubpageTemplate: React.VFC<SubpageLayoutPropsType> = ({ title, description, image, children }) => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      string: title,
    },
  ]

  return (
    <>
      <SiteBreadcrumbs items={breadcrumbs} />
      <SiteHelmet title={title} description={description} image={image} />
      <SubpageHeader headline={title} />
      <Contents>{children}</Contents>
    </>
  )
}

const Contents = styled.div`
  padding: var(--padding-block-contents) 0;
`
