import React from 'react'
import { NextPage } from 'next'
import { SubpageTemplate } from '~/components/SubpageTemplate'
import { BaseContainer } from '~/components/BaseContainer'

const AboutPage: NextPage = () => {
  return (
    <SubpageTemplate title={'About'} description={'作成中'}>
      <BaseContainer>作成中</BaseContainer>
    </SubpageTemplate>
  )
}

export default AboutPage
