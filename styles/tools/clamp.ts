import { css, FlattenSimpleInterpolation } from 'styled-components'

export const clamp = (property: string, min: string, base: string, max: string): FlattenSimpleInterpolation => {
  return css`
    ${property}: max(${min}, min(${base}, ${max}));

    @supports (${property}: clamp(${min}, ${base}, ${max})) {
      ${property}: clamp(${min}, ${base}, ${max});
    }
  `
}
