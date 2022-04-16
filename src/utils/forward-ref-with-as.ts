import { forwardRef } from 'react'

const forwardRefWithAs = <T extends { displayName?: string; name: string }>(
  component: T
): any => {
  const ForwardedComponent = forwardRef(component as any)
  // ForwardedComponent.displayName = component.displayName ?? component.name
  return ForwardedComponent as any
}

export default forwardRefWithAs
