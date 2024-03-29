import { css } from 'styled-components'
import { clamp } from '../tools/clamp'

export const globalFontSize: number = 16

export const commonVariables = css`
  :root {
    /**
    * プライマリカラー
    * ページ内の特に重要な要素に使用する色です。
  */
    --color-primary: #019bb6;

    /**
    * アクセントカラー
    * プライマリカラーとは区別して強調したい要素に使用する色です。
  */
    --color-accent-1: #cd5c5c;
    --color-accent-2: #f8d7da;

    /**
    * グレースケール
    * 通常の要素に使用する色です。
  */
    --color-grayscale-0: #1c1c1c;
    --color-grayscale-1: #2e2e2e;
    --color-grayscale-2: #3a3a3a;
    --color-grayscale-3: #6e6e6e;
    --color-grayscale-4: #e0e0e0;
    --color-grayscale-5: #e7e7e7;
    --color-grayscale-6: #f1f1f1;
    --color-grayscale-7: #fefefe;

    /**
    * フォントファミリー
  */
    --font-default: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'BIZ UDPGothic', Meiryo,
      sans-serif;
    --font-designed: 'Reem Kufi', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'BIZ UDPGothic', Meiryo, sans-serif;
    --font-emoji: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Apple Color Emoji', 'Noto Color Emoji', 'Noto Emoji', sans-serif;

    /**
    * フォントサイズリスト
  */
    --fontsize-0: ${10 / globalFontSize}rem; /* = 10px */
    --fontsize-1: ${12 / globalFontSize}rem; /* = 12px */
    --fontsize-2: ${14 / globalFontSize}rem; /* = 14px */
    --fontsize-3: ${16 / globalFontSize}rem; /* = 16px */
    --fontsize-4: ${18 / globalFontSize}rem; /* = 18px */
    --fontsize-5: ${20 / globalFontSize}rem; /* = 20px */
    --fontsize-6: ${24 / globalFontSize}rem; /* = 24px */
    --fontsize-7: ${32 / globalFontSize}rem; /* = 32px */

    /**
    * line-height
  */
    --leading-none: 1;
    --leading-x-tight: 1.125;
    --leading-tight: 1.25;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
    --leading-loose: 2;

    /**
    * letter-spacing
  */
    --letter-spacing-text: 0.05em;
    --letter-spacing-headline: 0.02em;

    /**
    * z-index
    * コンテキスト内のz-indexは値の大小で重なり順を制御せず、0と1をboolとして扱います。
  */
    --context-fixed-object: 10;
    --context-popup: 11;

    /**
    * コンポーネントのサイズ
  */
    --max-width-default: 1200px;
    --max-width-narrow: 960px;
    --max-width-wide: 1920px;
    --height-header: ${clamp(52, 64, true)};
    --padding-block-contents: ${clamp(64, 100)};
  }
`
