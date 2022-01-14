import base64url from 'base64url'

export const generateOgImage = (url: string, text: string): string => {
  // 引数で指定したテキストを Base64 エンコーディングします
  const base64title: string = base64url(text)

  // 文字画像のURLを作成
  const textImage: string = `https://images.microcms-assets.io/~text?txtsize=40&w=1000&h=400&txt-align=center,middle&txt-color=FEFEFE&txtfont=Hiragino%20Sans%20W6&txt64=${base64title}`

  // 文字画像のURLをBase64 エンコーディング
  const textImageUrl: string = base64url(textImage)

  // 文字画像と背景画像を合成する
  return `${url}?fit=crop&w=1200&h=630&blend-mode=normal&blend=AA1C1C1C&blur=100&mark-align=center%2Cmiddle&mark-pad=0&fit=crop&mark64=${textImageUrl}`
}
