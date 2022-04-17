# React Aware

> A set of declarative components that implement self aware functionalities

[![NPM](https://img.shields.io/npm/v/@marceloclp/react-aware.svg)](https://www.npmjs.com/package/@marceloclp/react-aware) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm i @marceloclp/react-aware
```

## Usage

Components will accept a render function instead of the usual `ReactNode` as the
children, with a shape similar to the following signature:

```ts
function render<T>(data: T | undefined | null, setRef: RefCallback<any>): JSX.Element
```

All components will attempt to render their own nodes - usually as a `div`
element, and attach the ref object to it, but this behaviour can be overwrited
by specifying the component to render as a `Fragment` and attaching the ref
object yourself:

```tsx
import { Fragment } from 'react'
import { SelfAware } from '@marceloclp/react-aware'

const Example = () => (
  <SelfAware as={Fragment}>
    {(_, __, setRef) => <div ref={setRef} />}
  </SelfAware>
)
```

### [`RectAware`](./example/src/components/rect-aware.tsx)

Returns a container that is aware of its bounding client rectangle.

```tsx
import { RectAware } from '@marceloclp/react-aware'

const Screen = () => (
  <RectAware as="div" style={{ height: '100%', width: '100%' }}>
    {({ width, height }) => (
      <div>
        Width: {width}, height: {height}
      </div>
    )}
  </RectAware>
)
```

### [`HeightAware`](./example/src/components/height-aware.tsx)

Returns a container that is aware of its height. Particularly useful when
rendering scrollable elements that do not have a fixed height (for example,
inside flexboxes).

This is a slimmed down version of the `RectAware` component, optimized to only
trigger a state update when the height changes.

```tsx
import { HeightAware, getScrollableStyle } from '@marceloclp/react-aware'

const Scrollable = ({ children }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: '200px' }}>
    <HeightAware style={{ flexGrow: 1 }}>
      {(height) => (
        <div style={getScrollableStyle(height)}>
          {children}
        </div>
      )}
    </HeightAware>
  </div>
)
```

### [`SelfAware`](./example/src/components/self-aware.tsx)

Returns a container that is aware of its own DOM node. Its render function
receives both the element - as reactive state, and the ref object, which is
particularly useful if you need access to a inside an asynchronous callback.

```tsx
import { SelfAware } from '@marceloclp/react-aware'

const Button = () => (
  <SelfAware as={Fragment}>
    {(_, ref) => (
      <button onClick={() => {
        setTimeout(() => {
          console.log(`Text height is ${ref.current?.clientHeight}`)
        }, 1000)
      }}>
        <Icon />
        <span ref={ref}>Click me!</span>
      </button>
    )}
  </SelfAware>
)
```

### [`ScreenAware`](./example/src/components/screen-aware.tsx)

Returns a `Fragment` by default containing the screen dimensions and the
currently active breakpoint, if a list of breakpoints is specified.

This is particularly useful if you want to render different components based on
screen width.

```tsx
import { Fragment } from 'react'
import { Breakpoint, ScreenAware } from '@marceloclp/react-aware'

const breakpoints: Breakpoint[] = [
  { name: 'mobile', min: 0 },
  { name: 'tablet', min: 500 },
  { name: 'desktop', min: 1000 },
]

export const Example = () => (
  <ScreenAware as="div" breakpoints={breakpoints}>
    {({ breakpoint: { name }}) => ({
      mobile: () => <div>Mobile screen</div>,
      tablet: () => <div>Tablet screen</div>,
      desktop: () => <div>Desktop screen</div>,
    }[name])()}
  </ScreenAware>
)
```

## License

MIT © [marceloclp](https://github.com/marceloclp)
