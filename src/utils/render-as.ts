import {
  cloneElement,
  createElement,
  ElementType,
  Fragment,
  isValidElement,
  ReactElement,
  RefCallback,
} from 'react'
import InvalidFragmentAsTagName from '../errors/invalid-fragment-as-tag-name'
import compactProps from './compact-props'
import mergeProps from './merge-props'

type RenderParams = {
  displayName: string
  tagName: ElementType
  children: ReactElement | ReactElement[]
  // The render function.
  // render: () => ReactElement | ReactElement[]
  // The intrinsic HTML props without the component's dirty props.
  props: Record<string, any>
  // The ref callback to passthrough to the wrapper container. If the component
  // is to be rendered as a `Fragment`, then it's the consumer's responsability
  // to attach the `setRef` himself.
  setRef: RefCallback<Element>
}

/**
 * Selectively renders the output of an Aware component based on the `tagName`:
 *    1. If `tagName` is a `Fragment`, then we need to make sure the child is a
 *       valid react element, so we can clone and passthrough the parent props.
 *       NOTE: Attaching the ref becomes a responsability of the consumer.
 *    2. If `tagName` is a valid react element, then we need to attach the ref
 *       object and render the element.
 */
const renderAs = ({
  displayName,
  tagName,
  children,
  props,
  setRef,
}: RenderParams) => {
  const compactedProps = compactProps(props)

  if (tagName === Fragment) {
    // If no props are being passed down, then we don't need to check for a
    // valid react element, as no props need to be attached.
    if (Object.keys(compactedProps).length > 0) {
      if (
        !isValidElement(children) ||
        (Array.isArray(children) && children.length > 1)
      ) {
        throw new InvalidFragmentAsTagName(displayName, props)
      }
      const resolvedProps = mergeProps(children.props, compactedProps)
      return cloneElement(children, resolvedProps)
    }
  }

  const resolvedProps = mergeProps(
    compactedProps,
    tagName !== Fragment ? { ref: setRef } : {}
  )
  return createElement(tagName, resolvedProps, children)
}
export default renderAs
