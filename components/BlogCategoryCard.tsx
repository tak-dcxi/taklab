import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { clamp } from '~/styles/tools/clamp'
import { hoverable } from '~/styles/tools/hoverable'

type BlogCategoryCard = {
  id: string
  name: string
  image: string
}

export const BlogCategoryCard: React.VFC<BlogCategoryCard> = ({ id, name, image }) => {
  const src: string = `${image}?fit=crop&w=375&h=95`

  return (
    <Link href={`/blog/category/[category]/1`} as={`/blog/category/${id}/1`} passHref>
      <MyLink>
        {name}
        <ImageWrapper>
          <Image src={src} alt={''} layout="fill" decoding="async" loading="lazy" objectFit="cover" quality={75} />
        </ImageWrapper>
      </MyLink>
    </Link>
  )
}

const MyLink = styled.a`
  align-items: center;
  color: var(--color-grayscale-7);
  display: flex;
  font-family: var(--font-designed);
  font-size: ${clamp(14, 20, true)};
  isolation: isolate;
  justify-content: center;
  letter-spacing: var(--letter-spacing-headline);
  min-height: 0.01vw;
  overflow: hidden;
  padding: ${clamp(24, 48)} 16px;
  position: relative;
`

const ImageWrapper = styled.span`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;

  &::after {
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
  }

  & img {
    transition: transform 0.3s;
  }

  ${hoverable(
    `
    &::after {
      opacity: 0.5;
    }

    & img {
      transform: scale(1.1);
    }
  `,
    MyLink
  )}
`
