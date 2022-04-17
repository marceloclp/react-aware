import {
  ElementType,
  MutableRefObject,
  RefCallback,
  RefObject,
  useRef,
  useState,
} from 'react'
import { AwareComponent, PropsAs } from '../../types/utilities'
import forwardRefWithAs from '../../utils/forward-ref-with-as'
import renderAs from '../../utils/render-as'
import useSyncRefs from '../../hooks/use-sync-ref'

type SelfAwareProps = {
  children: (
    element: Element | undefined,
    ref: RefObject<Element>,
    setRef: RefCallback<Element>
  ) => JSX.Element
}

type SelfAwareComponent = AwareComponent<
  <T extends ElementType = typeof SELF_AWARE_TAG_NAME>(
    props: PropsAs<T, SelfAwareProps>
  ) => JSX.Element
>

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
 *    {(elem, ref, setRef) => (
 *      <div ref={setRef}>{elem?.clientHeight}</div>
 *    )}
 *  </SelfAware>
 * ```
 */
export const SelfAware: SelfAwareComponent = forwardRefWithAs(
  function SelfAware<T extends ElementType = typeof SELF_AWARE_TAG_NAME>({
      as: tagName,
      children,
      ...props
    }: PropsAs<T, SelfAwareProps>,
    forwardedRef: MutableRefObject<Element>
  ) {
    const innerRef = useRef<Element>(null)
    const [elem, setElement] = useState<Element | null>(null)
    const setRef = useSyncRefs<Element>(forwardedRef, innerRef, setElement)

    return renderAs({
      displayName: SELF_AWARE_DISPLAY_NAME,
      tagName: tagName || SELF_AWARE_TAG_NAME,
      children: children(elem || undefined, innerRef, setRef),
      props,
      setRef,
    })
  }
)
