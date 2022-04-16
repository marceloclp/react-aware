import {
  cloneElement,
  createElement,
  ElementType,
  ForwardedRef,
  Fragment,
  isValidElement,
  ReactElement,
} from 'react'
import InvalidFragmentAsTagName from '../errors/invalid-fragment-as-tag-name'
import compactProps from './compact-props'
import mergeProps from './merge-props'

type RenderParams = {
  displayName: string
  tagName: ElementType
  render: () => ReactElement | ReactElement[]
  props: Record<string, any>
  ref?: ForwardedRef<Element>
}

/**
 * Selectively renders the output of an Aware component based on the `tagName`:
 *    1. If `tagName` is a `Fragment`, then we need to make sure the child is a
 *       valid react element, so we can clone and attach the ref object.
 *    2. If `tagName` is a valid react element, then we need to attach the ref
 *       object and render the element.
 */
const renderAs = ({
  displayName,
  tagName: TagName,
  render,
  props,
  ref,
}: RenderParams) => {
  const compactedProps = compactProps(props)
  const children = render()

  if (TagName === Fragment) {
    // If no props are being passed down, then we don't need to check for a
    // valid react element, as no props need to be attached.
    if (Object.keys(compactedProps).length > 0 || ref) {
      if (
        !isValidElement(children) ||
        (Array.isArray(children) && children.length > 1)
      ) {
        throw new InvalidFragmentAsTagName(displayName, props)
      }
      const resolvedProps = mergeProps(children.props, compactedProps, { ref })
      return cloneElement(children, resolvedProps)
    }
  }

  const resolvedProps = mergeProps(
    compactedProps,
    TagName !== Fragment ? { ref } : {}
  )
  return createElement(TagName, resolvedProps, children)
}
export default renderAs
