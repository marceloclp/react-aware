import '../../__mocks__/mock-resize-observer'
import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { SelfAware } from './self-aware'

describe('SelfAware', () => {
  it('should be defined', () => {
    expect(SelfAware).toBeDefined()
  })
  it('should have the correct display name', () => {
    expect(SelfAware.displayName).toBe('SelfAware')
  })

  describe('when rendering as a valid react element', () => {
    let result: RenderResult
    beforeEach(() => {
      result = render(
        <SelfAware as="div" data-testid="wrapper">{() => <span />}</SelfAware>
      )
    })
    it('should use the value of `as` as the tag name', () => {
      expect(result.getByTestId('wrapper').tagName).toBe('DIV')
    })
  })

  describe('when rendering as a react fragment', () => {
    let result: RenderResult
    beforeEach(() => {
      result = render(
        <SelfAware as={React.Fragment} data-testid="wrapper">
          {(_, ref) => (
            <span ref={ref as any} />
          )}
        </SelfAware>
      )
    })
    it('should return a valid react element', () => {
      expect(result.getByTestId('wrapper').tagName).toBe('SPAN')
    })
  })
})
