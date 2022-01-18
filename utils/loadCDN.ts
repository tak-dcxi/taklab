export const loadCDN = (src: string, integrity: string): void => {
  const script: HTMLScriptElement = document.createElement('script')
  script.src = src
  script.integrity = integrity
  script.crossOrigin = 'anonymous'
  script.defer = true
  document.head.appendChild(script)
}
