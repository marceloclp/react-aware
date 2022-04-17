import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

/**
 * React state hook that only updates state in the callback of
 * `requestAnimationFrame`.
 * 
 * @see https://github.com/streamich/react-use/blob/master/docs/useRafState.md
 */
const useRAFState = <S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef(0)
  const [state, setState] = useState(initialState)

  const setRAFState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return [state, setRAFState]
}

export default useRAFState
