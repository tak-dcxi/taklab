// Google AnalyticsのトラッキングID
export const GA_ID: string = process.env.NEXT_PUBLIC_TRACKING_ID ?? ''

// Google AnalyticsのトラッキングIDが存在するかどうか
export const existsGaId: boolean = GA_ID !== ''

/**
 * Google Analyticsのページビューを記録します。
 * @param path アクセスされたページのパス
 */
export const pageview = (path: string): void => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

/**
 * Google Analyticsでイベントを記録します。
 * @param params イベントの詳細情報（アクション、カテゴリ、ラベル、値）
 */
export const event = ({
  action,
  category,
  label,
  value = '',
}: {
  action: string
  category: string
  label: string
  value: string
}): void => {
  if (!existsGaId) return

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  })
}
