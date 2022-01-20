export type BreakpointsType = {
  sm: string
  smUntil: string
  md: string
  mdUntil: string
  lg: string
  lgUntil: string
  xl: string
  xlUntil: string
  xxl: string
  xxlUntil: string
}

export const breakpoints: BreakpointsType = {
  sm: '(min-width: 576px)',
  smUntil: 'not all and (min-width: 576px)',
  md: '(min-width: 768px)',
  mdUntil: 'not all and (min-width: 768px)',
  lg: '(min-width: 992px)',
  lgUntil: 'not all and (min-width: 992px)',
  xl: '(min-width: 1200px)',
  xlUntil: 'not all and (min-width: 1200px)',
  xxl: '(min-width: 1400px)',
  xxlUntil: 'not all and (min-width: 1400px)',
}
