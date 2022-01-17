import { Keyframes, keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

export const slideInLeft = keyframes`
  0% {
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`

export const slideOutLeft = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}`

export const slideInRight = keyframes`
  0% {
    transform: translate3d(100%, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`

export const slideOutRight = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(100%, 0, 0);
  }
}`

export const scaleIn = (rate = 1.1): Keyframes => {
  return keyframes`
    0% {
      transform: scale3d(1, 1, 1);
    }

    100% {
      transform: scale3d(${rate}, ${rate}, 1);
    }
  }`
}

export const scaleOut = (rate = 1.1): Keyframes => {
  return keyframes`
    0% {
      transform: scale3d(${rate}, ${rate}, 1);
    }

    100% {
      transform: scale(1, 1, 1);
    }
  }`
}

export const rotateClockwise = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const rotateAnticlockwise = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
`
