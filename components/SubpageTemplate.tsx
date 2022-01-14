import React from 'react'
import styled from 'styled-components'
import { client, SEOType } from '~/libs/microCMS'
import { SiteHeadTags } from '~/components/SiteHeadTags'
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
      <SiteHeadTags title={title} description={description} image={image} />
      <SubpageHeader headline={title} />
      <Contents>{children}</Contents>
    </>
  )
}

const Contents = styled.div`
  padding: var(--contents-block-padding);
`
