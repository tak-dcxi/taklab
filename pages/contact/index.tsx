import React from 'react'
import { NextPage } from 'next'
import { SubpageTemplate } from '~/components/SubpageTemplate'
import { BaseCenter } from '~/components/BaseCenter'
import { BaseStack } from '~/components/BaseStack'
import { ContactSubmitForm } from '~/components/ContactSubmitForm'
import { clamp } from '~/styles/tools/clamp'
import { BaseParagraph } from '~/components/BaseParagraph'

const ContactPage: NextPage = () => {
  const description = ''

  return (
    <SubpageTemplate title={'Contact'} description={description}>
      <BaseCenter maxWidth={'var(--max-width-narrow)'}>
        <BaseStack gap={clamp(64, 80)}>
          <BaseParagraph>
            <p>
              お仕事のご依頼やご相談、イベントでの登壇依頼、当サイトおよび私に対するご要望・ご感想・クレームやメッセージはこちらのお問い合わせフォームよりお気軽にお問い合わせください。
            </p>
            <p className="HasMargin">
              また、当サイトへの広告掲載依頼や記事投稿で紹介して欲しいサービスやコンテンツなどがありましたらご連絡ください。
              <br />
              内容を厳選した上でご紹介させていただきます。
            </p>
            <p className="HasMargin">
              お問い合わせの内容によっては返信を控えさせていただく場合がございます。あらかじめご了承ください。
            </p>
          </BaseParagraph>
          <ContactSubmitForm />
        </BaseStack>
      </BaseCenter>
    </SubpageTemplate>
  )
}

export default ContactPage
