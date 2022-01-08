export const getDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
