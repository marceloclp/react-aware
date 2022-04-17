import {
  ForwardedRef,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
} from 'react'

const useSyncRefs = <T>(...refs: ForwardedRef<T>[]): RefCallback<T> => {
  const cache = useRef(refs)

  useEffect(() => {
    cache.current = refs
  }, [refs])

  const syncRefs: RefCallback<T> = useCallback(
    (value) => {
      for (const ref of cache.current) {
        if (ref === null) continue
        if (typeof ref === 'function') ref(value)
        else ref.current = value
      }
    },
    [cache]
  )

  return refs.every((ref) => ref == null) ? () => undefined : syncRefs
}

export default useSyncRefs
