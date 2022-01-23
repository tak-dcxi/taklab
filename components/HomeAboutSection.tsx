import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import picture from '~/images/image-about-profile01.jpg'
import { clamp } from '~/styles/tools/clamp'
import { darkMode } from '~/styles/tools/darkMode'
import { SiteSNSLinks } from './SiteSNSLinks'
import { BaseStack } from './BaseStack'
import { HomeSection } from './HomeSection'
import { BaseParagraph } from './BaseParagraph'

export const HomeAboutSection: React.VFC = () => {
  return (
    <HomeSection title={'About Me'}>
      <Root>
        <Container>
          <Description>
            <BaseStack gap={'1.5rem'}>
              <Headline>I am TAK</Headline>
              <BaseParagraph>
                <p>1993年生まれ。群馬県出身、東京都在住。</p>
                <p>
                  インハウスWebデザイナーとしてWeb業界入りした後はWebデザイン・マークアップ・フロントエンド実装・WordPress実装などを担当。
                </p>
                <p>現在は某一部上場企業にてフロントエンドエンジニアという肩書きで勤務中。</p>
                <p className="HasMargin">
                  趣味はWebを問わず新しい技術を試すこと。最近は運動不足解消のためによく自転車乗ってます。
                </p>
                <p className="HasMargin">
                  Twitter・Zenn・noteにて主にフロントエンド周りの情報を発信しています。Twitterのフォロワー現在16,000人。
                </p>
              </BaseParagraph>
              <SiteSNSLinks />
            </BaseStack>
          </Description>
          <ImageArea>
            <MyImage>
              <Image
                src={picture}
                layout={'responsive'}
                width={'3'}
                height={'2'}
                decoding={'async'}
                loading={'lazy'}
                alt={'【写真】自画像をカフェラテアートで描いたもの'}
                objectFit={'cover'}
                quality={75}
              />
            </MyImage>
          </ImageArea>
        </Container>
      </Root>
    </HomeSection>
  )
}

const Root = styled.section`
  overflow: hidden;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc(${clamp(32, 56)} / 2 * -1);

  & > * {
    margin: calc(${clamp(32, 56)} / 2);
  }
`

const ImageArea = styled.div`
  flex-basis: max(360px, 44%);
  flex-grow: 1;
  order: -1;
`

const MyImage = styled.figure`
  position: relative;

  &::after {
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    ${darkMode(`
      background-color: rgba(0, 0, 0, 0.3);
    `)}
  }
`

const Description = styled.div`
  flex-basis: 0;
  flex-grow: 999;
  min-width: ${clamp(280, 400)};
`

const Headline = styled.h3`
  font-family: var(--font-designed);
  font-size: ${clamp(20, 24, true)};
  font-weight: normal;
  letter-spacing: var(--letter-spacing-headline);
  min-height: 0.01vw;
`
