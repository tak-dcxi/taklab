import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { debounce } from '~/utils/debounce'

type SiteHeadTagsPropsType = {
  title?: string
  description?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export const SiteHeadTags: React.VFC<SiteHeadTagsPropsType> = ({ title, description, type, noindex }) => {
  const siteName: string = 'Next + WordPress Template'
  const siteDescription: string = 'ここにdescriptionが入ります。'
  const baseURL: string = process.env.BASE_URL
  const currentURL: string = baseURL + useRouter().pathname

  const [viewport, setViewport] = useState('width=device-width,initial-scale=1')

  useEffect(() => {
    const handleResize = (): void => {
      const value: string = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360'
      if (viewport !== value) setViewport(value)
    }

    window.addEventListener(
      'resize',
      debounce(() => handleResize())
    )
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [viewport])

  return (
    <Head>
      <title>{title || siteName}</title>
      <meta name="viewport" content={viewport} />
      <meta name="description" content={description || siteDescription} />
      <meta name="format-detection" content="email=no,telephone=no,address=no" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={currentURL} />
      <meta name="theme-color" content="#333" />
      <meta property="og:type" content={type || 'article'} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:url" content={currentURL} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:site_name" content={title || siteName} />
      <meta property="og:image" content={`${baseURL}/ogp.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}
