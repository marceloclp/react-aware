import { forwardRef } from 'react'
import { AwareComponent } from '../types/utilities'

/**
 * TS hack to wrap a component inside React's `forwardRef` while preserving the
 * display name and overwriting the default return type.
 */
const forwardRefWithAs = <T extends { displayName?: string; name: string }>(
  component: T
): AwareComponent<any> => {
  const ForwardedComponent = forwardRef(component as any)
  ForwardedComponent.displayName = component.displayName || component.name
  return ForwardedComponent
}

export default forwardRefWithAs
