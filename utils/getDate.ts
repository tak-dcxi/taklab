export const getDate = (date: string, locate: 'en' | 'ja_JP'): string => {
  return new Date(date).toLocaleDateString(locate, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
