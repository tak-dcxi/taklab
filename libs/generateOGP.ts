import base64url from 'base64url'

const BASE_TEXT_IMAGE_URL = 'https://images.microcms-assets.io/~text'

/**
 * OpenGraph (OG) 画像のURLを生成する関数
 * @param {string} url - 画像のベースURL
 * @param {string} text - 画像上に表示するテキスト
 * @returns {string} 合成されたOG画像のURL
 */

export const generateOgImage = (url: string, text: string): string => {
  const base64title: string = base64url(text)
  const textImage: string = `${BASE_TEXT_IMAGE_URL}?txtsize=40&w=1000&h=400&txt-align=center,middle&txt-color=FEFEFE&txtfont=Hiragino%20Sans%20W6&txt64=${base64title}`
  const textImageUrl: string = base64url(textImage)

  const resultUrl = `${url}?fit=crop&w=1200&h=630&blend-mode=normal&blend=AA1C1C1C&blur=100&mark-align=center%2Cmiddle&mark-pad=0&fit=crop&mark64=${textImageUrl}`

  return resultUrl
}
