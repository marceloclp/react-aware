/**
 * Compacts a props object by:
 *    1. Removing all `undefined` props.
 *    2. Omitting all props that match the keys inside the `omit` array.
 */
const compactProps = (props: Record<string, any>, omit: string[] = []) => {
  const omitDict = Object.fromEntries(omit.map(k => [k, true]))
  return Object.entries(props).reduce((target, [key, value]) => {
    if (key in omitDict || value === undefined)
      return target
    return { ...target, [key]: value }
  }, {})
}
export default compactProps
