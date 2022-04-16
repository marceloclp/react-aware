# @marceloclp/react-aware

> A set of declarative components that implement self aware functionalities

[![NPM](https://img.shields.io/npm/v/@marceloclp/react-aware.svg)](https://www.npmjs.com/package/@marceloclp/react-aware) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm i @marceloclp/react-aware
```

## Usage

### `HeightAware`

Returns a container that is aware of its height.

```tsx
import { FC } from 'react'
import { HeightAware, getScrollableStyle } from '@marceloclp/react-aware'

const Scrollable: FC = ({ children }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: '200px' }}>
    <HeightAware style={{ flexGrow: 1 }}>
      {({ height }) => (
        <div style={getScrollableStyle(height)}>
          {children}
        </div>
      )}
    </HeightAware>
  </div>
)
```

## License

MIT © [marceloclp](https://github.com/marceloclp)
