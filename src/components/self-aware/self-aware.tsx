import { ElementType, ForwardedRef, MutableRefObject, useState } from 'react'
import { PropsAs } from '../../types/utilities'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import renderAs from '../../utils/render-as'
import useSyncRefs from '../../hooks/use-sync-ref'

export type SelfAwareProps = {
  children: (
    element: Element | undefined,
    ref: ForwardedRef<Element>
  ) => JSX.Element
}

type SelfAwareFC = <T extends ElementType = typeof SELF_AWARE_TAG_NAME>(
  props: PropsAs<T, SelfAwareProps>
) => JSX.Element

const SELF_AWARE_TAG_NAME = 'div'
const SELF_AWARE_DISPLAY_NAME = 'SelfAware'

// prettier-ignore
/**
 * Implements a component that is aware of its own DOM node.
 *
 * Its render function will pass both the ref object and the **reactive**
 * element. For instance, if you need access to some property of the DOM node
 * inside an asynchronous callback, you should use the ref object, as the node
 * might have remounted by the time the callback needs to access it.
 *
 * ```tsx
 *  <SelfAware as="div">
 *    {(elem, ref) => (
 *      <button onClick={() => {
 *        setTimeout(() => {
 *          console.log(`Height is ${ref.current?.clientHeight}`)
 *        }, 5000)
 *      }}>{elem?.clientHeight}</button>
 *    )}
 *  </SelfAware>
 * ```
 *
 * If you wish to attach the ref object to a different element, specify the
 * container to render as a `Fragment`, and then attach the ref to one of the
 * returned nodes inside your render function.
 *
 * ```tsx
 *  <SelfAware as={Fragment}>
 *    {(elem, ref) => (
 *      <div ref={ref}>{elem?.clientHeight}</div>
 *    )}
 *  </SelfAware>
 * ```
 */
export const SelfAware: SelfAwareFC = forwardRefWithAs(
  function SelfAware<T extends ElementType = typeof SELF_AWARE_TAG_NAME>({
      as: tagName,
      children,
      ...props
    }: PropsAs<T, SelfAwareProps>,
    forwardedRef: MutableRefObject<Element>
  ) {
    const [elem, setElement] = useState<Element | null>(null)
    const ref = useSyncRefs<Element, true>(forwardedRef, setElement)

    return renderAs({
      displayName: SELF_AWARE_DISPLAY_NAME,
      tagName: tagName || SELF_AWARE_TAG_NAME,
      render: () => children(elem || undefined, ref),
      props,
      ref,
    })
  }
)
