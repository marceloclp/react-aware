import { useRef } from 'react'

/**
 * Returns a mutable ref object containing the latest state or props.
 *
 * This is mostly useful to get access to the latest value of some props or
 * state inside an asynchronous callback, instead of the value at the time the
 * callback was created.
 *
 * @see https://github.com/streamich/react-use/blob/master/docs/useLatest.md
 */
const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value)
  ref.current = value
  return ref
}

export default useLatest
