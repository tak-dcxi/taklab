import React from 'react'
import { clamp } from '~/styles/tools/clamp'
import { BaseCenter } from './BaseCenter'
import { BaseLinkButton } from './BaseLinkButton'
import { BaseParagraph } from './BaseParagraph'
import { BaseStack } from './BaseStack'
import { HomeSection } from './HomeSection'

export const HomeContactSection: React.VFC = () => {
  return (
    <HomeSection title={'Contact'} background="strong">
      <BaseCenter maxWidth={'var(--max-width-narrow)'}>
        <BaseStack gap={clamp(48, 56)}>
          <BaseParagraph>
            お仕事のご依頼やご相談、イベントでの登壇依頼、当サイトおよび私に対するご要望・ご感想・メッセージはお問い合わせフォームよりお気軽にお問い合わせください。
          </BaseParagraph>
          <BaseCenter as={'p'} gutters={'0'} intrinsic>
            <BaseLinkButton href={'/contact'}>お問い合わせ</BaseLinkButton>
          </BaseCenter>
        </BaseStack>
      </BaseCenter>
    </HomeSection>
  )
}
