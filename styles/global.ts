import { createGlobalStyle } from 'styled-components'

// Settings: CSS プリプロセッサなどで利用する変数や設定
import { CSSVariables } from '~/styles/settings/CSSVariables'

// Generic: リセットスタイルや固有のリセットスタイル定義
import { normalize } from 'styled-normalize'
import { boxSizing } from '~/styles/generic/boxSizing'
import { focus } from '~/styles/generic/focus'
import { hidden } from '~/styles/generic/hidden'
import { prefersReducedMotion } from '~/styles/generic/prefersReducedMotion'
import { reset } from '~/styles/generic/reset'

// Base: 素の HTML 要素のスタイル定義
import { forms } from '~/styles/base/forms'
import { page } from '~/styles/base/page'

// Trumps: ヘルパー・ユーティリティ系の汎用スタイルを定義
import { visuallyHidden } from '~/styles/trumps/visuallyHidden'

export const GlobalStyle = createGlobalStyle`
  ${CSSVariables}
  ${normalize}
  ${boxSizing}
  ${focus}
  ${hidden}
  ${prefersReducedMotion}
  ${reset}
  ${forms}
  ${page}
  ${visuallyHidden}
`
