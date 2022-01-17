import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

type CommonPropsType = {
  size?: number
}

type BaseSocialIconPropsType = {
  color?: string
  type: 'twitter' | 'facebook' | 'github' | 'zenn' | 'note' | 'rss' | 'line' | 'pocket' | 'hatena' | 'feedly'
  presentation?: boolean
} & CommonPropsType

export const BaseSocialIcon: React.VFC<BaseSocialIconPropsType> = ({ color, size = 100, type, presentation }) => {
  const randomID: string = uuid()

  return (
    <SVGtag
      className="BaseSocialIcon"
      width="24"
      height="24"
      viewBox="0 0 100 100"
      {...(presentation ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-labelledby': randomID })}
      {...{ size }}
    >
      {type === 'twitter' && (
        <>
          {!presentation && <title id={randomID}>Twitter</title>}
          <path
            d="M89.762 29.6c.061.882.061 1.763.061 2.653 0 27.109-20.638 58.375-58.375 58.375v-.016A58.081 58.081 0 0 1 0 81.414a41.731 41.731 0 0 0 4.883.3 41.2 41.2 0 0 0 25.48-8.8A20.542 20.542 0 0 1 11.2 58.664a20.45 20.45 0 0 0 9.263-.353A20.518 20.518 0 0 1 4 38.2v-.26a20.386 20.386 0 0 0 9.311 2.568 20.542 20.542 0 0 1-6.348-27.394 58.23 58.23 0 0 0 42.283 21.434 20.536 20.536 0 0 1 34.963-18.712 41.169 41.169 0 0 0 13.028-4.981 20.593 20.593 0 0 1-9.019 11.347A40.8 40.8 0 0 0 100 18.974 41.679 41.679 0 0 1 89.762 29.6Z"
            fill={color || '#1da1f2'}
          />
        </>
      )}
      {type === 'facebook' && (
        <>
          {!presentation && <title id={randomID}>Facebook</title>}
          <path
            d="M57.667 100V54.333H73l2.333-17.667H57.667V25.333c0-5.149 1.619-8.667 9-8.667H76v-16A127.976 127.976 0 0 0 62.333 0c-13.573 0-23 8.445-23 23.667v13H24v17.666h15.333V100Z"
            fill={color || '#3b5998'}
          />
        </>
      )}
      {type === 'github' && (
        <>
          {!presentation && <title id={randomID}>GitHub</title>}
          <path
            d="M91.515 24.428a48.834 48.834 0 0 0-17.849-17.85A47.973 47.973 0 0 0 49.047 0a47.978 47.978 0 0 0-24.619 6.578 48.828 48.828 0 0 0-17.85 17.85A47.976 47.976 0 0 0 0 49.045a47.666 47.666 0 0 0 9.356 28.834 48.036 48.036 0 0 0 24.172 17.722 2.859 2.859 0 0 0 2.554-.446 2.5 2.5 0 0 0 .83-1.915q0-.192-.032-3.448t-.032-5.683l-1.469.254a18.737 18.737 0 0 1-3.544.224 27.007 27.007 0 0 1-4.435-.452 9.918 9.918 0 0 1-4.279-1.914 8.1 8.1 0 0 1-2.809-3.927l-.639-1.47a15.957 15.957 0 0 0-2.011-3.257 7.706 7.706 0 0 0-2.778-2.426l-.447-.32a4.689 4.689 0 0 1-.83-.767 3.5 3.5 0 0 1-.574-.894q-.192-.448.319-.736a4.142 4.142 0 0 1 1.852-.285l1.277.191a9.323 9.323 0 0 1 3.161 1.532 10.307 10.307 0 0 1 3.1 3.32 11.257 11.257 0 0 0 3.544 3.992 7.519 7.519 0 0 0 4.183 1.373 18.161 18.161 0 0 0 3.631-.312 12.7 12.7 0 0 0 2.874-.958 10.347 10.347 0 0 1 3.126-6.582 43.73 43.73 0 0 1-6.546-1.15 26.062 26.062 0 0 1-6-2.492 17.192 17.192 0 0 1-5.141-4.278 20.562 20.562 0 0 1-3.352-6.706 31.888 31.888 0 0 1-1.309-9.579A18.627 18.627 0 0 1 22.8 33.335q-2.363-5.811.447-13.027 1.852-.575 5.492.862a38.4 38.4 0 0 1 5.333 2.459q1.693 1.02 2.714 1.724a46.122 46.122 0 0 1 24.525 0l2.427-1.532a34.369 34.369 0 0 1 5.874-2.811q3.385-1.277 5.175-.7 2.873 7.217.51 13.027a18.63 18.63 0 0 1 5.046 13.156 32.245 32.245 0 0 1-1.309 9.611 19.763 19.763 0 0 1-3.383 6.706 17.854 17.854 0 0 1-5.174 4.247 26.113 26.113 0 0 1-6 2.491 43.683 43.683 0 0 1-6.546 1.151q3.32 2.873 3.32 9.068v13.468a2.544 2.544 0 0 0 .8 1.915 2.774 2.774 0 0 0 2.522.446 48.03 48.03 0 0 0 24.166-17.719 47.675 47.675 0 0 0 9.355-28.834 48.016 48.016 0 0 0-6.579-24.615Z"
            fill={color || '#000'}
          />
        </>
      )}
      {type === 'zenn' && (
        <>
          {!presentation && <title id={randomID}>Zenn</title>}
          <g fill={color || '#3ea8ff'}>
            <path d="M2.018 98.592h20.575a3.326 3.326 0 0 0 2.663-1.452l56.64-93.069a1.747 1.747 0 0 0-1.574-2.663H60.837a2.6 2.6 0 0 0-2.3 1.331L1.05 96.898a1.164 1.164 0 0 0 .968 1.694Z" />
            <path d="m72.939 97.14 26.747-42.964a1.969 1.969 0 0 0-1.693-3.026H78.628a2.134 2.134 0 0 0-1.815.968L49.339 96.05a1.664 1.664 0 0 0 1.454 2.542h19.726a2.662 2.662 0 0 0 2.42-1.452Z" />
          </g>
        </>
      )}
      {type === 'note' && (
        <>
          {!presentation && <title id={randomID}>note</title>}
          <path
            d="M39.672 34.043v-7.572a7.458 7.458 0 0 1 .284-2.548 5.027 5.027 0 0 1 9.511 0 7.437 7.437 0 0 1 .285 2.548v11.676a9.634 9.634 0 0 1-.142 2.052 5.178 5.178 0 0 1-3.762 3.751 9.759 9.759 0 0 1-2.059.141H32.078a7.506 7.506 0 0 1-2.556-.283 5 5 0 0 1 0-9.482 7.507 7.507 0 0 1 2.556-.283Zm41.735 52.933H18.592V31.814a2.453 2.453 0 0 1 .745-1.8l16.292-16.246a2.47 2.47 0 0 1 1.81-.743h43.97Zm7.134-86.4A13.332 13.332 0 0 0 86.979.5H35.768c-.567 0-1.135.035-1.526.071a9.907 9.907 0 0 0-6.1 2.972l-19.058 19a9.855 9.855 0 0 0-2.98 6.086c-.036.389-.071.955-.071 1.521v62.38a13.025 13.025 0 0 0 .071 1.557 6.312 6.312 0 0 0 5.358 5.342 13.16 13.16 0 0 0 1.562.071h73.955a13.151 13.151 0 0 0 1.562-.071 6.314 6.314 0 0 0 5.359-5.342 13.359 13.359 0 0 0 .071-1.557V7.47a13.359 13.359 0 0 0-.071-1.557A6.314 6.314 0 0 0 88.541.571Z"
            fillRule="evenodd"
            fill={color || '#41c9b4'}
          />
        </>
      )}
      {type === 'rss' && (
        <>
          {!presentation && <title id={randomID}>RSS</title>}
          <g fill={color || 'var(--color-primary)'}>
            <path d="M7.904 1.003v13.013a78.169 78.169 0 0 1 78.082 78.083h13.013A91.194 91.194 0 0 0 7.904 1.003Z" />
            <path d="M7.904 26.02v13.217a52.915 52.915 0 0 1 52.864 52.862h13.216A66.153 66.153 0 0 0 7.904 26.02Z" />
            <path d="M7.904 52.45v13.217a26.457 26.457 0 0 1 26.433 26.431h13.215A39.686 39.686 0 0 0 7.904 52.45Z" />
            <path d="M10.549 79.903a9.547 9.547 0 1 0 9.549 9.547 9.547 9.547 0 0 0-9.549-9.547Z" />
          </g>
        </>
      )}
      {type === 'line' && (
        <>
          {!presentation && <title id={randomID}>LINE</title>}
          <path
            d="M89.28 67.946C78.796 80.055 55.338 94.804 49.996 97.058s-4.548-1.435-4.33-2.7c.127-.757.713-4.3.713-4.3a10.28 10.28 0 0 0-.162-4.529c-.562-1.394-2.777-2.125-4.405-2.474C17.789 79.874-.004 63.024-.004 42.913c0-22.433 22.437-40.686 50-40.686s50 18.253 50 40.686c0 8.98-3.466 17.068-10.716 25.033ZM30.428 51.002h-7.314V33.707a2.62 2.62 0 1 0-5.24 0v19.926a2.627 2.627 0 0 0 2.622 2.628h9.935a2.63 2.63 0 0 0 0-5.259Zm10.275-17.295a2.62 2.62 0 1 0-5.24 0v19.926a2.62 2.62 0 1 0 5.24 0Zm23.917 0a2.622 2.622 0 1 0-5.244 0v12.326l-10.18-13.9a2.62 2.62 0 0 0-4.718 1.575v19.925a2.622 2.622 0 1 0 5.243 0V41.307l10.175 13.901a2.62 2.62 0 0 0 4.723-1.575Zm16.076 12.592a2.629 2.629 0 0 0 0-5.258h-7.313v-4.7h7.313a2.631 2.631 0 0 0 0-5.261h-9.937a2.631 2.631 0 0 0-2.622 2.63v19.923a2.63 2.63 0 0 0 2.622 2.631h9.937a2.63 2.63 0 0 0 0-5.259h-7.313v-4.7Z"
            fill={color || '#00c300'}
          />
        </>
      )}
      {type === 'pocket' && (
        <>
          {!presentation && <title id={randomID}>Pocket</title>}
          <path
            d="M78.385 42.164 54.861 66.572a6.5 6.5 0 0 1-9.506 0L21.831 42.164a7.835 7.835 0 0 1-.2-10.476 6.49 6.49 0 0 1 9.687-.226l18.8 19.468 18.814-19.468a6.491 6.491 0 0 1 9.69.22 7.812 7.812 0 0 1-.187 10.476ZM99.563 8.173a9.082 9.082 0 0 0-8.503-6.471H9.078A9.175 9.175 0 0 0 .591 8.031 10.618 10.618 0 0 0 0 11.518v32.633l.35 6.489a53.769 53.769 0 0 0 19.509 36.662c.187.162.391.314.6.473l.125.1a47.838 47.838 0 0 0 19.555 9.337 46.923 46.923 0 0 0 9.953 1.081 46.118 46.118 0 0 0 9.2-.919 6.873 6.873 0 0 1 1.1-.27.687.687 0 0 0 .309-.132 48.3 48.3 0 0 0 18.784-9.121l.122-.139.562-.473a54.14 54.14 0 0 0 19.531-36.7l.3-6.489V11.47a10.155 10.155 0 0 0-.5-3.341Z"
            fill={color || '#ef3f56'}
          />
        </>
      )}
      {type === 'hatena' && (
        <>
          {!presentation && <title id={randomID}>はてなブックマーク</title>}
          <g fill={color || '#00a4de'}>
            <path d="M78.849 7.747h19.742v56.407H78.849Z" />
            <path d="M60.69 52.985q-5.01-5.594-13.944-6.278c5.3-1.443 9.15-3.554 11.585-6.374q3.635-4.175 3.626-11.316a20.248 20.248 0 0 0-2.42-9.971 17.987 17.987 0 0 0-7.079-6.861 30.125 30.125 0 0 0-9.663-3.151c-3.765-.6-10.353-.9-19.807-.9H0v83.73h23.684q14.272 0 20.571-.969a33.424 33.424 0 0 0 10.555-3.283 19.335 19.335 0 0 0 8.083-7.89 23.914 23.914 0 0 0 2.825-11.818c-.001-6.21-1.675-11.201-5.028-14.919ZM21.225 26.696h4.907q8.507 0 11.447 1.912c1.94 1.279 2.93 3.487 2.93 6.633 0 3.027-1.053 5.158-3.136 6.409-2.11 1.226-5.956 1.848-11.585 1.848h-4.563ZM40.69 74.713c-2.233 1.37-6.08 2.042-11.477 2.042h-7.986V58.464h8.331c5.543 0 9.375.7 11.413 2.088 2.071 1.392 3.09 3.849 3.09 7.378-.001 3.154-1.119 5.421-3.371 6.783Z" />
            <path d="M88.722 69.689A11.281 11.281 0 1 0 100 80.968a11.276 11.276 0 0 0-11.278-11.279Z" />
          </g>
        </>
      )}
      {type === 'feedly' && (
        <>
          {!presentation && <title id={randomID}>Feedly</title>}
          <path
            d="M96.796 63.61 69.491 90.896a11.012 11.012 0 0 1-7.8 3.23H38.295a11.008 11.008 0 0 1-7.247-2.71L3.203 63.588a11 11 0 0 1 0-15.519L42.224 9.078a11.019 11.019 0 0 1 15.53 0l39.042 39.01a11 11 0 0 1 0 15.522ZM56.668 31.403l-5.571-5.566a1.573 1.573 0 0 0-2.215 0l-28.923 28.9a1.567 1.567 0 0 0 0 2.211l3.974 3.97a1.565 1.565 0 0 0 1.033.386h3.337a1.573 1.573 0 0 0 1.114-.461l27.251-27.23a1.568 1.568 0 0 0 0-2.21Zm0 23.341-5.569-5.57a1.578 1.578 0 0 0-2.217 0L31.637 66.407a1.572 1.572 0 0 0 0 2.216l3.972 3.973a1.565 1.565 0 0 0 1.035.384h3.338a1.562 1.562 0 0 0 1.112-.459l15.574-15.566a1.564 1.564 0 0 0 0-2.21Zm0 23.334-5.571-5.565a1.57 1.57 0 0 0-2.215 0l-5.563 5.564a1.568 1.568 0 0 0 0 2.212l3.973 3.97a1.568 1.568 0 0 0 1.035.387h3.332a1.57 1.57 0 0 0 1.114-.462l3.895-3.888a1.569 1.569 0 0 0 0-2.217Z"
            fill={color || '#6cc655'}
          />
        </>
      )}
    </SVGtag>
  )
}

const SVGtag = styled.svg<CommonPropsType>`
  width: ${(props) => props.size / 16}rem;
`
