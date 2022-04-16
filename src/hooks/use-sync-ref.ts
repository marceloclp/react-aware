import { ForwardedRef, useCallback, useEffect, useRef } from 'react'

const useSyncRefs = <T, Defined extends boolean = false>(
  ...refs: ForwardedRef<T>[]
): Defined extends true ? ForwardedRef<T> : ForwardedRef<T> | undefined => {
  const cache = useRef(refs)

  useEffect(() => {
    cache.current = refs
  }, [refs])

  const syncRefs = useCallback(
    (value: T) => {
      for (const ref of cache.current) {
        if (ref === null) continue
        if (typeof ref === 'function') ref(value)
        else ref.current = value
      }
    },
    [cache]
  )

  return refs.every((ref) => ref == null) ? undefined : (syncRefs as any)
}

export default useSyncRefs
