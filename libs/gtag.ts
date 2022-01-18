export const GA_ID: string = process.env.NEXT_PUBLIC_TRACKING_ID ?? ''

export const existsGaId: boolean = GA_ID !== ''

export const pageview = (path: string): void => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

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
