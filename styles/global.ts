import { createGlobalStyle } from 'styled-components'

// Settings: CSS プリプロセッサなどで利用する変数や設定
import { commonVariables } from '~/styles/settings/commonVariables'
import { lightThemeVariables } from '~/styles/settings/lightThemeVariables'
import { darkThemeVariables } from '~/styles/settings/darkThemeVariables'

// Generic: リセットスタイルや固有のリセットスタイル定義
import { normalize } from 'styled-normalize'
import { boxSizing } from '~/styles/generic/boxSizing'
import { focus } from '~/styles/generic/focus'
import { hidden } from '~/styles/generic/hidden'
import { prefersReducedMotion } from '~/styles/generic/prefersReducedMotion'
import { reset } from '~/styles/generic/reset'

// Base: 素の HTML 要素のスタイル定義
import { document } from '~/styles/base/document'
import { formParts } from '~/styles/base/formParts'

// Trumps: ヘルパー・ユーティリティ系の汎用スタイルを定義
import { VisuallyHidden } from '~/styles/trumps/VisuallyHidden'

export const GlobalStyle = createGlobalStyle`
  ${commonVariables}
  ${lightThemeVariables}
  ${darkThemeVariables}
  ${normalize}
  ${reset}
  ${boxSizing}
  ${focus}
  ${hidden}
  ${prefersReducedMotion}
  ${document}
  ${formParts}
  ${VisuallyHidden}
`
