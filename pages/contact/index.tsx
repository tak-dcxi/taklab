import React from 'react'
import { NextPage } from 'next'
import { SubpageTemplate } from '~/components/SubpageTemplate'
import { BaseContainer } from '~/components/BaseContainer'
import { BaseStack } from '~/components/BaseStack'
import { ContactSubmitForm } from '~/components/ContactSubmitForm'
import { clamp } from '~/styles/tools/clamp'
import { WysiwygArea } from '~/components/WysiwygArea'

const ContactPage: NextPage = () => {
  const description =
    '<p>お仕事のご依頼やご相談、イベントでの登壇依頼、当サイトおよび私に対するご要望・ご感想・クレームやメッセージはこちらのお問い合わせフォームよりお気軽にお問い合わせください。</p><p>また、当サイトへの広告掲載依頼や記事投稿で紹介して欲しいサービスやコンテンツなどがありましたらご連絡ください。<br />内容を厳選した上でご紹介させていただきます。</p><p>お問い合わせの内容によっては返信を控えさせていただく場合がございます。あらかじめご了承ください。</p>'

  return (
    <SubpageTemplate title={'Contact'} description={description}>
      <BaseContainer maxWidth={'var(--max-width-narrow)'}>
        <BaseStack gap={clamp(64, 80)}>
          <WysiwygArea>{description}</WysiwygArea>
          <ContactSubmitForm />
        </BaseStack>
      </BaseContainer>
    </SubpageTemplate>
  )
}

export default ContactPage
