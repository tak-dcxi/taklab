import { Ref, useCallback } from 'react'

export const useCombinedRefs = <T extends unknown>(...refs: Array<Ref<T>>): Ref<T> =>
  useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function') return ref(element)
        return ((ref as any).current = element)
      }),
    [refs]
  )
