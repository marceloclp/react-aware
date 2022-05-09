# React Aware

React Aware exports a set of utility components with self aware capabilities that focus on improving readability.

To understand how `react-aware` may improve readibility, take the example below:

```tsx
const Container = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref}>
      My div element is {ref.current?.getBoundingClientRect().width || 0}px wide!
    </div>
  )
}
```

Could be written like this:

```tsx
const Container = () => (
  <RectAware as="div">
    {({ width = 0 }) => `My div element is ${width}px wide!`}
  </RectAware>
)
```

It's often the case with sligthly complex components that require the use of multiple state, refs and effects, where we have to keep going back and forth between these declarations and the JSX.

Let's take a look at how we could implement a slightly more complex component using pure React and `react-aware`.

```tsx
const Scrollable = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [])

  return (
    <div ref={ref} style={{ flexGrow: 1, overflow: 'hidden' }}>
      <div style={{ height: `${height}`px, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
```

Now let's take a look at the same example, but taking advantage of the `HeightAware` component and some of its style utils:

```tsx
import { HeightAware, getScrollableStyle } from '@marceloclp/react-aware'

const Scrollable = ({ children }) => (
  <HeightAware as="div" style={{ flexGrow: 1 }}>
    {(height) => (
      <div style={getScrollableStyle(height)}>
        {children}
      </div>
    )}
  </HeightAware>
)
```
