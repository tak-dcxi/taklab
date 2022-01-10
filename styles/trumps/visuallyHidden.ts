import { css } from 'styled-components'

// https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/
// https://github.com/ampproject/amphtml/blob/0222243cc2c4cf39f1dbefcfd3b196450f5f0b97/css/ampshared.css#L197-L227

export const visuallyHiddenStyle = css`
  border: 0 !important;
  display: block !important;
  height: 4px !important;
  left: 0 !important;
  margin: 0 !important;
  opacity: 0 !important;
  overflow: hidden !important;
  padding: 0 !important;
  pointer-events: none !important;
  position: fixed !important;
  top: 0 !important;
  visibility: visible !important;
  width: 4px !important;
`

export const VisuallyHidden = css`
  .VisuallyHidden {
    ${visuallyHiddenStyle}
  }
`
