import React from 'react'
import { clamp } from '~/styles/tools/clamp'
import { BaseCenter } from './BaseCenter'
import { BaseGrid } from './BaseGrid'
import { BaseLinkButton } from './BaseLinkButton'
import { HomeSection } from './HomeSection'

type HomeLatestPostsSection = {
  children: React.ReactNode
  appendButton: boolean
}

export const HomeLatestPostsSection: React.VFC<HomeLatestPostsSection> = ({ children, appendButton }) => {
  return (
    <HomeSection title={'Latest Posts'}>
      <BaseGrid gap={clamp(24, 32)} columnMin={clamp(212, 280)} track={'fill'}>
        {children}
      </BaseGrid>
      {appendButton && (
        <BaseCenter intrinsic>
          <BaseLinkButton href={'/blog/'}>投稿をもっと見る</BaseLinkButton>
        </BaseCenter>
      )}
    </HomeSection>
  )
}
