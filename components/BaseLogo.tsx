import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

type BaseLogoPropsType = {
  size?: string
  color?: string
  presentation?: boolean
}

export const BaseLogo: React.VFC<BaseLogoPropsType> = ({ size, color = 'currentColor', presentation }) => {
  const randomID: string = uuid()

  return (
    <MySVGTag
      width="220"
      height="20"
      viewBox="0 0 220 20"
      fill={color}
      size={size}
      {...(presentation ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-labelledby': randomID })}
    >
      {!presentation && <title id={randomID}>TAK / Web Creator</title>}
      <path d="M9.442 19H5.809V4.891H1.156V1.868h12.938v3.023H9.442Zm16.341 0-1.242-4.078h-6.246L17.053 19h-3.914l6.047-17.2h4.441l6.07 17.2Zm-2.107-7.125q-1.723-5.543-1.939-6.27t-.311-1.148q-.387 1.5-2.215 7.418ZM45.876 19H41.75l-4.489-7.219-1.535 1.1V19h-3.633V1.867h3.633v7.84l1.43-2.016 4.641-5.824h4.031l-5.977 7.582Zm16.51-17.133L55.999 19h-3.246L59.14 1.867ZM88.061 19h-4.136l-2.32-9q-.129-.48-.439-1.986t-.357-2.021q-.07.633-.352 2.033t-.434 2L77.714 19h-4.125L69.218 1.867h3.574l2.191 9.352q.574 2.59.832 4.488.07-.668.322-2.068t.475-2.174l2.5-9.6h3.434l2.5 9.6q.164.645.41 1.969t.375 2.273q.117-.914.375-2.279t.469-2.209l2.18-9.352h3.574Zm11.42-10.8a2.267 2.267 0 0 0-1.781.721 3.336 3.336 0 0 0-.738 2.045h5.014a2.979 2.979 0 0 0-.691-2.045 2.341 2.341 0 0 0-1.804-.721Zm.5 11.039a6.762 6.762 0 0 1-4.945-1.746 6.611 6.611 0 0 1-1.781-4.945 7.272 7.272 0 0 1 1.646-5.092 5.863 5.863 0 0 1 4.553-1.8 5.771 5.771 0 0 1 4.324 1.582 5.985 5.985 0 0 1 1.547 4.371v1.731h-8.449a3.44 3.44 0 0 0 .9 2.379 3.175 3.175 0 0 0 2.367.855 9.827 9.827 0 0 0 2.238-.246 11.2 11.2 0 0 0 2.2-.785v2.766a8.393 8.393 0 0 1-2 .7 12.635 12.635 0 0 1-2.596.225ZM115.76 5.657a4.238 4.238 0 0 1 3.633 1.811 8.308 8.308 0 0 1 1.313 4.963 8.162 8.162 0 0 1-1.354 5.027 4.381 4.381 0 0 1-3.682 1.776 4.345 4.345 0 0 1-3.621-1.676h-.246L111.205 19h-2.729V.766h3.574v4.242q0 .809-.141 2.59h.141a4.135 4.135 0 0 1 3.714-1.946Zm-1.148 2.859a2.257 2.257 0 0 0-1.934.814 4.676 4.676 0 0 0-.633 2.689v.381a5.52 5.52 0 0 0 .631 3.026 2.238 2.238 0 0 0 1.986.914 1.993 1.993 0 0 0 1.752-1.014 5.487 5.487 0 0 0 .65-2.947 5.2 5.2 0 0 0-.656-2.9 2.058 2.058 0 0 0-1.792-.967Zm23.32-3.867a3.7 3.7 0 0 0-3.176 1.541 7.169 7.169 0 0 0-1.125 4.295q0 5.73 4.3 5.73a13.6 13.6 0 0 0 4.371-.9v3.04a12.139 12.139 0 0 1-4.711.879 7.185 7.185 0 0 1-5.715-2.267q-1.98-2.268-1.98-6.51a10.63 10.63 0 0 1 .973-4.682 7.03 7.03 0 0 1 2.795-3.082 8.268 8.268 0 0 1 4.271-1.072 11.529 11.529 0 0 1 5.016 1.207l-1.175 2.953a19.4 19.4 0 0 0-1.934-.8 5.768 5.768 0 0 0-1.907-.336Zm15.287 1.008a5.764 5.764 0 0 1 1.207.105l-.27 3.352a4.1 4.1 0 0 0-1.055-.117 3.79 3.79 0 0 0-2.666.879 3.177 3.177 0 0 0-.955 2.461V19h-3.574V5.9h2.707l.527 2.2h.176a4.925 4.925 0 0 1 1.646-1.775 4.06 4.06 0 0 1 2.26-.673ZM161.99 8.2a2.267 2.267 0 0 0-1.781.721 3.336 3.336 0 0 0-.738 2.045h5.016a2.979 2.979 0 0 0-.691-2.045 2.341 2.341 0 0 0-1.802-.721Zm.5 11.039a6.762 6.762 0 0 1-4.945-1.746 6.611 6.611 0 0 1-1.781-4.945 7.272 7.272 0 0 1 1.646-5.092 5.863 5.863 0 0 1 4.553-1.8 5.771 5.771 0 0 1 4.324 1.582 5.985 5.985 0 0 1 1.547 4.371v1.731h-8.449a3.44 3.44 0 0 0 .9 2.379 3.175 3.175 0 0 0 2.367.855 9.827 9.827 0 0 0 2.238-.246 11.2 11.2 0 0 0 2.2-.785v2.766a8.393 8.393 0 0 1-2 .7 12.635 12.635 0 0 1-2.593.225ZM179.308 19l-.691-1.781h-.094a5.279 5.279 0 0 1-1.857 1.576 6 6 0 0 1-2.49.439 4.027 4.027 0 0 1-2.971-1.078 4.14 4.14 0 0 1-1.084-3.07 3.457 3.457 0 0 1 1.455-3.076 8.454 8.454 0 0 1 4.4-1.1l2.273-.07v-.57a1.782 1.782 0 0 0-2.039-1.992 9.292 9.292 0 0 0-3.691.949l-1.184-2.414a10.651 10.651 0 0 1 5.016-1.184 6.248 6.248 0 0 1 4.043 1.148 4.244 4.244 0 0 1 1.406 3.492V19Zm-1.055-6.07-1.383.047a4.428 4.428 0 0 0-2.32.563 1.767 1.767 0 0 0-.762 1.57q0 1.512 1.734 1.512a2.747 2.747 0 0 0 1.986-.715 2.511 2.511 0 0 0 .744-1.9Zm12.99 3.457a7.748 7.748 0 0 0 2.25-.41v2.66a8.022 8.022 0 0 1-3.281.6 4.016 4.016 0 0 1-3.123-1.087 4.718 4.718 0 0 1-.979-3.252V8.582h-1.711V7.07l1.969-1.2 1.031-2.766h2.285V5.9h3.668v2.684h-3.668V14.9a1.4 1.4 0 0 0 .428 1.125 1.688 1.688 0 0 0 1.131.362Zm7.986-3.961a5.5 5.5 0 0 0 .639 2.941 2.284 2.284 0 0 0 2.08 1 2.248 2.248 0 0 0 2.057-.99 5.578 5.578 0 0 0 .627-2.947 5.412 5.412 0 0 0-.633-2.918 2.288 2.288 0 0 0-2.074-.973 2.281 2.281 0 0 0-2.062.967 5.407 5.407 0 0 0-.634 2.92Zm9.059 0a7.04 7.04 0 0 1-1.687 5 6.119 6.119 0 0 1-4.7 1.8 6.574 6.574 0 0 1-3.325-.818 5.5 5.5 0 0 1-2.215-2.373 7.974 7.974 0 0 1-.773-3.609 7 7 0 0 1 1.676-4.992 6.154 6.154 0 0 1 4.711-1.781 6.611 6.611 0 0 1 3.328.82 5.475 5.475 0 0 1 2.215 2.355 7.9 7.9 0 0 1 .77 3.598Zm10.506-6.773a5.764 5.764 0 0 1 1.207.105l-.27 3.352a4.1 4.1 0 0 0-1.055-.118 3.79 3.79 0 0 0-2.666.879 3.177 3.177 0 0 0-.955 2.461V19h-3.579V5.9h2.707l.527 2.2h.176a4.925 4.925 0 0 1 1.646-1.775 4.06 4.06 0 0 1 2.261-.673Z" />
    </MySVGTag>
  )
}

type MySVGTagPropsType = {
  size: string
}

const MySVGTag = styled.svg<MySVGTagPropsType>`
  width: ${(props) => props.size};
`
