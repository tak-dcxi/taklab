import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { globalFontSize } from '~/styles/settings/CSSVariables'

type SiteFirstViewPropsType = {
  headline: string
  image?: string
}

export const SiteFirstView: React.VFC<SiteFirstViewPropsType> = ({ headline, image }) => {
  return (
    <MyRoot>
      <MyHeadline>{headline}</MyHeadline>
      {image && (
        <MyImageWrapper>
          <Image
            src={image}
            alt=""
            layout="fill"
            decoding="async"
            loading={'eager'}
            objectFit={'cover'}
            quality={30}
            priority
          />
        </MyImageWrapper>
      )}
    </MyRoot>
  )
}

const MyRoot = styled.header`
  background-color: var(--grayscale-2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  min-height: 480px;

  & > * {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }
`

const MyHeadline = styled.h1`
  color: var(--text-color-lighten);
  display: grid;
  font-size: ${40 / globalFontSize}rem;
  font-weight: bold;
  padding: 32px;
  place-items: center;
  z-index: 1;
`

const MyImageWrapper = styled.div`
  position: relative;

  &::after {
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  & * {
    display: block;
    height: 100%;
    width: 100%;
  }

  & img {
    object-fit: cover;
  }
`
