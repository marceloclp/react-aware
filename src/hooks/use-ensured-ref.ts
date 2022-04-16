import { MutableRefObject, useEffect, useRef } from "react"

const useEnsuredRef = <T>(
  ref: MutableRefObject<T>
): MutableRefObject<T> => {
  const ensuredRef = useRef(ref && ref.current)

  useEffect(() => {
    if (!ref) return
    ref.current = ensuredRef.current
  }, [ensuredRef])

  return ensuredRef
}

export default useEnsuredRef
