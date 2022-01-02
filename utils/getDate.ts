export const getDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ja-JP', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
