type EventHandler = (event: { defaultPrevented: boolean }) => void | undefined

/**
 * Merges a list of prop objects while preserving event handlers.
 */
const mergeProps = (...arr: Record<string, any>[]) => {
  if (arr.length === 0) return {}
  if (arr.length === 1) return arr[0]

  const target: Record<string, any> = {}
  const eventHandlers: Record<string, EventHandler[]> = {}

  for (let props of arr) {
    for (let prop in props) {
      // Collect event handlers.
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        if (!eventHandlers[prop])
          eventHandlers[prop] = []
        eventHandlers[prop].push(props[prop])
      } else target[prop] = props[prop]
    }
  }

  // Do not attach event handlers when `disabled` or `aria-disabled`.
  if (target.disabled || target['aria-disabled']) {
    // Set all event listeners that we collected to `undefined`. This is
    // important because of `cloneElement`, which merges existing and new props,
    // instead of just overriding. Therefore we have to explicitly nullify them.
    const nullEventHandlers = Object.keys(eventHandlers)
      .map(eventName => [eventName, undefined])
    return Object.assign(target, Object.fromEntries(nullEventHandlers))
  }

  // Merge event handlers.
  for (let eventName in eventHandlers) {
    Object.assign(target, {
      [eventName](event: { defaultPrevented: boolean }) {
        let handlers = eventHandlers[eventName]
        for (let handler of handlers)
          if (!event.defaultPrevented) handler(event)
      }
    })
  }

  return target
}
export default mergeProps
