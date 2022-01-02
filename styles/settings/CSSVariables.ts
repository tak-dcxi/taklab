import { css } from 'styled-components'

export const globalFontSize: number = 16

export const CSSVariables = css`
  :root {
    /**
    * プライマリカラー
    * ページ内の特に重要な要素に使用する色です。
  */
    --primary-color-1: #186872;
    --primary-color-2: #37a888;

    /**
    * アクセントカラー
    * プライマリカラーとは区別して強調したい要素に使用する色です。
  */
    --accent-color-1: #ffe65f;
    --accent-color-2: #fff6c5;

    /**
    * グレースケール
    * 通常の要素に使用する色です。
  */
    --grayscale-1: #333;
    --grayscale-2: #7e7e7e;
    --grayscale-3: #ccc;
    --grayscale-4: #e5e5e5;
    --grayscale-5: #f0f0f0;
    --grayscale-6: #fff;

    /**
    * 本文テキストカラー
  */
    --text-color-default: var(--grayscale-1);
    --text-color-muted: var(--grayscale-2);
    --text-color-lighten: var(--grayscale-5);
    --text-color-link: #007dd9;
    --text-color-strong: #e51f00;

    /**
    * レイアウトカラー
  */
    --layout-color-background: var(--grayscale-5);
    --layout-color-lighten: var(--grayscale-6);
    --layout-color-active: #fcede8;
    --layout-color-accent: #fff6c5;
    --boundary-color-strong: var(--grayscale-3);
    --boundary-color-muted: var(--grayscale-4);
    --fixed-header-color: var(--grayscale-6);

    /**
    * ステータスカラー
  */
    --active-color: #37a888;
    --valid-color: #0090f1;
    --invalid-color: #e51f00;
    --caution-color: var(--accent-color-1);

    /**
    * ブランドカラー
  */
    --branding-color: var(--primary-color-1);

    /**
    * フォントファミリー
  */
    --designed-font: 'Heebo', sans-serif;

    /**
    * フォントサイズリスト
  */
    --fsize-1: ${12 / globalFontSize}rem; /* = 12px */
    --fsize-2: ${14 / globalFontSize}rem; /* = 14px */
    --fsize-3: ${16 / globalFontSize}rem; /* = 16px */
    --fsize-4: ${18 / globalFontSize}rem; /* = 18px */
    --fsize-5: ${20 / globalFontSize}rem; /* = 20px */
    --fsize-6: ${24 / globalFontSize}rem; /* = 24px */
    --fsize-7: ${32 / globalFontSize}rem; /* = 32px */

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
  }
`
