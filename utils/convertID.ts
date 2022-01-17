export const toNumberID = (value: string | string[]): number => {
  if (Array.isArray(value)) return Number(value[0])

  return Number(value)
}

export const toStringID = (value: string | string[]): string => {
  if (Array.isArray(value)) return value[0]

  return value
}
