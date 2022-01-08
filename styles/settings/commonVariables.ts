import { css } from 'styled-components'

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
    --color-accent: #cd5c5c;

    /**
    * グレースケール
    * 通常の要素に使用する色です。
  */
    --color-grayscale-1: #2a2c2f;
    --color-grayscale-2: #4a4a4a;
    --color-grayscale-3: #999;
    --color-grayscale-4: #e0e0e0;
    --color-grayscale-5: #e6e6e6;
    --color-grayscale-6: #f2f2f2;
    --color-grayscale-7: #fefefe;

    /**
    * フォントファミリー
  */
    --font-montserrat: 'Montserrat', sans-serif;

    /**
    * フォントサイズリスト
  */
    --fontsize-1: ${12 / globalFontSize}rem; /* = 12px */
    --fontsize-2: ${14 / globalFontSize}rem; /* = 14px */
    --fontsize-3: ${16 / globalFontSize}rem; /* = 16px */
    --fontsize-4: ${18 / globalFontSize}rem; /* = 18px */
    --fontsize-5: ${20 / globalFontSize}rem; /* = 20px */
    --fontsize-6: ${24 / globalFontSize}rem; /* = 24px */
    --fontsize-7: ${32 / globalFontSize}rem; /* = 32px */

    /**
    * ラインハイト
  */
    --leading-none: 1;
    --leading-x-tight: 1.125;
    --leading-tight: 1.25;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
    --leading-loose: 2;

    /**
    * z-index
    * コンテキスト内のz-indexは値の大小で重なり順を制御せず、0と1をboolとして扱います。
  */
    --fixed-object-context: 10;
    --popup-context: 11;

    /**
    * コンポーネントのサイズ
  */
    --height-header: clamp(52px, 3.1019rem + 0.7407vw, 60px);
  }
`
