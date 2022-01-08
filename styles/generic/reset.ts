import { css } from 'styled-components'

export const reset = css`
  *,
  ::before,
  ::after {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  h1 {
    margin: 0;
  }

  strong,
  b {
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;

    & svg {
      pointer-events: none;
    }
  }

  ul,
  ol {
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    max-width: 100%;
    vertical-align: middle;
  }

  img,
  svg,
  video,
  canvas {
    height: auto;
  }

  svg:not([fill]) {
    fill: currentColor;
  }

  iframe {
    border-style: none;
  }

  input[type='text'] {
    line-height: normal;
  }

  [type='number']::-webkit-outer-spin-button,
  [type='number']::-webkit-inner-spin-button {
    appearance: none;
  }

  fieldset {
    border: 0;
    min-width: auto;
    padding: 0;
  }

  legend {
    display: block;
  }
`
