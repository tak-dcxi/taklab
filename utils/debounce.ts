/**
 * イベント終了後、任意の時間を待機してから関数を実行します。
 * @param {Function} callback 実行する関数
 * @param {number} delay 待機する時間
 */

export const debounce = <T extends (...args: string[]) => void>(
  callback: T,
  delay = 300
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), delay)
  }
}
