import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import picture from '~/images/image-about-profile01.jpg'
import { clamp } from '~/styles/tools/clamp'
import { darkMode } from '~/styles/tools/darkMode'

export const AboutProfile: React.VFC = () => {
  return (
    <Root>
      <Description>
        <Headline>I am TAK</Headline>
        <Paragraph>
          <p>1993年生まれ。群馬県出身、東京都在住。</p>
          <p>
            インハウスWebデザイナーとしてWeb業界入りした後はWebデザイン・マークアップ・フロントエンド実装・WordPress実装などを担当。
          </p>
          <p>現在は某一部上場企業にてフロントエンドエンジニアという肩書きで勤務中。</p>
          <p className="HasMargin">
            趣味はWebを問わず新しい技術を試すこと。最近は運動不足解消のためによく自転車乗ってます。
          </p>
          <p className="HasMargin">
            Twitter・Zenn・noteにて主にCSS周りのTipsやアイデアを発信しています。Twitterのフォロワー現在16,000人。
          </p>
        </Paragraph>
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
            alt={''}
            objectFit={'cover'}
            quality={75}
          />
        </MyImage>
      </ImageArea>
    </Root>
  )
}

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const ImageArea = styled.div`
  flex-basis: max(480px, 50%);
  flex-grow: 1;
  margin-right: ${clamp(16, 32)};
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
  min-width: ${clamp(280, 440)};
  padding: ${clamp(16, 32)};
`

const Headline = styled.h3`
  font-family: var(--font-designed);
  font-size: ${clamp(20, 28, true)};
  font-weight: normal;
  letter-spacing: var(--letter-spacing-headline);
  min-height: 0.01vw;
`

const Paragraph = styled.div`
  letter-spacing: var(--letter-spacing-text);
  line-height: var(--leading-loose);
  margin-top: 1.5rem;

  & .HasMargin {
    margin-top: 1.5em;
  }
`
